"use client";

import React from 'react';
import styled from 'styled-components';
import MaintenanceDetail from './MentenanceCard';
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
				detailUrl="/maintenance/oil"
			/>
			<MaintenanceDetail
				title="オイルエレメント"
				lastMaintenanceDate="2021/12/01"
				detail="エレメント交換を行いました。"
				detailUrl="/maintenance/oilelement"
			/>
			<MaintenanceDetail
				title="灯火類"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/lights"
			/>
			<MaintenanceDetail
				title="洗車"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/carwash"
			/>
			<MaintenanceDetail
				title="ワイパーブレード"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/wiper"
			/>
			<MaintenanceDetail
				title="ブレーキパッド"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/brakepad"
			/>
			<MaintenanceDetail
				title="ブレーキディスク"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/brakedisk"
			/>
			<MaintenanceDetail
				title="タイヤ"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/tire"
			/>
			<MaintenanceDetail
				title="バッテリー"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/battery"
			/>
			<MaintenanceDetail
				title="タイミングベルト"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/timingbelt"
			/>
			<MaintenanceDetail
				title="クーラント"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/coolant"
			/>
			<MaintenanceDetail
				title="ウォッシャー液"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/washer"
			/>
			<MaintenanceDetail
				title="デフオイル"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/differentialoil"
			/>
			<MaintenanceDetail
				title="パワステオイル"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/powersteeringoil"
			/>
			<MaintenanceDetail
				title="エアコンフィルター"
				lastMaintenanceDate=""
				detail=""
				detailUrl="/maintenance/filter"
			/>
		</DetailContainer>
	)
};

export default MaintenancePage;
