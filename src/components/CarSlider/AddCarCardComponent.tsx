import React from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { CirclePlus } from "lucide-react";

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
	cursor: pointer;
`;

const Card = styled.div`
	display: flex;
	height: 20dvh;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	align-self: stretch;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #858585;
`;

const AddTextSpan = styled.span`
	color: #2b2b2b;
	text-align: center;
	font-size: 6dvh;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const AddCarIconWrapper = styled.div`
	svg {
		width: 8dvh;
		height: 8dvh;
	}
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
			<AddCarIconWrapper>
				<CirclePlus color="#2b2b2b" />
			</AddCarIconWrapper>
		</Card>
	</CardContainer>
);

export default AddCarCardComponent;