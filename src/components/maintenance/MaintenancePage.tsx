"use client";

import React from 'react';
import styled from 'styled-components';

const MaintenanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.baseBackground};
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fontFamily.primary};
  font-size: ${(props) => props.theme.fontSizes.mainContent};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: ${(props) => props.theme.fontFamily.secondary};
  font-size: ${(props) => props.theme.fontSizes.subContent};
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`;

const MaintenancePage = () => {
  return (
    <MaintenanceContainer>
      <Title>Maintenance Page</Title>
      <Description>
        This is the maintenance page. Here you can find information about the maintenance schedule, tasks, and other relevant details to keep your vehicle in top condition.
      </Description>
    </MaintenanceContainer>
  );
};

export default MaintenancePage;
