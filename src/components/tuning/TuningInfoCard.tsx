"use client";

import styled from "styled-components";
import { SubSubContentText } from "../text/TextComponents";
import { Tuning } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Container = styled.div`
	display: flex;
	padding: 0px 30px;
	align-items: center;
	gap: 10px;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
	position: relative;
`;

const ContentContainer = styled.div`
	display: flex;
	padding: 10px 5px;
	gap: 5px;
	flex: 1;
	flex-direction: column;
	align-items: flex-start;
`;

const ButtonContainer = styled.div`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	width: 30px;
`;
const NextPageSVG = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		width: 12px;
		height: 12px;
		margin-right: 8px;
	}
`;

const CsvButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: 2px solid #f12424;
	border-radius: 10px;
	color: #f12424;
	cursor: pointer;
	padding: 5px 10px;
	transition:
		background-color 0.3s,
		color 0.3s;

	&:hover {
		background-color: #f12424;
		color: white;
	}
`;

interface TuningInfoCardProps {
	tuning: Tuning;
}

const TuningInfoCard: React.FC<TuningInfoCardProps> = ({ tuning }) => {
	const router = useRouter();

	const handleDetailClick = () => {
		if (tuning) {
			window.location.href = `/tuning/update/${tuning.tuning_id}`;
		}
	};

	return (
		<Container>
			<ContentContainer>
				<SubSubContentText>{tuning.tuning_date}</SubSubContentText>
				<SubSubContentText>{tuning.tuning_name}</SubSubContentText>
				<SubSubContentText>{tuning.tuning_description}</SubSubContentText>
			</ContentContainer>
			<ButtonContainer onClick={handleDetailClick}>
				<NextPageSVG>
					<ChevronRightIcon color="white" />
				</NextPageSVG>
			</ButtonContainer>
		</Container>
	);
};

export default TuningInfoCard;
