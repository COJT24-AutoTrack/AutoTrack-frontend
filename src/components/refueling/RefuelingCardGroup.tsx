"use client";

import styled from "styled-components";
import RefuelingCard from "./RefuelingCard";
import { FuelEfficiency } from "@/api/models/models";

const Container = styled.div`
	display: flex;
	padding: 15px 25px;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	flex: 1 0 0;
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
			{fuelEfficiencies.map((fe) => (
				<RefuelingCard key={fe.fe_id} fuelEfficiency={fe} />
			))}
		</Container>
	);
};

export default RefuelingCardGroup;
