"use client";

import styled from "styled-components";
import {
	SubContentText,
	SubSubContentText,
	TitleText,
} from "../text/TextComponents";
import BackIcon from "../../public/icons/BackIcon.svg";
import { Tuning } from "@/api/models/models";
import { useRouter } from "next/navigation";

const Container = styled.div`
	display: flex;
	padding: 10px 15px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
`;

const ButtonConainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 5px;
	align-self: stretch;
`;

const NextPageSVG = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		fill: white;
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
			router.push(`/updateTuning?id=${tuning.tuning_id}`);
		}
	};

	return (
		<Container>
			<SubSubContentText>日付：{tuning.tuning_date}</SubSubContentText>
			<SubSubContentText>タイトル：{tuning.tuning_name}</SubSubContentText>
			<SubSubContentText>内容：{tuning.tuning_description}</SubSubContentText>
			<ButtonConainer onClick={handleDetailClick}>
				<SubSubContentText>詳細</SubSubContentText>
				<NextPageSVG>
					<BackIcon style={{ fill: "white" }} />
				</NextPageSVG>
			</ButtonConainer>
		</Container>
	);
};

export default TuningInfoCard;
