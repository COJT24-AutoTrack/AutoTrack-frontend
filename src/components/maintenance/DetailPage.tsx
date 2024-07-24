'use client';

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const DetailPageContainer = styled.div`
	padding: 20px;
	background-color: ${theme.colors.background};
`;

const Title = styled.h1`
	color: ${theme.colors.background};
`;

const MaintenanceDetailPage: React.FC = () => {
	return (
		<DetailPageContainer>
			<Title>メンテナンス詳細ページ</Title>
			<p>ここにメンテナンスの詳細情報を表示します。</p>
		</DetailPageContainer>
	);
};

export default MaintenanceDetailPage;
