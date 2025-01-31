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
	// 日付順に昇順ソート（新しいデータが後ろ）
	const ascendingFuelEfficiencies = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime()
	);

	// 表示用に逆順（最新のデータが上）
	const sortedFuelEfficiencies = [...ascendingFuelEfficiencies].reverse();

	let prevMileage: number | null = null;

	// `Map` のキーを `string` に統一
	const fuelEfficiencyMap = new Map<string, { fuelEfficiency: number | null; deltaMileage: number | null }>();

	ascendingFuelEfficiencies.forEach((fe, index) => {
		let fuelEfficiency: number | null = null;
		let deltaMileage: number | null = null;

		// `fe.fe_mileage` を `number` に変換
		const currentMileage = Number(fe.fe_mileage);
		const key = String(fe.fe_id); // `fe_id` を `string` に変換してキーにする

		if (prevMileage !== null && currentMileage > prevMileage && Number(fe.fe_amount) > 0) {
			fuelEfficiency = (currentMileage - prevMileage) / Number(fe.fe_amount);
		}

		if (index > 0) {
			const previousMileage = Number(ascendingFuelEfficiencies[index - 1].fe_mileage);
			deltaMileage = currentMileage - previousMileage;
		}

		// `Map` に登録
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
