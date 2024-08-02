"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Maintenance } from "@/api/models/models";

interface MaintenanceItemComponentProps {
	maintenances: Maintenance[];
	carId: number;
	maintType: string;
}

const Container = styled.div`
	padding: 20px;
`;

const MaintenanceCard = styled.div`
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 12px;
	background-color: #f9f9f9;
`;

const MaintenanceItemComponent: React.FC<MaintenanceItemComponentProps> = ({
	maintenances,
	carId,
	maintType,
}) => {
	const router = useRouter();

	const handleDetailClick = (maintId: number) => {
		router.push(`/maintenance/${carId}/${maintType}/update?maintId=${maintId}`);
	};

	return (
		<Container>
			{maintenances.map((maintenance) => (
				<MaintenanceCard key={maintenance.maint_id}>
					<h3>{maintenance.maint_title}</h3>
					<p>日付: {new Date(maintenance.maint_date).toLocaleDateString()}</p>
					<p>詳細: {maintenance.maint_description}</p>
					<button onClick={() => handleDetailClick(maintenance.maint_id)}>
						詳細
					</button>
				</MaintenanceCard>
			))}
		</Container>
	);
};

export default MaintenanceItemComponent;
