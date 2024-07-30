"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Car, Maintenance, MaintType } from "@/api/models/models";
import CarSelect from "@/components/base/CarSelect";
import MaintenanceDetail from "./MaintenanceDetail";
import { media } from "@/styles/breakpoints";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";

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
	userCars: Car[];
	token: string;
}

const MaintenanceComponent: React.FC<MaintenancePageProps> = ({
	userCars,
	token,
}) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [maintenances, setMaintenances] = useState<Maintenance[] | null>(null);
	const router = useRouter();

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

	const getMaintTypeDetails = (maintType: MaintType) => {
		const maintenance = maintenances?.find(
			(maintenance) => maintenance.maint_type === maintType
		);
		return maintenance
			? {
					lastMaintenanceDate: new Date(maintenance.maint_date).toLocaleDateString(),
					detail: maintenance.maint_description,
			  }
			: { lastMaintenanceDate: "", detail: "" };
	};

	const handleDetailClick = (carId: number, maintType: MaintType) => {
		router.push(`/maintenance/${carId}/${maintType}`);
	};

	return (
		<Container>
			<CarSelect
				userCars={userCars}
				selectedCarIndex={selectedCarIndex}
				switchCar={switchCar}
			/>
			<DetailContainer>
				{Object.values(MaintType).map((maintType) => {
					const { lastMaintenanceDate, detail } = getMaintTypeDetails(maintType);
					return (
						<MaintenanceDetail
							key={maintType}
							title={maintType}
							lastMaintenanceDate={lastMaintenanceDate}
							detail={detail}
							onDetailClick={() =>
								handleDetailClick(userCars[selectedCarIndex].car_id, maintType)
							}
						/>
					);
				})}
			</DetailContainer>
		</Container>
	);
};

export default MaintenanceComponent;
