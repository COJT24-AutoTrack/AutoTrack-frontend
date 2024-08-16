"use client";

import React from "react";
import styled from "styled-components";
import { Tuning } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ChevronRight, Calendar, Wrench, FileText } from "lucide-react";

const CardContainer = styled.div`
	width: min(93dvw, 860px);
	background-color: #2b2b2b;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #3a3a3a;
`;

const CardContent = styled.div`
	flex: 1;
`;

const InfoText = styled.p`
	font-size: 14px;
	color: #ffffff;
	margin: 0 0 8px 0;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const DateText = styled(InfoText)`
	color: #999;
`;

const DetailButton = styled.button`
	background: none;
	color: #ffffff;
	border: none;
	padding: 8px;
	cursor: pointer;
	border-radius: 4px;
	transition: background-color 0.3s;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
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
		<CardContainer>
			<CardContent>
				<DateText>
					<Calendar size={16} />
					{new Date(tuning.tuning_date).toLocaleDateString()}
				</DateText>
				<InfoText>
					<Wrench size={16} />
					{tuning.tuning_name}
				</InfoText>
				<InfoText>
					<FileText size={16} />
					{tuning.tuning_description}
				</InfoText>
			</CardContent>
			<DetailButton onClick={handleDetailClick}>
				<ChevronRight size={24} />
			</DetailButton>
		</CardContainer>
	);
};

export default TuningInfoCard;
