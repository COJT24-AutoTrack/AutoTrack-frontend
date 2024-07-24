"use client";

import React from 'react';
import styled from 'styled-components';
import MaintenanceDetail from './MaintenanceDetail';
import { media } from '@/styles/breakpoints';

const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	${media.SP} {
		padding: 0px;
		width: 100dvw
	}
	${media.PC} {
		padding: 20px;
	}
	mergin: 0;
`;

const MaintenancePage = () => {
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
			<MaintenanceDetail
				title="灯火類"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="洗車"
				lastMaintenanceDate=""
				detail=""
			/>
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
			<MaintenanceDetail
				title="タイヤ"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="バッテリー"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="タイミングベルト"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="クーラント"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="ウォッシャー液"
				lastMaintenanceDate=""
				detail=""
			/>
			<MaintenanceDetail
				title="デフオイル"
				lastMaintenanceDate=""
				detail=""
			/>
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
	)
};

export default MaintenancePage;
