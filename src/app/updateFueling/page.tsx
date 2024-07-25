"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientAPI } from "@/api/clientImplement";
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

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface UpdateFuelingProps {
	fuelEfficiencies: FuelEfficiency[];
}

const UpdateRefueling: React.FC<UpdateFuelingProps> = ({
	fuelEfficiencies,
}) => {
	const [fuelEfficiency, setFuelEfficiency] = useState<FuelEfficiency | null>(
		null,
	);
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState(0);
	const [mileage, setMileage] = useState(0);
	const [unitPrice, setUnitPrice] = useState(0);

	const router = useRouter();
	const searchParams = useSearchParams();
	const feId = searchParams.get("id");

	useEffect(() => {
		if (fuelEfficiencies) {
			const fe = fuelEfficiencies.find((fe) => fe.fe_id === Number(feId));
			if (fe) {
				setFuelEfficiency(fe);
				setDate(fe.fe_date);
				setAmount(fe.fe_amount);
				setMileage(fe.fe_mileage);
				setUnitPrice(fe.fe_unitprice);
			}
		}
	}, [feId, fuelEfficiencies]);

	const handleUpdate = async () => {
		if (fuelEfficiency) {
			const clientAPI = createClientAPI();
			await clientAPI.fuelEfficiency.updateFuelEfficiency({
				id: fuelEfficiency.fe_id,
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
			const clientAPI = createClientAPI();
			await clientAPI.fuelEfficiency.deleteFuelEfficiency({
				id: fuelEfficiency.fe_id,
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
						<MainButton label="更新" onClick={handleUpdate} />
						<BorderButton label="削除" onClick={handleDelete} />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default UpdateRefueling;
