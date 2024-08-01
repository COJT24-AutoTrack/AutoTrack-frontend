"use client";

import React from "react";
import styled from "styled-components";
import { Maintenance } from "@/api/models/models";
import BackIcon from "/public/icons/BackIcon.svg";
import { useRouter } from "next/navigation";
import AddIcon from "/public/icons/AddIcon.svg";
import { ContentText } from "@/components/text/TextComponents";

interface MaintenanceItemPageContentProps {
	maintenances: Maintenance[];
	maintType: string;
	carId: number;
	token: string;
}

const Container = styled.div`
	padding: 20px;
`;

const TopBar = styled.div`
	width: 100vw;
	height: 50px;
	padding-left: 10px;
	display: flex;
	align-items: center;
	background-color: #2b2b2b;
`;

const BackButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		transform: rotate(180deg);
		fill: white;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
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

const maintenanceTypeMap: Record<string, string> = {
	"Oil Change": "オイル交換",
	"Oil Filter Change": "オイルフィルター交換",
	"Headlight Change": "ヘッドライト交換",
	"Position Light Change": "ポジションライト交換",
	"Fog Light Change": "フォグライト交換",
	"Turn Signal Change": "ウインカー交換",
	"Brake Light Change": "ブレーキライト交換",
	"License Plate Light Change": "ナンバー灯交換",
	"Backup Light Change": "バックライト交換",
	"Car Wash": "洗車",
	"Wiper Blade Change": "ワイパーブレード交換",
	"Brake Pad Change": "ブレーキパッド交換",
	"Brake Disc Change": "ブレーキディスク交換",
	"Tire Change": "タイヤ交換",
	"Battery Change": "バッテリー交換",
	"Timing Belt Change": "タイミングベルト交換",
	"Coolant Refill": "クーラント補充",
	"Washer Fluid Refill": "ウォッシャー液補充",
};

const MaintenanceItemPageContent: React.FC<MaintenanceItemPageContentProps> = ({
	maintenances,
	maintType,
	carId,
	token,
}) => {
	const router = useRouter();
	const decodedMaintType = decodeURIComponent(maintType);
	const maintTypeJP = maintenanceTypeMap[decodedMaintType] || "取得失敗";

	const handleBackClick = () => {
		router.back();
	};

	const handleAddClick = () => {
		router.push(`/maintenance/${carId}/${maintType}/add`);
	};

	const handleDetailClick = (maintId: number) => {
		router.push(`/maintenance/${carId}/${maintType}/${maintId}/add`);
	};

	return (
		<>
			<TopBar>
				<BackButton onClick={handleBackClick}>
					<BackIcon style={{ fill: "white" }} />
					<ContentText>戻る</ContentText>
				</BackButton>
			</TopBar>
			<Container>
				<Title>{maintTypeJP}記録一覧</Title>
				{maintenances.map((maintenance) => (
					<MaintenanceCard key={maintenance.maint_id}>
						<div>
							<DateText>
								日付: {new Date(maintenance.maint_date).toLocaleDateString()}
							</DateText>
							<DetailText>内容: {maintenance.maint_description}</DetailText>
						</div>
						<DetailButton
							onClick={() => handleDetailClick(maintenance.maint_id)}
						>
							詳細
						</DetailButton>
					</MaintenanceCard>
				))}
				<SVGButton onClick={handleAddClick}>
					<AddIcon style={{ fill: "red" }} />
				</SVGButton>
			</Container>
		</>
	);
};

export default MaintenanceItemPageContent;
