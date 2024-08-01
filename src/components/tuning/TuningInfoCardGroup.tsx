"use client";

import styled from "styled-components";
import { Tuning } from "@/api/models/models";
import TuningInfoCard from "@/components/tuning/TuningInfoCard";

const Container = styled.div`
	display: flex;
	padding: 15px 25px;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	flex: 1 0 0;
	align-self: stretch;
`;

interface TuningInfoCardGroupProps {
	tunings: Tuning[];
}

const TuningInfoCardGroup: React.FC<TuningInfoCardGroupProps> = ({
	tunings,
}) => {
	return (
		<Container>
			{tunings.map((tuning) => (
				<TuningInfoCard key={tuning.tuning_id} tuning={tuning} />
			))}
		</Container>
	);
};

export default TuningInfoCardGroup;
