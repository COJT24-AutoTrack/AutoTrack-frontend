import React from "react";
import styled from "styled-components";
import { Anton } from "@next/font/google";
import AddCarIcon from "../../public/icons/AddIcon.svg";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const CardContainer = styled.div`
	display: flex;
	width: 280px;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 8px;
	background: #1a1a1a;
`;

const Card = styled.div`
	padding: 20px;
	display: flex;
	height: 192px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #858585;
`;

const AddTextSpan = styled.span`
	color: #2b2b2b;
	text-align: center;
	font-size: 40px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

interface AddCarCardComponentProps {
	onClick: () => void;
}

const AddCarCardComponent: React.FC<AddCarCardComponentProps> = ({
	onClick,
}) => (
	<CardContainer onClick={onClick}>
		<Card>
			<AddTextSpan className={Anton400.className}>Add Car</AddTextSpan>
			<AddCarIcon />
		</Card>
	</CardContainer>
);

export default AddCarCardComponent;
