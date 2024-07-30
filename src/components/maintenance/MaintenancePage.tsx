"use client";

import React from "react";
import styled from "styled-components";
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
					car_id: parseInt(car_id, 10)
				});
				setMaintenanceDetails(response);
			} catch (error) {
				console.error('Failed to fetch maintenance details:', error);
			}
		};

		fetchMaintenanceDetails();
	}, [selectedCarIndex, userCars, userId]);

	const handleAddClick = () => {
		router.push("/addMaintenance");
	};

	return (
		<DetailContainer>
			<MaintenanceDetail
				title="エンジンオイル"
				lastMaintenanceDate="2021/12/01"
				detail="オイル交換を行いました。"
			/>
			<MaintenanceDetail
				title="オイルエレメント"
				lastMaintenanceDate="2021/12/01"
				detail="エレメント交換を行いました。"
			/>
			<MaintenanceDetail title="灯火類" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail title="洗車" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail
				title="ワイパーブレード"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="ブレーキパッド"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="ブレーキディスク"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail title="タイヤ" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail title="バッテリー" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail
				title="タイミングベルト"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail title="クーラント" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail
				title="ウォッシャー液"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail title="デフオイル" lastMaintenanceDate="" detail="" />
			<MaintenanceDetail
				title="パワステオイル"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="エアコンフィルター"
				lastMaintenanceDate=""
				detail=""
			/>
		</DetailContainer>
	);
};

export default MaintenancePage;
