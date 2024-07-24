'use client';

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const DetailPageContainer = styled.div`
	background-color: ${theme.colors.background};
`;

const Title = styled.h1`
	color: ${theme.colors.background};
`;

const MaintenanceDetailPage: React.FC = () => {
	return (
		<DetailPageContainer>
			<div>Maintenance Detail Page</div>
		</DetailPageContainer>
	);
};

export default MaintenanceDetailPage;
