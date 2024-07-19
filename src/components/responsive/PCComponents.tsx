import React from 'react';
import Header from '../base/Header';
import styled from 'styled-components';

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

const PCComponent = ({ children }: { children: React.ReactNode } ) => (
    <PageContainer>
        <Header />
        <MainContent>{children}</MainContent>
    </PageContainer>
);

export default PCComponent;
