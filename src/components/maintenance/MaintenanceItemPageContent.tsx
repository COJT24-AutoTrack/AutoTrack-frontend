"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Car,
	Maintenance,
	maintenanceTypeMap,
	MaintType,
} from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import CarSelect from "@/components/base/CarSelect";
import { ClientAPI } from "@/api/clientImplement";
import { CirclePlus } from "lucide-react";

const Container = styled.div`
	padding: 20px;
`;

const TopBar = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #2b2b2b;
`;

const Title = styled.h2`
	flex-grow: 1;
	text-align: center;
	margin: 0;
	color: white;
`;

const MaintenanceCard = styled.div`
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 12px;
	background-color: #1c1c1c;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DateText = styled.p`
	font-size: 14px;
	margin: 0;
`;

const DetailText = styled.p`
	font-size: 16px;
	margin: 0;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const DetailButton = styled.button`
	background-color: #444;
	color: #fff;
	border: none;
	padding: 8px;
	cursor: pointer;
	border-radius: 4px;
	margin-left: 16px;
`;

const SVGButton = styled.button`
	position: absolute;
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
interface MaintenanceItemPageContentProps {
	maintType: MaintType;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	userCars: Car[];
}

const MaintenanceItemPageContent: React.FC<MaintenanceItemPageContentProps> = ({
	maintType,
	userCars,
	tokens,
}) => {
	const router = useRouter();
	const maintTypeJP = maintenanceTypeMap[maintType] || "取得失敗";
	const searchParams = useSearchParams();
	const initialSelectedCarIndex = () => {
		const param = searchParams.get("selectedCarIndex");
		if (param) {
			const index = parseInt(param, 10);
			if (!isNaN(index) && index >= 0 && userCars && index < userCars.length) {
				return index;
			}
		}
		return 0; // デフォルト値
	};

	const [selectedCarIndex, setSelectedCarIndex] = useState(
		initialSelectedCarIndex,
	);
	const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

	const handleBackClick = () => {
		router.back();
	};

	const handleAddClick = () => {
		window.location.href = `/maintenance/add?maintType=${maintType}&selectedCarIndex=${selectedCarIndex}`;
	};

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	const filterMaintenancesByType = (
		maintenances: Maintenance[],
		targetType: MaintType,
	): Maintenance[] => {
		return maintenances.filter(
			(maintenance) => maintenance.maint_type === targetType,
		);
	};

	useEffect(() => {
		const fetchMaintenance = async () => {
			if (userCars && userCars.length !== 0) {
				const clientAPI = ClientAPI(tokens.token);
				const fetchedMaintenances: Maintenance[] =
					await clientAPI.car.getCarMaintenance({
						car_id: userCars[selectedCarIndex].car_id,
					});
				const filteredMaintenances = filterMaintenancesByType(
					fetchedMaintenances,
					maintType,
				);
				setMaintenances(filteredMaintenances);
			}
		};
		fetchMaintenance();
	}, [selectedCarIndex, userCars, tokens.token, maintType]);

	return (
		<>
			<TopBar>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</TopBar>
			<Container>
				<Title>{maintTypeJP}記録一覧</Title>
				{maintenances.map((maintenance) => (
					<MaintenanceCard key={maintenance.maint_id}>
						<div>
							{maintenance.maint_type == "Other" && (
								<DetailText>タイトル: {maintenance.maint_title}</DetailText>
							)}
							<DateText>
								日付: {new Date(maintenance.maint_date).toLocaleDateString()}
							</DateText>
							<DetailText>内容: {maintenance.maint_description}</DetailText>
						</div>
						<DetailButton
							onClick={() => {
								router.push(`/maintenance/detail/${maintenance.maint_id}`);
							}}
						>
							詳細
						</DetailButton>
					</MaintenanceCard>
				))}
				{userCars.length !== 0 && (
					<SVGButton onClick={handleAddClick}>
						<CirclePlus color="red" />
					</SVGButton>
				)}
			</Container>
		</>
	);
};

export default MaintenanceItemPageContent;
