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
	return (
		<Container>
			{[...fuelEfficiencies].reverse().map((fe) => (
				<RefuelingCard key={fe.fe_id} fuelEfficiency={fe} />
			))}
		</Container>
	);
};

export default RefuelingCardGroup;
