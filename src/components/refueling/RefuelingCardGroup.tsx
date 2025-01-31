"use client";

import styled from "styled-components";
import RefuelingCard from "@/components/refueling/RefuelingCard";
import { FuelEfficiency } from "@/api/models/models";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

interface RefuelingCardGroupProps {
	fuelEfficiencies: FuelEfficiency[];
}

const RefuelingCardGroup: React.FC<RefuelingCardGroupProps> = ({
	fuelEfficiencies,
}) => {
	// 燃費計算用にデータを整形し、表示順に戻すための処理が後に続いている
	const ascendingFuelEfficiencies = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime()
	);

	const sortedFuelEfficiencies = [...ascendingFuelEfficiencies].reverse();

	let prevMileage: number | null = null;

	const fuelEfficiencyMap = new Map<string, { fuelEfficiency: number | null; deltaMileage: number | null }>();

	ascendingFuelEfficiencies.forEach((fe, index) => {
		let fuelEfficiency: number | null = null;
		let deltaMileage: number | null = null;

		const currentMileage = Number(fe.fe_mileage);
		const key = String(fe.fe_id);

		if (prevMileage !== null && currentMileage > prevMileage && Number(fe.fe_amount) > 0) {
			fuelEfficiency = (currentMileage - prevMileage) / Number(fe.fe_amount);
		}

		if (index > 0) {
			const previousMileage = Number(ascendingFuelEfficiencies[index - 1].fe_mileage);
			deltaMileage = currentMileage - previousMileage;
		}

		fuelEfficiencyMap.set(key, { fuelEfficiency, deltaMileage });

		prevMileage = currentMileage;
	});

	return (
		<Container>
			{sortedFuelEfficiencies.map((fe) => {
				const key = String(fe.fe_id);
				const { fuelEfficiency, deltaMileage } = fuelEfficiencyMap.get(key) || {
					fuelEfficiency: null,
					deltaMileage: null,
				};

				return (
					<RefuelingCard
						key={key}
						fuelEfficiency={fe}
						calculatedFuelEfficiency={fuelEfficiency}
						deltaMileage={deltaMileage}
					/>
				);
			})}
		</Container>
	);
};

export default RefuelingCardGroup;
