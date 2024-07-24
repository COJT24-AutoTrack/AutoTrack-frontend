'use client';

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import MaintenanceDetail from './DetailCard';

const DetailPageContainer = styled.div`
	background-color: ${theme.colors.background};
`;

const Title = styled.h1`
	color: ${theme.colors.background};
`;

const MaintenanceDetailPage: React.FC = () => {
	return (
		<DetailPageContainer>
			<MaintenanceDetail
				title="Engine Oil"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the oil."
			/>
			<MaintenanceDetail
				title="Oil Element"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the element."
			/>
			<MaintenanceDetail
				title="Engine Oil"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the oil."
			/>
			<MaintenanceDetail
				title="Oil Element"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the element."
			/>
			<MaintenanceDetail
				title="Engine Oil"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the oil."
			/>
			<MaintenanceDetail
				title="Oil Element"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the element."
			/>
			<MaintenanceDetail
				title="Engine Oil"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the oil."
			/>
			<MaintenanceDetail
				title="Oil Element"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the element."
			/>
			<MaintenanceDetail
				title="Engine Oil"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the oil."
			/>
			<MaintenanceDetail
				title="Oil Element"
				lastMaintenanceDate="2021/12/01"
				detail="I changed the element."
			/>
		</DetailPageContainer>
	);
};

export default MaintenanceDetailPage;
