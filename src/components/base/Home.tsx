import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import TabBar from './TabBar';
import { useSPQuery } from '@/hooks/useBreakpoints';
import dynamic from 'next/dynamic';

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const MainContent = styled.main`
	flex: 1;
	overflow-y: auto;
`;

const Home = ({ children }: { children: React.ReactNode }) => {
	const isSP = useSPQuery();

	return (
		<PageContainer>
			<Header />
			<MainContent>{children}</MainContent>
			{isSP && <TabBar />}
		</PageContainer>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
