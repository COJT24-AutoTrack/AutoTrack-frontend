"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import BackHeader from "@/components/base/BackHeader";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import { Car } from "@/api/models/models";
import { FuelEfficiency } from "@/api/models/models";
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

	&::placeholder {
		color: #cccccc;
		opacity: 1;
	}

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

	// 前回の給油からの走行距離
	const [deltaMileage, setDeltaMileage] = useState<number | null>(null);
	// 月別走行距離
	const [monthlyMileage, setMonthlyMileage] = useState<number | null>(null);
	// 総走行距離
	const [totalMileage, setTotalMileage] = useState<number | null>(null);

	// フィールドがユーザーによって編集されているかを追跡
	const [editingField, setEditingField] = useState<"delta" | "total" | null>(
		null,
	);

	// バリデーション関連
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	// 現在の車両情報 (car_mileage を取得するため)
	const [carInfo, setCarInfo] = useState<Car | null>(null);

	const router = useRouter();

	// 丸め関数
	const roundToTwo = (num: number): number => {
		return Math.round(num * 100) / 100;
	};

	// 初期表示で、現在の Car 情報を取得 (car_mileage: 保存されている総走行距離を知るため)
	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const car = await clientAPI.car.getCar({ car_id: carId });
				setCarInfo(car);
			} catch (error) {
				console.error("Error fetching car info:", error);
				// エラーハンドリング（必要に応じて）
				setErrors((prev) => ({
					...prev,
					fetchCar: "車両情報の取得に失敗しました。再度お試しください。",
				}));
			}
		};
		fetchCar();
	}, [carId, tokens]);

	// deltaMileage または totalMileage が変更された際にもう一方を計算
	useEffect(() => {
		if (!carInfo) return;
		const oldCarMileage = carInfo.car_mileage || 0;

		if (editingField === "total" && totalMileage !== null) {
			const calculatedDelta = roundToTwo(totalMileage - oldCarMileage);
			setDeltaMileage(calculatedDelta);
		} else if (editingField === "delta" && deltaMileage !== null) {
			const calculatedTotal = roundToTwo(oldCarMileage + deltaMileage);
			setTotalMileage(calculatedTotal);
		}
		// リセット editingField 以降の変更をトリガーしないようにする
		setEditingField(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deltaMileage, totalMileage]);

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

		// 月別走行距離 or 総走行距離 のどちらか必須
		const monthlyInvalid = !monthlyMileage || monthlyMileage <= 0;
		const totalInvalid = !totalMileage || totalMileage <= 0;
		if (monthlyInvalid && totalInvalid) {
			newErrors.mileage =
				"月別走行距離 か 総走行距離 のどちらか一方は入力してください。";
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

		// 給油時の走行距離（Δ）を求める
		let calculatedDelta = 0;
		let newCarMileage = oldCarMileage;

		if (totalMileage && totalMileage > 0) {
			calculatedDelta = roundToTwo(totalMileage - oldCarMileage);
			newCarMileage = roundToTwo(totalMileage);
		} else if (deltaMileage && deltaMileage > 0) {
			calculatedDelta = roundToTwo(deltaMileage);
			newCarMileage = roundToTwo(oldCarMileage + deltaMileage);
		}

		// 1. FuelEfficiency にレコード作成
		await clientAPI.fuelEfficiency.createFuelEfficiency({
			car_id: Number(carId),
			fe_date: date,
			fe_amount: amount!,
			fe_unitprice: unitPrice!,
			fe_mileage: totalMileage || 0,
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

	// 燃費計算
	const oldCarMileage = carInfo?.car_mileage || 0;
	const calculatedDelta =
		totalMileage && totalMileage > 0
			? roundToTwo(totalMileage - oldCarMileage)
			: deltaMileage || 0;
	const fuelEfficiency =
		calculatedDelta > 0 && amount && amount > 0
			? (calculatedDelta / amount).toFixed(2)
			: "0";

	// プレースホルダーのテキストを定義
	const totalMileagePlaceholder = `現在の走行距離: ${roundToTwo(oldCarMileage)} km`;
	// const deltaMileagePlaceholder =
	// 	calculatedDelta > 0 ? `${calculatedDelta} km` : "計算中...";

	return (
		<PageContainer>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form onSubmit={handleSignUp}>
					<FormTitle>給油記録追加</FormTitle>

					{/* エラーメッセージの表示 */}
					{errors.fetchCar && <ErrorMessage>{errors.fetchCar}</ErrorMessage>}

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
							placeholder="例: 150.00"
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
							placeholder="例: 45.67"
							value={amount ?? ""}
							onChange={(e) => setAmount(Number(e.target.value))}
							required
						/>
						{isSubmitted && errors.amount && (
							<ErrorMessage>{errors.amount}</ErrorMessage>
						)}
					</FormElementContainer>

					{/* 前回の給油からの走行距離 */}
					{/* <FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>前回の給油からの走行距離(km)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={deltaMileage ?? ""}
							onChange={(e) => {
								setDeltaMileage(Number(e.target.value));
								setEditingField("delta");
							}}
							// placeholder={deltaMileagePlaceholder}
						/>
						{isSubmitted && errors.mileage && (
							<ErrorMessage>{errors.mileage}</ErrorMessage>
						)}
					</FormElementContainer> */}

					{/* 総走行距離 */}
					{/* 後から順不同に記録されることを考慮すると、deltaで入力されたかtotalで入力されたかを記録する必要があることがわかったため、一旦コメントアウト */}
					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>総走行距離(km)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={totalMileage ?? ""}
							onChange={(e) => {
								setTotalMileage(Number(e.target.value));
								setEditingField("total");
							}}
							placeholder={totalMileagePlaceholder}
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
