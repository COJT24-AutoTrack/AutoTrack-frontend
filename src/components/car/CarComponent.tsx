"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { Car } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";
import Image from "next/image";
import { checkIsUserCars } from "@/module/checkUserCars";
import {
	Car as CarIcon,
	Hash,
	Palette,
	Navigation,
	Droplet,
	Cigarette,
	Edit,
	Trash2,
} from "lucide-react";
import BackHeader from "../base/BackHeader";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
	padding: 20px;
`;

const CarInfoContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	background-color: #2b2b2b;
	border-radius: 8px;
	padding: 20px;
`;

const CarImage = styled(Image)`
	width: 100%;
	height: auto;
	border-radius: 8px;
	margin-bottom: 20px;
`;

const CarInfoGrid = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const CarInfoItem = styled.div`
	background-color: #333333;
	padding: 15px;
	border-radius: 8px;
`;

const CarInfoLabel = styled.span`
	font-weight: bold;
	color: #999999;
	font-size: 14px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const CarInfoValue = styled.span`
	font-size: 16px;
	margin-top: 5px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;

const Button = styled.button`
	padding: 12px 20px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const EditButton = styled(Button)`
	background-color: #f12424;
	color: #ffffff;
	border: none;

	&:hover {
		background-color: #d61f1f;
	}
`;

const DeleteButton = styled(Button)`
	background-color: transparent;
	color: #f12424;
	border: 1px solid #f12424;

	&:hover {
		background-color: rgba(241, 36, 36, 0.1);
	}
`;

interface CarComponentProps {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarComponent: React.FC<CarComponentProps> = ({ carId, tokens }) => {
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
		if (window.confirm("この車両を削除してもよろしいですか？")) {
			const clientAPI = ClientAPI(tokens.token);
			await clientAPI.car.deleteCar({
				car_id: carId,
			});
			window.location.href = "/";
		}
	};

	return (
		<div>
			<BackHeader route={"/"} />
			<PageContainer>
				<CarInfoContainer>
					<CarImage
						src={
							userCar?.car_image_url ||
							`https://r2.autotrack.work/images/No_Image9e6034d5.png`
						}
						alt="Your car"
						width={800}
						height={480}
					/>
					<CarInfoGrid>
						<CarInfoItem>
							<CarInfoLabel>
								<CarIcon size={16} /> 車名
							</CarInfoLabel>
							<CarInfoValue>{userCar?.car_name}</CarInfoValue>
						</CarInfoItem>
						<CarInfoItem>
							<CarInfoLabel>
								<Hash size={16} /> 型式番号
							</CarInfoLabel>
							<CarInfoValue>{userCar?.carmodelnum}</CarInfoValue>
						</CarInfoItem>
						<CarInfoItem>
							<CarInfoLabel>
								<Palette size={16} /> 色
							</CarInfoLabel>
							<CarInfoValue>{userCar?.car_color}</CarInfoValue>
						</CarInfoItem>
						<CarInfoItem>
							<CarInfoLabel>
								<Navigation size={16} /> 走行距離
							</CarInfoLabel>
							<CarInfoValue>{userCar?.car_mileage} km</CarInfoValue>
						</CarInfoItem>
						<CarInfoItem>
							<CarInfoLabel>
								<Droplet size={16} /> 浸水車
							</CarInfoLabel>
							<CarInfoValue>
								{userCar?.car_isflooding ? "はい" : "いいえ"}
							</CarInfoValue>
						</CarInfoItem>
						<CarInfoItem>
							<CarInfoLabel>
								<Cigarette size={16} /> 喫煙車
							</CarInfoLabel>
							<CarInfoValue>
								{userCar?.car_issmoked ? "はい" : "いいえ"}
							</CarInfoValue>
						</CarInfoItem>
					</CarInfoGrid>
					<ButtonContainer>
						<DeleteButton onClick={handleDelete}>
							<Trash2 size={18} />
							削除
						</DeleteButton>
						<EditButton onClick={handleEdit}>
							<Edit size={18} />
							編集
						</EditButton>
					</ButtonContainer>
				</CarInfoContainer>
			</PageContainer>
		</div>
	);
};

export default CarComponent;
