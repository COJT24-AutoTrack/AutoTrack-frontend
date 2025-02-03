"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import {
	Car,
	CarInspection,
	carInspectionRecord,
	KCarInspection,
	StandardCarInspection,
} from "@/api/models/models";
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
import QrScannerComponent from "../maintenance/QrScannerComponent";
import { getDisplayValue } from "@/lib/parseCarInspection";

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

const TabContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
	padding: 10px 20px;
	background-color: ${(props) => (props.active ? "#f12424" : "#444")};
	color: #ffffff;
	border: none;
	cursor: pointer;
	font-size: 16px;
	border-radius: 5px;
	margin: 0 5px;

	&:hover {
		background-color: ${(props) => (props.active ? "#d61f1f" : "#666")};
	}
`;

const InspectionContainer = styled.div`
	background-color: #2b2b2b;
	border-radius: 8px;
	overflow-y: scroll;
	max-height: 50dvh;
`;

const InspectionTitle = styled.h3`
	font-size: 20px;
`;

const InspectionTable = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const InspectionTableRow = styled.tr`
	border-bottom: 1px solid #444;
`;

const InspectionTableHeader = styled.th`
	text-align: left;
	padding: 8px;
	background-color: #333;
	color: #f12424;
	font-weight: bold;
`;

const InspectionTableCell = styled.td`
	padding: 8px;
	color: #fff;
`;

const InspectionButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 30px;
`;

const SubmitButton = styled.button`
	padding: 12px 20px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
	background-color: #f12424;
	color: #ffffff;
	border: none;
	display: flex;
	align-items: center;
	gap: 5px;

	&:hover {
		background-color: #d61f1f;
	}
`;

export function toStandardCarOrKei(ci: CarInspection) {
	const {
		car_id,
		chassis_number_stamp_location,
		model_specification_number_category_classification_number,
		expiration_date,
		first_registration_year_month,
		model,
		axle_weight_ff,
		axle_weight_rr,
		noise_regulation,
		proximity_exhaust_noise_limit,
		fuel_type_code,
		car_registration_number,
		plate_count_size_preferred_number_identifier,
		chassis_number,
		engine_model,
		document_type,
		// --- Standard専用フィールド ---
		version_info_2,
		axle_weight_fr,
		axle_weight_rf,
		drive_system,
		opacimeter_measured_car,
		nox_pm_measurement_mode,
		nox_value,
		pm_value,
		safety_standard_application_date,
		version_info_3,
		// --- KCar専用フィールド ---
		system_id_2,
		version_number_2,
		k_axle_weight_fr,
		k_axle_weight_rf,
		k_drive_system,
		k_opacimeter_measured_car,
		k_nox_pm_measurement_mode,
		k_nox_value,
		k_pm_value,
		preliminary_item,
		system_id_3,
		version_number_3,
	} = ci;

	if (ci.is_kcar !== 1) {
		const standardCar: StandardCarInspection = {
			car_id,
			is_kcar: 0, // 普通車なので固定
			chassis_number_stamp_location,
			model_specification_number_category_classification_number,
			expiration_date,
			first_registration_year_month,
			model,
			axle_weight_ff,
			axle_weight_rr,
			noise_regulation,
			proximity_exhaust_noise_limit,
			fuel_type_code,
			car_registration_number,
			plate_count_size_preferred_number_identifier,
			chassis_number,
			engine_model,
			document_type,
			version_info_2,
			axle_weight_fr,
			axle_weight_rf,
			drive_system,
			opacimeter_measured_car,
			nox_pm_measurement_mode,
			nox_value,
			pm_value,
			safety_standard_application_date,
			version_info_3,
		};
		return standardCar;
	} else {
		const kCar: KCarInspection = {
			car_id,
			is_kcar: 1, // 軽自動車なので固定
			chassis_number_stamp_location,
			model_specification_number_category_classification_number,
			expiration_date,
			first_registration_year_month,
			model,
			axle_weight_ff,
			axle_weight_rr,
			noise_regulation,
			proximity_exhaust_noise_limit,
			fuel_type_code,
			car_registration_number,
			plate_count_size_preferred_number_identifier,
			chassis_number,
			engine_model,
			document_type,
			system_id_2,
			version_number_2,
			k_axle_weight_fr,
			k_axle_weight_rf,
			k_drive_system,
			k_opacimeter_measured_car,
			k_nox_pm_measurement_mode,
			k_nox_value,
			k_pm_value,
			preliminary_item,
			system_id_3,
			version_number_3,
		};
		return kCar;
	}
}

interface CarComponentProps {
	carId: string;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarComponent: React.FC<CarComponentProps> = ({ carId, tokens }) => {
	const [userCar, setUserCar] = useState<Car | null>(null);
	const [tab, setTab] = useState<number>(0);
	const [carInspection, setCarInspection] = useState<CarInspection | null>(
		null,
	);
	const [isScanning, setIsScanning] = useState(false);

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

	useEffect(() => {
		const fetchCarInspection = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const car = await clientAPI.carInspection.getCarInspection({
					car_id: carId,
				});

				setCarInspection(car);
			} catch (error) {
				console.error("Error fetching car inspection:", error);
			}
		};
		fetchCarInspection();
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
				{/* タブ UI */}
				<TabContainer>
					<TabButton active={tab === 0} onClick={() => setTab(0)}>
						基本情報
					</TabButton>
					<TabButton active={tab === 1} onClick={() => setTab(1)}>
						車検証
					</TabButton>
				</TabContainer>

				{tab === 0 ? (
					<CarInfoContainer>
						<CarImage
							src={
								userCar?.car_image_url ||
								`https://r2.autotrack.work/images/No_Image9e6034d5.webp`
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
				) : (
					<CarInfoContainer>
						{isScanning ? (
							<QrScannerComponent
								tokens={tokens}
								carId={carId}
								isExist={!!carInspection}
							/>
						) : carInspection ? (
							<div>
								<InspectionContainer>
									<InspectionTable>
										<tbody>
											{Object.entries(toStandardCarOrKei(carInspection)).map(
												([key, val], index) => (
													<InspectionTableRow key={key}>
														<InspectionTableHeader>
															{carInspectionRecord[
																key as keyof typeof carInspectionRecord
															] || key}
														</InspectionTableHeader>
														<InspectionTableCell>
															{String(val)}
														</InspectionTableCell>
													</InspectionTableRow>
												),
											)}
										</tbody>
									</InspectionTable>
								</InspectionContainer>
								<InspectionButtonContainer>
									<SubmitButton onClick={() => setIsScanning(true)}>
										車検証を更新
									</SubmitButton>
								</InspectionButtonContainer>
							</div>
						) : (
							<InspectionButtonContainer>
								<SubmitButton onClick={() => setIsScanning(true)}>
									車検証を登録
								</SubmitButton>
							</InspectionButtonContainer>
						)}
					</CarInfoContainer>
				)}
			</PageContainer>
		</div>
	);
};

export default CarComponent;
