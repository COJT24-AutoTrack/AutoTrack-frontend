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
		const fetchFuelEfficiencies = async () => {
			const clientAPI = ClientAPI(tokens.token);

			const response = await clientAPI.car.getCarFuelEfficiency({
				car_id: parseInt(carId, 10),
			});
			const fe = response.find((fe) => fe.fe_id === Number(feId));
			if (fe) {
				setDate(fe.fe_date.substr(0, 10)); // 日付をYYYY-MM-DD形式で設定
				setAmount(fe.fe_amount);
				setMileage(fe.fe_mileage);
				setUnitPrice(fe.fe_unitprice);
			}
		};
		fetchFuelEfficiencies();
	}, [tokens.token, carId, feId]);

	const handleRegister = async (event: React.FormEvent) => {
		event.preventDefault();

		const clientAPI = ClientAPI(tokens.token);
		const offsetDateTime = new Date(date).toISOString();

		console.log(tokens.token);
		console.log({
			car_id: parseInt(carId, 10),
			fe_date: offsetDateTime,
			fe_amount: amount,
			fe_unitprice: unitPrice,
			fe_mileage: mileage,
		});

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
				<Form onSubmit={handleRegister}>
					<BigLabel>給油記録追加</BigLabel>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>金額(円)</BigLabel>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>給油量</BigLabel>
						<input
							type="number"
							value={unitPrice}
							onChange={(e) => setUnitPrice(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>走行距離(km)</BigLabel>
						<input
							type="number"
							value={mileage}
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
