import React from "react";
import Header from "@/components/base/Header";
import styled from "styled-components";
import TabBar from "@/components/base/TabBar";
import { useSPQuery } from "@/hooks/useBreakpoints";
import dynamic from "next/dynamic";
import { media } from "@/styles/breakpoints";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const MainContent = styled.main`
	flex: 1;
	overflow-y: auto;
	${media.SP} {
		padding-top: 60px;
	}
	${media.PC} {
		padding-top: 80px;
	}
`;

const HeaderWrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 100;
`;

const TabBarWrapper = styled.div`
	bottom: 0;
	position: fixed;
	width: 100vw;
`;

const Home = ({ children }: { children: React.ReactNode }) => {
	const isSP = useSPQuery();

	return (
		<PageContainer>
			<HeaderWrapper>
				<Header />
			</HeaderWrapper>
			<MainContent>{children}</MainContent>
			{isSP && (
				<TabBarWrapper>
					<TabBar />
				</TabBarWrapper>
			)}
		</PageContainer>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
