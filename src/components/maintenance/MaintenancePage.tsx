"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ClientAPI } from "@/api/clientImplement";
import { carInfo, Maintenance } from "@/api/models/models";
import CarSelect from "@/components/base/CarSelect";
import MaintenanceDetail from "./MaintenanceDetail";
import { media } from "@/styles/breakpoints";

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

const Container = styled.div`
	position: relative;
	padding-bottom: 80px;
`;

interface MaintenancePageProps {
	userCars: carInfo[];
	token: string;
	userId: string;
}

const MaintenancePage: React.FC<MaintenancePageProps> = ({
	userCars,
	token,
}) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [maintenances, setMaintenances] = useState<Maintenance[] | null>(null);

	const switchCar = () => {
		setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
	};

	useEffect(() => {
		const fetchMaintenances = async () => {
			const clientAPI = ClientAPI(token);
			const response = await clientAPI.car.getCarMaintenance({
				car_id: userCars[selectedCarIndex].car_id,
			});
			setMaintenances(response);
		};
		fetchMaintenances();
	}, [selectedCarIndex, userCars, token]);

	return (
		<Container>
			<CarSelect
				userCars={userCars}
				selectedCarIndex={selectedCarIndex}
				switchCar={switchCar}
			/>
			<DetailContainer>
				{maintenances &&
					maintenances.map((maintenance) => (
						<MaintenanceDetail
							key={maintenance.maint_id}
							title={maintenance.maint_title}
							lastMaintenanceDate={new Date(
								maintenance.maint_date,
							).toLocaleDateString()}
							detail={maintenance.maint_description}
						/>
					))}
			</DetailContainer>
		</Container>
	);
};

export default MaintenancePage;
