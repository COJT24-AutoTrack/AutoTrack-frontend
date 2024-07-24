import React from "react";
import Header from "../base/Header";
import TabBar from "../base/TabBar";
import styled from "styled-components";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const MainContent = styled.main`
	flex: 1;
	overflow-y: auto;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<PageContainer>
			<Header />
			<MainContent>{children}</MainContent>
			<TabBar />
		</PageContainer>
	);
};

export default Layout;
