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
	// 燃費計算用にソート　->　表示用に逆順にする処理をしている
	const ascendingFuelEfficiencies = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime()
	);

	const sortedFuelEfficiencies = [...ascendingFuelEfficiencies].reverse();

	let prevMileage: number | null = null;
	const fuelEfficiencyMap = new Map<number, { fuelEfficiency: number | null; deltaMileage: number | null }>();

	ascendingFuelEfficiencies.forEach((fe, index) => {
		let fuelEfficiency: number | null = null;
		let deltaMileage: number | null = null;

		if (prevMileage !== null && fe.fe_mileage > prevMileage && fe.fe_amount > 0) {
			fuelEfficiency = (fe.fe_mileage - prevMileage) / fe.fe_amount;
		}

		if (index > 0) {
			deltaMileage = fe.fe_mileage - ascendingFuelEfficiencies[index - 1].fe_mileage;
		}

		fuelEfficiencyMap.set(fe.fe_id, { fuelEfficiency, deltaMileage });

		prevMileage = fe.fe_mileage;
	});

	return (
		<Container>
			{sortedFuelEfficiencies.map((fe) => {
				const { fuelEfficiency, deltaMileage } = fuelEfficiencyMap.get(fe.fe_id) || {
					fuelEfficiency: null,
					deltaMileage: null,
				};

				return (
					<RefuelingCard
						key={fe.fe_id}
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

