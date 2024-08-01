"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FuelEfficiency } from "@/api/models/models";
import BackHeader from "@/components/base/BackHeader";
import MainButton from "@/components/buttons/MainButton";
import {
	BigLabel,
	ButtonsContainer,
	Form,
	FormContainer,
	FormElementContainer,
} from "@/components/form/FormElements";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface AddFuelEfficiencyProps {
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	carId: string;
}

const AddRefueling: React.FC<AddFuelEfficiencyProps> = ({ tokens, carId }) => {
	const [date, setDate] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [mileage, setMileage] = useState<number>(0);
	const [unitPrice, setUnitPrice] = useState<number>(0);

	const router = useRouter();
	const searchParams = useSearchParams();
	const feId = searchParams.get("id");

	useEffect(() => {
		const checkUserCars = async () => {};
	}, [tokens.token, carId, feId]);

	const handleSignUp = async (event: React.FormEvent) => {
		event.preventDefault();

		const clientAPI = ClientAPI(tokens.token);
		const offsetDateTime = new Date(date).toISOString();

		const response = await clientAPI.user.getUserCars({
			firebase_user_id: tokens.decodedToken.uid,
		});
		const userCarIds = response.map((car) => car.car_id);
		if (!userCarIds.includes(parseInt(carId, 10))) {
			alert("その車両は登録されていません");
			router.push("/");
			return;
		}

		await clientAPI.fuelEfficiency.createFuelEfficiency({
			car_id: parseInt(carId, 10),
			fe_date: offsetDateTime,
			fe_amount: amount,
			fe_unitprice: unitPrice,
			fe_mileage: mileage,
		});
		router.push("/refueling");
	};

	return (
		<>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form onSubmit={handleSignUp}>
					<BigLabel>給油記録追加</BigLabel>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<input type="date" onChange={(e) => setDate(e.target.value)} />
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>単価(円/L)</BigLabel>
						<input
							type="number"
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>給油量(L)</BigLabel>
						<input
							type="number"
							onChange={(e) => setUnitPrice(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>走行距離(km)</BigLabel>
						<input
							type="number"
							onChange={(e) => setMileage(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel style={{ color: "red" }}>燃費</BigLabel>
						<BigLabel className={Anton400.className}>
							{mileage && unitPrice ? (mileage / unitPrice).toFixed(2) : "0"}km
						</BigLabel>
					</FormElementContainer>
					<ButtonsContainer>
						<MainButton label="登録" type="submit" />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default AddRefueling;
