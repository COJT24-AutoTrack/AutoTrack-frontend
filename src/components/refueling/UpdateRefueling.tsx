"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FuelEfficiency } from "@/api/models/models";
import BackHeader from "@/components/base/BackHeader";
import BorderButton from "@/components/buttons/BorderButton";
import {
	BigLabel,
	Button,
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

interface UpdateFuelingProps {
	feId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const UpdateRefueling = ({ tokens, feId }: UpdateFuelingProps) => {
	const [fuelEfficiency, setFuelEfficiency] = useState<FuelEfficiency | null>(
		null,
	);
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState<number>(0);
	const [mileage, setMileage] = useState<number>(0);
	const [unitPrice, setUnitPrice] = useState<number>(0);

	const router = useRouter();

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
			setAmount(fuelEfficiency.fe_amount);
			setMileage(fuelEfficiency.fe_mileage);
			setUnitPrice(fuelEfficiency.fe_unitprice);
		}
	}, [fuelEfficiency]);

	const handleUpdate = async () => {
		if (fuelEfficiency) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.fuelEfficiency.updateFuelEfficiency({
				fe_id: fuelEfficiency.fe_id,
				car_id: fuelEfficiency.car_id,
				fe_date: date,
				fe_amount: amount,
				fe_unitprice: unitPrice,
				fe_mileage: mileage,
			});
			router.push("/refueling");
		}
	};

	const handleDelete = async () => {
		if (fuelEfficiency) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.fuelEfficiency.deleteFuelEfficiency({
				fe_id: fuelEfficiency.fe_id,
			});
			router.push("/refueling");
		}
	};

	return (
		<>
			<BackHeader route="/refueling" />
			<FormContainer>
				<Form>
					<BigLabel>給油記録編集</BigLabel>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>単価(円/L)</BigLabel>
						<input
							type="number"
							value={unitPrice}
							onChange={(e) => setUnitPrice(Number(e.target.value))}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>給油量(L)</BigLabel>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
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
							{mileage && amount ? (mileage / amount).toFixed(2) : "0"}km/L
						</BigLabel>
					</FormElementContainer>
					<ButtonsContainer>
						<Button onClick={handleUpdate} type="button">
							更新
						</Button>
						<BorderButton label="削除" onClick={handleDelete} type="button" />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default UpdateRefueling;
