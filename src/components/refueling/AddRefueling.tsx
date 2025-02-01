"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import BackHeader from "@/components/base/BackHeader";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
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
	carId: string;
}

const AddRefueling: React.FC<AddFuelEfficiencyProps> = ({ tokens, carId }) => {
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState<number | null>(null);
	const [unitPrice, setUnitPrice] = useState<number | null>(null);
	const [totalMileage, setTotalMileage] = useState<number>(0);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [oldCarMileage, setOldCarMileage] = useState<number>(0);
	const [latestMileage, setLatestMileage] = useState<number | null>(
		null,
	);
	const [inputMileage, setInputMileage] = useState<number | null>(null);

	const router = useRouter();

	useEffect(() => {
		const fetchCarMileage = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const car = await clientAPI.car.getCar({ car_id: carId });
				setOldCarMileage(car.car_mileage ?? 0);
			} catch (error) {
				console.error("Error fetching car info:", error);
				setErrors((prev) => ({
					...prev,
					fetchCar: "車両情報の取得に失敗しました。再度お試しください。",
				}));
			}
		};

		const fetchLatestFuelEfficiency = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const fuelEfficiencies =
					await clientAPI.fuelEfficiency.getFuelEfficiencies();

				const carFuelEfficiencies = fuelEfficiencies.filter(
					(fe: FuelEfficiency) => fe.car_id === carId,
				);

				if (carFuelEfficiencies.length > 0) {
					const latestMileage = carFuelEfficiencies
						.map((fe) => Number(fe.fe_mileage))
						.reduce((a, b) => Math.max(a, b), 0);
					setLatestMileage(latestMileage);
					setTotalMileage(latestMileage); // 初期値を設定
				}
			} catch (error) {
				console.error("Error fetching fuel efficiency:", error);
			}
		};

		fetchCarMileage();
		fetchLatestFuelEfficiency();
	}, [carId, tokens]);

	useEffect(() => {
		if (inputMileage !== null) {
			setTotalMileage(inputMileage);
		}
	}, [inputMileage]);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!date) newErrors.date = "日付を入力してください";
		if (!unitPrice || unitPrice <= 0)
			newErrors.unitPrice = "有効な単価を入力してください";
		if (!amount || amount <= 0)
			newErrors.amount = "有効な給油量を入力してください";
		if (!totalMileage || totalMileage <= 0)
			newErrors.mileage = "有効な走行距離を入力してください";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignUp = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitted(true);

		if (!validateForm()) return;

		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}

		const clientAPI = ClientAPI(tokens.token);

		await clientAPI.fuelEfficiency.createFuelEfficiency({
			car_id: carId,
			fe_date: date,
			fe_amount: amount!,
			fe_unitprice: unitPrice!,
			fe_mileage: totalMileage!,
		});

		alert("給油記録を登録し、走行距離を更新しました。");
		router.push("/refueling");
	};

	return (
		<PageContainer>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form onSubmit={handleSignUp}>
					<FormTitle>給油記録追加</FormTitle>

					{errors.fetchCar && <ErrorMessage>{errors.fetchCar}</ErrorMessage>}

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
					</FormElementContainer>

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
					</FormElementContainer>

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
					</FormElementContainer>

					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>総走行距離(km)</p>
						</Label>
						<Input
							type="number"
							step="0.01"
							min="0.01"
							value={inputMileage ?? ""}
							onChange={(e) => setInputMileage(Number(e.target.value))}
							placeholder={`現在の走行距離: ${latestMileage !== null ? latestMileage : oldCarMileage} km`}
						/>
					</FormElementContainer>
					<FuelEfficiencyDisplay>
						<FuelEfficiencyLabel>
							<Droplets color="#f12424" />
							<p>燃費</p>
						</FuelEfficiencyLabel>
						<FuelEfficiencyValue className={Anton400.className}>
							{(latestMileage ?? 0) > 0 &&
							totalMileage > 0 &&
							amount &&
							unitPrice
								? ((totalMileage - (latestMileage ?? 0)) / amount).toFixed(
										2,
									)
								: "0.00"}
							km/L
						</FuelEfficiencyValue>
					</FuelEfficiencyDisplay>

					<Button type="submit">登録</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default AddRefueling;
