import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import TabBar from './TabBar';
import { useSPQuery } from '@/hooks/useBreakpoints';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const MainContent = styled.main`
	flex: 1;
	padding: 10px;
	overflow-y: auto;
`;

const Home = ({ children }: { children: React.ReactNode } ) => (
    <PageContainer>
        <Header />
        <MainContent>{children}</MainContent>
		{useSPQuery() && <TabBar />}
    </PageContainer>
);

export default Home;
