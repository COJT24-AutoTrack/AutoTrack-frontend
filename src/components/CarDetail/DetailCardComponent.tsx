import React from "react";
import styled from "styled-components";
import { Anton } from "@next/font/google";
import { media } from "@/styles/breakpoints";

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
	height: 100px;
	padding: 10px;
	flex-direction: column;
	align-items: center;
	flex: 1 0 0;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
`;

const LabelContainer = styled.span`
	display: flex;
	align-items: center;
	gap: 10px;
	align-self: stretch;
`;

const Label = styled.span`
	color: #fff;
	text-align: center;
	font-size: 16px;
	line-height: normal;
`;

const Text = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: 9px;
`;

const Value = styled.span`
	color: #fff;
	text-align: center;
	font-size: 36px;
	line-height: normal;
`;

const Unit = styled.span`
	color: #fff;
	text-align: center;
	font-size: 20px;
	line-height: normal;
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
