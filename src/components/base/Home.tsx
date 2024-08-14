import React from "react";
import Header from "@/components/base/Header";
import styled from "styled-components";
import TabBar from "@/components/base/TabBar";
import { useSPandTBQuery } from "@/hooks/useBreakpoints";
import dynamic from "next/dynamic";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100dvh;
	justify-content: space-between;
`;

const MainContent = styled.main`
	flex: 1;
	overflow-y: auto;
`;

const HeaderWrapper = styled.div`
	width: 100dvw;
	z-index: 100;
`;

const TabBarWrapper = styled.div`
	width: 100dvw;
`;

const Home = ({ children }: { children: React.ReactNode }) => {
	const isSPandTB = useSPandTBQuery();

	return (
		<PageContainer>
			<HeaderWrapper>
				<Header />
			</HeaderWrapper>
			<MainContent>{children}</MainContent>
			{isSPandTB && (
				<TabBarWrapper>
					<TabBar />
				</TabBarWrapper>
			)}
		</PageContainer>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
