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
import { CirclePlus } from "lucide-react";

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
`;

const ContentContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	position: relative;
	padding-bottom: 100px;
`;

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	${media.SPandTB} {
		padding: 0;
		width: 100%;
	}
	${media.PC} {
		padding: 20px 0;
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
		window.location.href = `/maintenance/add?selectedCarIndex=${selectedCarIndex}`;
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

	const handleDetailClick = async (carId: string, maintType: MaintType) => {
		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}
		window.location.href = `/maintenance/${maintType}?selectedCarIndex=${selectedCarIndex}`;
	};

	if (!userCars) {
		return <PageContainer>ユーザーの車が見つかりません</PageContainer>;
	}

	return (
		<PageContainer>
			<CarSelect
				userCars={userCars}
				selectedCarIndex={selectedCarIndex}
				switchCar={switchCar}
			/>
			<ContentContainer>
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
								onDetailClick={() => {
									if (userCars.length === 0) {
										alert("ユーザーの車が見つかりません");
									} else {
										handleDetailClick(
											userCars[selectedCarIndex].car_id,
											maintType,
										);
									}
								}}
							/>
						);
					})}
				</DetailContainer>
				{userCars.length !== 0 && (
					<AddButton onClick={handleAddClick}>
						<CirclePlus color="white" />
					</AddButton>
				)}
			</ContentContainer>
		</PageContainer>
	);
};

export default MaintenanceComponent;
