import { carInfo } from "@/api/models/models";
import React from "react";
import styled from "styled-components";
import { media } from "@/styles/breakpoints";
import theme from "@/styles/theme";
import { Anton } from "next/font/google";
import { ContentText } from "@/components/text/TextComponents";
import Image from "next/image";

interface CarCardComponentProps {
	userCar: carInfo;
	onClick: () => void;
}

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 8px;
	background: #1a1a1a;
	${media.SPandTB} {
		width: 280px;
	}
	${media.PC} {
		width: 800px;
	}
	height: auto;
	cursor: pointer;
`;

const CarImage = styled(Image)`
	${media.SPandTB} {
		height: 20dvh;
	}
	${media.PC} {
		@media screen and (max-height: 600px) {
			height: 50dvh;
		}
		@media screen and (min-height: 601px) {
			height: 60dvh;
		}
	}
	width: auto;
	object-fit: cover;
	align-self: stretch;
	border-radius: 8px;
`;

const CarName = styled.div`
	color: #fff;
	${media.SPandTB} {
		font-size: min(3dvh, 25px);
		text-align: center;
	}
	${media.PC} {
		font-size: ${theme.fontSizes.subContent};
		width: 100%;
		text-align: left;
	}
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const CarCardComponent: React.FC<CarCardComponentProps> = ({
	userCar,
	onClick,
}) => (
	<Card onClick={onClick}>
		<CarImage
			src={userCar.car_image_url}
			alt={userCar.car_name}
			width={1200}
			height={720}
		/>
		<CarName>
			{userCar.car_name} - {userCar.carmodelnum}
		</CarName>
	</Card>
);

export default CarCardComponent;