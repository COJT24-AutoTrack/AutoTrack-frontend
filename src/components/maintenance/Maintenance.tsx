"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MaintenanceDetail from "./MaintenanceDetail";
import { media } from "@/styles/breakpoints";
import CarSelect from "@/components/base/CarSelect";
import { useRouter } from "next/navigation";
import AddIcon from "@/public/icons/AddIcon.svg";
import { carInfo } from "@/api/models/models";
import { createClientAPI } from "@/api/clientImplement";

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	${media.SP} {
		padding: 0px;
		width: 100dvw;
	}
	${media.PC} {
		padding: 20px;
	}
	margin: 0;
`;

const SVGButton = styled.button`
	background-color: #f0f0f0;
	border: none;
	cursor: pointer;
	padding: 10px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	svg {
		width: 24px;
		height: 24px;
		fill: red;
	}
`;

interface MaintenanceProps {
	userCars: carInfo[];
	userId: string;
}

const MaintenancePage: React.FC<MaintenanceProps> = ({ userCars, userId }) => {
	const router = useRouter();
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [maintenanceDetails, setMaintenanceDetails] = useState<any[]>([]);

	const switchCar = () => {
		setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
	};

	useEffect(() => {
		const fetchMaintenanceDetails = async () => {
			const clientAPI = createClientAPI();
			const car_id = userCars[selectedCarIndex].car_id.toString();

			try {
				const response = await clientAPI.user.getMaintenance({
					user_id: userId,
					car_id: car_id,
				});
				setMaintenanceDetails(response);
			} catch (error) {
				console.error("Failed to fetch maintenance details:", error);
			}
		};

		fetchMaintenanceDetails();
	}, [selectedCarIndex, userCars, userId]);

	const handleAddClick = () => {
		router.push("/addMaintenance");
	};

	return (
		<>
			<DetailContainer>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>

				{maintenanceDetails.map((detail) => (
					<MaintenanceDetail
						key={detail.maint_id}
						title={detail.maint_type}
						lastMaintenanceDate={detail.maint_date.toString()} // Date オブジェクトを文字列に変換
						detail={detail.maint_description}
						detailUrl={`/maintenance/${detail.maint_id}`}
					/>
				))}
			</DetailContainer>
			<SVGButton onClick={handleAddClick}>
				<AddIcon />
			</SVGButton>
		</>
	);
};

export default MaintenancePage;
