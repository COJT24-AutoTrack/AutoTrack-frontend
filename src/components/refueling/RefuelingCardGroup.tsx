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
	carMileage: number | null;
}

const RefuelingCardGroup: React.FC<RefuelingCardGroupProps> = ({
	fuelEfficiencies,
	carMileage,
}) => {
	// 昇順にソート（古いデータが先）
	const ascendingFuelEfficiencies = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime(),
	);

	// 表示用に逆順（最新のデータが上）
	const sortedFuelEfficiencies = [...ascendingFuelEfficiencies].reverse();

	let prevMileage: number | null = null;

	const fuelEfficiencyMap = new Map<
		string,
		{ fuelEfficiency: number | null; deltaMileage: number | null }
	>();

	ascendingFuelEfficiencies.forEach((fe, index) => {
		let fuelEfficiency: number | null = null;
		let deltaMileage: number | null = null;

		const currentMileage = Number(fe.fe_mileage);
		const key = String(fe.fe_id);

		if (index === 0) {
			// 最初の給油記録は car_mileage と比較
			const initialMileage = carMileage !== null ? carMileage : 0;
			deltaMileage = currentMileage - initialMileage;
		} else {
			// 2回目以降: 前の給油データと比較
			const previousMileage = Number(
				ascendingFuelEfficiencies[index - 1].fe_mileage,
			);
			deltaMileage = currentMileage - previousMileage;
		}

		if (deltaMileage !== null && deltaMileage > 0 && Number(fe.fe_amount) > 0) {
			fuelEfficiency = deltaMileage / Number(fe.fe_amount);
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
