"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Car } from "@/api/models/models";
import { media } from "@/styles/breakpoints";
import { ClientAPI } from "@/api/clientImplement";
import Image from "next/image";
import { ContentText } from "../text/TextComponents";
import theme from "@/styles/theme";
import { checkIsUserCars } from "@/module/checkUserCars";

const CarInfoContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
	background-color: ${theme.colors.cardBackground};
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	color: ${theme.colors.textPrimary};
	font-family: ${theme.fontFamily.primary};
	padding: 20px;

	${media.SPandTB} {
		width: 100dvw;
		border-radius: 0;
		box-shadow: none;
	}
	${media.PC} {
		margin-top: 2rem;
	}
`;

const CarImage = styled(Image)`
	width: 100%;
	height: auto;
	border-radius: 8px;
	margin-bottom: 1.5rem;

	${media.SPandTB} {
		border-radius: 0;
		margin-bottom: 1rem;
	}
`;

const CarInfoGrid = styled.div`
	display: grid;
	gap: 1rem;

	${media.SPandTB} {
		grid-template-columns: 1fr;
	}
	${media.PC} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const CarInfoItem = styled.div`
	background-color: ${theme.colors.baseBackground};
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

	${media.SPandTB} {
		padding: 0.75rem;
	}
`;

const CarInfoLabel = styled.span`
	font-weight: bold;
	color: ${theme.colors.textSecondary};
	font-size: ${theme.fontSizes.subContent};
`;

const CarInfoValue = styled.span`
	font-size: ${theme.fontSizes.content};
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	gap: 1rem;
	margin-top: 1rem;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	border-radius: 4px;
	font-size: ${theme.fontSizes.subsubContent};
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s ease;
	width: 30dvw;
`;

const EditButton = styled(Button)`
	background-color: ${theme.colors.buttonBackground};
	color: ${theme.colors.textPrimary};
	border: none;

	&:hover {
		background-color: ${theme.colors.buttonHoverBackground};
	}
`;

const DeleteButton = styled(Button)`
	background-color: ${theme.colors.error};
	color: ${theme.colors.textPrimary};
	border: none;

	&:hover {
		background-color: #d61f1f;
	}
`;

interface CarComponentProps {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarComponent = ({ carId, tokens }: CarComponentProps) => {
	const [userCar, setUserCar] = useState<Car | null>(null);
	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			const response = await clientAPI.car.getCar({
				car_id: carId,
			});
			setUserCar(response);
		};
		fetchCar();
	}, [carId, tokens]);

	const handleEdit = async () => {
		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}
		window.location.href = "/car/edit/" + carId;
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this car?")) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.car.deleteCar({
				car_id: carId,
			});
			// メインページにリダイレクト
			window.location.href = "/";
		}
	};

	return (
		<CarInfoContainer>
			<CarImage
				src={
					userCar?.car_image_url ||
					`https://r2.autotrack.work/images/No_Image9e6034d5.png`
				}
				alt="Your car"
				width={1200}
				height={720}
			/>
			<CarInfoGrid>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Car Name: </CarInfoLabel>
						<CarInfoValue>{userCar?.car_name}</CarInfoValue>
					</ContentText>
				</CarInfoItem>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Model Number: </CarInfoLabel>
						<CarInfoValue>{userCar?.carmodelnum}</CarInfoValue>
					</ContentText>
				</CarInfoItem>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Color: </CarInfoLabel>
						<CarInfoValue>{userCar?.car_color}</CarInfoValue>
					</ContentText>
				</CarInfoItem>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Mileage: </CarInfoLabel>
						<CarInfoValue>{userCar?.car_mileage} km</CarInfoValue>
					</ContentText>
				</CarInfoItem>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Flooded: </CarInfoLabel>
						<CarInfoValue>
							{userCar?.car_isflooding ? "Yes" : "No"}
						</CarInfoValue>
					</ContentText>
				</CarInfoItem>
				<CarInfoItem>
					<ContentText>
						<CarInfoLabel>Smoked in: </CarInfoLabel>
						<CarInfoValue>{userCar?.car_issmoked ? "Yes" : "No"}</CarInfoValue>
					</ContentText>
				</CarInfoItem>
			</CarInfoGrid>
			<ButtonContainer>
				<DeleteButton onClick={handleDelete}>Delete</DeleteButton>
				<EditButton onClick={handleEdit}>Edit</EditButton>
			</ButtonContainer>
		</CarInfoContainer>
	);
};

export default CarComponent;