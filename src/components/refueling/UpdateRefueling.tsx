"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import BackHeader from "@/components/base/BackHeader";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import { FuelEfficiency } from "@/api/models/models";
import {
	Calendar,
	Droplets,
	Fuel,
	JapaneseYen,
	Navigation,
	Trash2,
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
	width: 101px;
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

const DeleteButton = styled(Button)`
	background-color: transparent;
	border: 1px solid #f12424;
	color: #f12424;

	&:hover {
		background-color: rgba(241, 36, 36, 0.1);
	}
`;

const DeleteButtonInner = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

interface UpdateFuelingProps {
	feId: string;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const UpdateRefueling: React.FC<UpdateFuelingProps> = ({ tokens, feId }) => {
	const [fuelEfficiency, setFuelEfficiency] = useState<FuelEfficiency | null>(
		null,
	);
	const [date, setDate] = useState<string>("");
	const [fuelAmount, setFuelAmount] = useState<number | null>(null);
	const [totalMileage, setTotalMileage] = useState<number | null>(null);
	const [unitPrice, setUnitPrice] = useState<number | null>(null);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [deltaMileage, setDeltaMileage] = useState<number | null>(null);
	const [initialMileage, setInitialMileage] = useState<number | null>(null);

	useEffect(() => {
		const clientAPI = ClientAPI(tokens.token);
		const fetchFuelEfficiency = async () => {
			const response = await clientAPI.fuelEfficiency.getFuelEfficiency({
				fe_id: feId,
			});
			setFuelEfficiency(response);
		};
		fetchFuelEfficiency();
	}, [feId, tokens]);

	useEffect(() => {
		if (fuelEfficiency) {
			setDate(fuelEfficiency.fe_date);
			setFuelAmount(fuelEfficiency.fe_amount);
			setTotalMileage(fuelEfficiency.fe_mileage);
			setUnitPrice(fuelEfficiency.fe_unitprice);

			const fetchInitialMileage = async () => {
				const clientAPI = ClientAPI(tokens.token);
				const car = await clientAPI.car.getCar({ car_id: fuelEfficiency.car_id });
				setInitialMileage(car.car_mileage);
			};
			fetchInitialMileage();
		}
	}, [fuelEfficiency, tokens]);

	useEffect(() => {
		if (totalMileage !== null && initialMileage !== null) {
			if (fuelEfficiency && fuelEfficiency.fe_id === feId) {
				setDeltaMileage(totalMileage - initialMileage);
			}
		}
	}, [totalMileage, initialMileage, fuelEfficiency, feId]);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (date === "") {
			newErrors.date = "日付を入力してください";
		}
		if (unitPrice === null || unitPrice <= 0) {
			newErrors.unitPrice = "有効な単価を入力してください";
		}
		if (fuelAmount === null || fuelAmount <= 0) {
			newErrors.fuelAmount = "有効な給油量を入力してください";
		}
		if (totalMileage === null || totalMileage <= 0) {
			newErrors.totalMileage = "有効な走行距離を入力してください";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitted(true);

		if (!validateForm()) {
			return;
		}

		if (fuelEfficiency) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.fuelEfficiency.updateFuelEfficiency({
				fe_id: fuelEfficiency.fe_id,
				car_id: fuelEfficiency.car_id,
				fe_date: date,
				fe_amount: fuelAmount!,
				fe_unitprice: unitPrice!,
				fe_mileage: totalMileage!,
			});
			window.location.href = "/refueling";
		}
	};

	const handleDelete = async () => {
		if (fuelEfficiency) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.fuelEfficiency.deleteFuelEfficiency({
				fe_id: fuelEfficiency.fe_id,
			});
			window.location.href = "/refueling";
		}
	};

	return (
		<PageContainer>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form onSubmit={handleUpdate}>
					<FormTitle>給油記録編集</FormTitle>
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
					<FormElementContainer>
						<Label>
							<JapaneseYen color="white" />
							<p>単価(円/L)</p>
						</Label>
						<Input
							type="number"
							value={unitPrice || ""}
							onChange={(e) => setUnitPrice(Number(e.target.value))}
							min="0.01"
							step="0.01"
							required
						/>
						{isSubmitted && errors.unitPrice && (
							<ErrorMessage>{errors.unitPrice}</ErrorMessage>
						)}
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Fuel color="white" />
							<p>給油量(L)</p>
						</Label>
						<Input
							type="number"
							value={fuelAmount || ""}
							onChange={(e) => setFuelAmount(Number(e.target.value))}
							min="0.01"
							step="0.01"
							required
						/>
						{isSubmitted && errors.fuelAmount && (
							<ErrorMessage>{errors.fuelAmount}</ErrorMessage>
						)}
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>走行距離(km)</p>
						</Label>
						<Input
							type="number"
							value={totalMileage || ""}
							onChange={(e) => setTotalMileage(Number(e.target.value))}
							min="0.01"
							step="0.01"
							required
						/>
						{isSubmitted && errors.totalMileage && (
							<ErrorMessage>{errors.totalMileage}</ErrorMessage>
						)}
					</FormElementContainer>
					<FuelEfficiencyDisplay>
						<FuelEfficiencyLabel>
							<Droplets color="#f12424" />
							<p>燃費</p>
						</FuelEfficiencyLabel>
						<FuelEfficiencyValue className={Anton400.className}>
							{deltaMileage !== null && fuelAmount && fuelAmount > 0
								? (deltaMileage / fuelAmount).toFixed(2)
								: "0.00"}
							km/L
						</FuelEfficiencyValue>
					</FuelEfficiencyDisplay>
					<ButtonsContainer>
						<DeleteButton type="button" onClick={handleDelete}>
							<DeleteButtonInner>
								<Trash2 size={18} />
								<p>削除</p>
							</DeleteButtonInner>
						</DeleteButton>
						<Button type="submit">更新</Button>
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default UpdateRefueling;
