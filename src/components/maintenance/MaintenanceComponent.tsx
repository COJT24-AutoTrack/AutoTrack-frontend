"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	Car,
	Maintenance,
	MaintType,
	maintenanceTypeMap,
} from "@/api/models/models";
import CarSelect from "@/components/base/CarSelect";
import MaintenanceDetail from "@/components/maintenance/MaintenanceDetail";
import { media } from "@/styles/breakpoints";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import AddIcon from "/public/icons/AddIcon.svg";

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
	position: fixed;
	right: 14px;
	bottom: 100px;
	width: 80px;
	height: 80px;
	background-color: transparent;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		width: 100px;
		height: 100px;
	}
`;

const Container = styled.div`
	position: relative;
	padding-bottom: 80px;
`;

const Fixed = styled.div``;

interface MaintenancePageProps {
	userCars: Car[] | null;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const MaintenanceComponent: React.FC<MaintenancePageProps> = ({
	userCars,
	tokens,
}) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [maintenances, setMaintenances] = useState<Maintenance[] | null>(null);
	const router = useRouter();

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	const handleAddClick = () => {
		router.push(`/maintenance/add?selectedCarIndex=${selectedCarIndex}`);
	};

	useEffect(() => {
		const fetchMaintenances = async () => {
			if (userCars && userCars.length !== 0) {
				const clientAPI = ClientAPI(tokens.token);
				const response = await clientAPI.car.getCarMaintenance({
					car_id: userCars[selectedCarIndex].car_id,
				});
				setMaintenances(response);
			}
		};
		fetchMaintenances();
	}, [selectedCarIndex, userCars, tokens.token]);

	const getMaintTypeDetails = (maintType: MaintType) => {
		const maintenance = maintenances?.find(
			(maintenance) => maintenance.maint_type === maintType,
		);
		return maintenance
			? {
					title: maintenance.maint_title,
					lastMaintenanceDate: new Date(
						maintenance.maint_date,
					).toLocaleDateString(),
					detail: maintenance.maint_description,
				}
			: { title: "", lastMaintenanceDate: "", detail: "" };
	};

	const handleDetailClick = async (carId: number, maintType: MaintType) => {
		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			router.push("/");
			return;
		}
		router.push(
			`/maintenance/${maintType}?selectedCarIndex=${selectedCarIndex}`,
		);
	};

	if (!userCars) {
		return <div>ユーザーの車が見つかりません</div>;
	}
	return (
		<Container>
			<Fixed>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</Fixed>
			<DetailContainer>
				{Object.values(MaintType).map((maintType) => {
					const { title, lastMaintenanceDate, detail } =
						getMaintTypeDetails(maintType);
					return (
						<MaintenanceDetail
							key={maintType}
							maintType={maintenanceTypeMap[maintType] || maintType}
							title={title || ""}
							lastMaintenanceDate={lastMaintenanceDate}
							detail={detail}
							onDetailClick={() =>
								handleDetailClick(userCars[selectedCarIndex].car_id, maintType)
							}
						/>
					);
				})}
			</DetailContainer>
			{userCars.length !== 0 && (
				<SVGButton onClick={handleAddClick}>
					<AddIcon style={{ fill: "red" }} />
				</SVGButton>
			)}
		</Container>
	);
};

export default MaintenanceComponent;
