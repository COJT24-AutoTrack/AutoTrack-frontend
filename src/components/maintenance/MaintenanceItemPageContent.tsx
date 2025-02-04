"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import {
	Car,
	Maintenance,
	maintenanceTypeMap,
	MaintType,
} from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import CarSelect from "@/components/base/CarSelect";
import { ClientAPI } from "@/api/clientImplement";
import { ChevronRight, CirclePlus, Calendar, FileText } from "lucide-react";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
`;

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #2b2b2b;
`;

const ContentContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	position: relative;
`;

const Title = styled.h2`
	font-size: 24px;
	text-align: center;
	margin: 0 0 20px 0;
	color: #ffffff;
`;

const MaintenanceCard = styled.div`
	background-color: #2b2b2b;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CardContent = styled.div`
	flex: 1;
`;

const DateText = styled.p`
	font-size: 14px;
	color: #999;
	margin: 0 0 8px 0;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const DetailText = styled.p`
	font-size: 16px;
	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const DetailButton = styled.button`
	background: none;
	color: #ffffff;
	border: none;
	padding: 8px 16px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	transition: background-color 0.3s;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const AddButton = styled.button`
	position: fixed;
	right: 20px;
	bottom: 100px;
	width: 60px;
	height: 60px;
	background-color: #f12424;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d61f1f;
	}

	svg {
		width: 30px;
		height: 30px;
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
		<PageContainer>
			<TopBar>
				<CarSelect
					token={tokens.token}
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</TopBar>
			<ContentContainer>
				<Title className={Anton400.className}>{maintTypeJP}記録一覧</Title>
				{maintenances.map((maintenance) => (
					<MaintenanceCard key={maintenance.maint_id}>
						<CardContent>
							{maintenance.maint_type === "Other" && (
								<DetailText>
									<FileText size={16} />
									タイトル: {maintenance.maint_title}
								</DetailText>
							)}
							<DateText>
								<Calendar size={16} />
								日付: {new Date(maintenance.maint_date).toLocaleDateString()}
							</DateText>
							<DetailText>
								<FileText size={16} />
								内容: {maintenance.maint_description}
							</DetailText>
						</CardContent>
						<DetailButton
							onClick={() => {
								window.location.href = `/maintenance/updateMaintenance/${maintenance.maint_id}`;
							}}
						>
							<ChevronRight />
						</DetailButton>
					</MaintenanceCard>
				))}
				{userCars.length !== 0 && (
					<AddButton onClick={handleAddClick}>
						<CirclePlus color="white" />
					</AddButton>
				)}
			</ContentContainer>
		</PageContainer>
	);
};

export default MaintenanceItemPageContent;