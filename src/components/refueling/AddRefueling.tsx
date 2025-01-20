"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import BackHeader from "@/components/base/BackHeader";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import { Car } from "@/api/models/models";
import {
	Calendar,
	Droplets,
	Fuel,
	JapaneseYen,
	Navigation,
} from "lucide-react";
import { ErrorMessage } from "../form/FormElements";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
`;

const FormContainer = styled.div`
	max-width: 500px;
	margin: 0 auto;
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const FormTitle = styled.h1`
	font-size: 24px;
	text-align: center;
`;

const FormElementContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Label = styled.label`
	font-size: 16px;
	display: flex;
	flex-direction: row;
	gap: 5px;
`;

const Input = styled.input`
	background-color: #2b2b2b;
	border: 1px solid #ffffff;
	border-radius: 4px;
	color: #ffffff;
	padding: 10px;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: #4a90e2;
	}
`;

const FuelEfficiencyDisplay = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 8px;
	padding: 10px;
`;

const FuelEfficiencyLabel = styled.span`
	color: #f12424;
	font-size: 18px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const FuelEfficiencyValue = styled.span`
	font-size: 24px;
	color: white;
`;

const Button = styled.button`
	background-color: #f12424;
	color: #ffffff;
	border: none;
	border-radius: 4px;
	padding: 12px 20px;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d61f1f;
	}
`;

interface AddFuelEfficiencyProps {
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	carId: number;
}

const AddRefueling: React.FC<AddFuelEfficiencyProps> = ({ tokens, carId }) => {
	// フォーム入力
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState<number | null>(null);
	const [unitPrice, setUnitPrice] = useState<number | null>(null);

	// 今回の増分走行距離(Δ)
	const [deltaMileage, setDeltaMileage] = useState<number | null>(null);
	// 入力された「総走行距離」
	const [inputTotalMileage, setInputTotalMileage] = useState<number | null>(
		null,
	);

	// バリデーション関連
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	// 現在の車両情報 (car_mileage を取得するため)
	const [carInfo, setCarInfo] = useState<Car | null>(null);

	const router = useRouter();

	// 初期表示で、現在の Car 情報を取得 (car_mileage を知るため)
	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			const car = await clientAPI.car.getCar({ car_id: carId });
			setCarInfo(car);
		};
		fetchCar();
	}, [carId, tokens]);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (date === "") {
			newErrors.date = "日付を入力してください";
		}
		if (!unitPrice || unitPrice <= 0) {
			newErrors.unitPrice = "有効な単価を入力してください";
		}
		if (!amount || amount <= 0) {
			newErrors.amount = "有効な給油量を入力してください";
		}

		// 走行距離(今回Δ) と 総走行距離 のどちらか必須
		const deltaInvalid = !deltaMileage || deltaMileage <= 0;
		const totalInvalid = !inputTotalMileage || inputTotalMileage <= 0;
		if (deltaInvalid && totalInvalid) {
			newErrors.mileage =
				"走行距離(今回) か 総走行距離 のどちらか一方は入力してください。";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitted(true);

		if (!validateForm()) {
			return;
		}

		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}

		const clientAPI = ClientAPI(tokens.token);
		const oldCarMileage = carInfo?.car_mileage || 0;

		// 入力された「総走行距離」が優先 -> そこからΔを計算
		let usedDelta = 0;
		let newCarMileage = oldCarMileage;

		// ユーザーが「総走行距離」を入力した場合
		if (inputTotalMileage && inputTotalMileage > 0) {
			usedDelta = inputTotalMileage - oldCarMileage;
			newCarMileage = inputTotalMileage;
			// もし総走行距離が前回より小さい場合はエラーにするなどの処理も必要なら追加
		} else if (deltaMileage && deltaMileage > 0) {
			// ユーザーが「今回の走行距離(Δ)」のみ入力した場合
			usedDelta = deltaMileage;
			newCarMileage = oldCarMileage + usedDelta;
		}

		// 1. FuelEfficiency にレコード作成
		//    fe_mileage(= 今回の走行距離) と、必要なら fe_totalmileage(= newCarMileage) を送る
		await clientAPI.fuelEfficiency.createFuelEfficiency({
			car_id: Number(carId),
			fe_date: date,
			fe_amount: amount!,
			fe_unitprice: unitPrice!,
			fe_mileage: usedDelta, // 今回の増分走行距離
			// fe_totalmileage: newCarMileage, // API が受け取れる場合は送る
		});

		// 2. Car の累計走行距離 car_mileage を更新
		if (newCarMileage !== oldCarMileage) {
			await clientAPI.car.updateCar({
				car_id: Number(carId),
				car_name: carInfo?.car_name || "",
				carmodelnum: carInfo?.carmodelnum || "",
				car_color: carInfo?.car_color || "",
				car_image_url: carInfo?.car_image_url || "",
				car_issmoked: carInfo?.car_issmoked || false,
				car_isflooding: carInfo?.car_isflooding || false,
				car_mileage: newCarMileage,
			});
		}

		alert("給油記録を登録し、走行距離を更新しました。");
		router.push("/refueling");
	};

	// 燃費 = (「今回の走行距離」) / (給油量)
	// 総走行距離を優先入力している場合は、(総走行距離-前回のcar_mileage) を使う
	const oldCarMileage = carInfo?.car_mileage || 0;
	const diff =
		inputTotalMileage && inputTotalMileage > 0
			? inputTotalMileage - oldCarMileage
			: deltaMileage || 0;
	const fuelEfficiency =
		diff > 0 && amount && amount > 0 ? (diff / amount).toFixed(2) : "0";

	return (
		<PageContainer>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form onSubmit={handleSignUp}>
					<FormTitle>給油記録追加</FormTitle>

					{/* 日付 */}
					<FormElementContainer>
						<Label>
							<Calendar color="white" />
							<p>日付</p>
						</Label>
						<Input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
						{isSubmitted && errors.date && (
							<ErrorMessage>{errors.date}</ErrorMessage>
						)}
					</FormElementContainer>

					{/* 単価(円/L) */}
					<FormElementContainer>
						<Label>
							<JapaneseYen color="white" />
							<p>単価(円/L)</p>
						</Label>
						<Input
							type="number"
							min="0.01"
							step="0.01"
							value={unitPrice ?? ""}
							onChange={(e) => setUnitPrice(Number(e.target.value))}
							required
						/>
						{isSubmitted && errors.unitPrice && (
							<ErrorMessage>{errors.unitPrice}</ErrorMessage>
						)}
					</FormElementContainer>

					{/* 給油量(L) */}
					<FormElementContainer>
						<Label>
							<Fuel color="white" />
							<p>給油量(L)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={amount ?? ""}
							onChange={(e) => setAmount(Number(e.target.value))}
							required
						/>
						{isSubmitted && errors.amount && (
							<ErrorMessage>{errors.amount}</ErrorMessage>
						)}
					</FormElementContainer>

					{/* 走行距離(今回) */}
					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>走行距離(今回 km)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={deltaMileage ?? ""}
							onChange={(e) => {
								setDeltaMileage(Number(e.target.value));
							}}
						/>
					</FormElementContainer>

					{/* 総走行距離 */}
					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>総走行距離(km)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={inputTotalMileage ?? ""}
							onChange={(e) => {
								setInputTotalMileage(Number(e.target.value));
							}}
						/>
						{isSubmitted && errors.mileage && (
							<ErrorMessage>{errors.mileage}</ErrorMessage>
						)}
					</FormElementContainer>

					{/* 燃費表示 */}
					<FuelEfficiencyDisplay>
						<FuelEfficiencyLabel>
							<Droplets color="#f12424" />
							<p>燃費</p>
						</FuelEfficiencyLabel>
						<FuelEfficiencyValue className={Anton400.className}>
							{fuelEfficiency} km/L
						</FuelEfficiencyValue>
					</FuelEfficiencyDisplay>

					{/* 登録ボタン */}
					<Button type="submit">登録</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default AddRefueling;
