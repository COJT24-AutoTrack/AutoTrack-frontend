"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FuelEfficiency } from "@/api/models/models";
import BackHeader from "@/components/base/BackHeader";
import BorderButton from "@/components/buttons/BorderButton";
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
	const [amount, setAmount] = useState("");
	const [mileage, setMileage] = useState("");
	const [unitPrice, setUnitPrice] = useState("");

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
			setAmount(fuelEfficiency.fe_amount.toString());
			setMileage(fuelEfficiency.fe_mileage.toString());
			setUnitPrice(fuelEfficiency.fe_unitprice.toString());
		}
	}, [fuelEfficiency]);

	const handleUpdate = async () => {
		console.log("pushed update button");
		if (fuelEfficiency) {
			console.log("update fuelEfficiency", fuelEfficiency);
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.fuelEfficiency.updateFuelEfficiency({
				fe_id: fuelEfficiency.fe_id,
				car_id: fuelEfficiency.car_id,
				fe_date: date,
				fe_amount: parseFloat(amount),
				fe_unitprice: parseFloat(unitPrice),
				fe_mileage: parseFloat(mileage),
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
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>給油量(L)</BigLabel>
						<input
							type="number"
							value={unitPrice}
							onChange={(e) => setUnitPrice(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>走行距離(km)</BigLabel>
						<input
							type="number"
							value={mileage}
							onChange={(e) => setMileage(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel style={{ color: "red" }}>燃費</BigLabel>
						<BigLabel className={Anton400.className}>
							{mileage &&
							unitPrice &&
							!isNaN(parseFloat(mileage)) &&
							!isNaN(parseFloat(unitPrice))
								? (parseFloat(mileage) / parseFloat(unitPrice)).toFixed(2)
								: "0"}
							km
						</BigLabel>
					</FormElementContainer>
					<ButtonsContainer>
						<MainButton label="更新" onClick={handleUpdate} type="button" />
						<BorderButton label="削除" onClick={handleDelete} type="button" />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default UpdateRefueling;
