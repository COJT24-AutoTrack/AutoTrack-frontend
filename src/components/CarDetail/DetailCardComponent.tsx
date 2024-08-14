import React from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface DetailCardComponentProps {
	label: string; // 左上のラベル
	value: number; // 中央の数値
	unit: string; // 単位
}

const Card = styled.div`
	display: flex;
	width: 100%;
	@media screen and (max-height: 600px) {
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 2dvw 10px 2dvw;
	}
	@media screen and (min-height: 601px) {
		flex-direction: column;
		padding: 5px 2dvw 10px 2dvw;
	}
	justify-content: space-evenly;
	align-items: center;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
`;

const LabelContainer = styled.span`
	display: flex;
	align-items: center;
	align-self: stretch;
`;

const Label = styled.span`
	color: #fff;
	text-align: center;
	font-size: min(16px, 2dvh);
	line-height: normal;
`;

const Text = styled.p`
	display: flex;
	align-items: flex-end;
	gap: 5px;
`;

const Value = styled.span`
	color: #fff;
	text-align: center;
	font-size: min(36px, 4dvh);
	line-height: normal;
	vertical-align: baseline;
	line-height: 1;
`;

const Unit = styled.span`
	color: #fff;
	text-align: center;
	font-size: min(20px, 2dvh);
	line-height: normal;
	line-height: 1;
`;

const DetailCardComponent: React.FC<DetailCardComponentProps> = ({
	label,
	value,
	unit,
}) => (
	<Card>
		<LabelContainer>
			<Label className={Anton400.className}>{label}</Label>
		</LabelContainer>
		<Text>
			<Value className={Anton400.className}>{value.toLocaleString()}</Value>
			<Unit className={Anton400.className}>{unit}</Unit>
		</Text>
	</Card>
);

export default DetailCardComponent;
