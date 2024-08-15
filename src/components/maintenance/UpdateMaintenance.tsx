"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Maintenance, MaintType } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import BorderButton from "@/components/buttons/BorderButton";

interface UpdateMaintenancePageContentProps {
	token: string;
	maintenance: Maintenance | null;
}

const Container = styled.div`
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Label = styled.label`
	font-size: 16px;
`;

const Input = styled.input`
	padding: 8px;
	font-size: 16px;
`;

const Select = styled.select`
	padding: 8px;
	font-size: 16px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;

const UpdateMaintenancePageContent: React.FC<
	UpdateMaintenancePageContentProps
> = ({ token, maintenance }) => {
	const [carId, setCarId] = useState(maintenance?.car_id);
	const [maintType, setMaintType] = useState<MaintType>(
		maintenance?.maint_type || ("Oil Change" as MaintType),
	);
	const [maintTitle, setMaintTitle] = useState(maintenance?.maint_title || "");
	const [maintDate, setMaintDate] = useState(maintenance?.maint_date || "");
	const [maintDescription, setMaintDescription] = useState(
		maintenance?.maint_description || "",
	);

	const router = useRouter();

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		const formattedDate = new Date(maintDate).toISOString();

		const clientAPI = ClientAPI(token);
		if (maintenance) {
			try {
				await clientAPI.maintenance.updateMaintenance(maintenance.maint_id, {
					car_id: maintenance.car_id,
					maint_type: maintType,
					maint_date: formattedDate,
					maint_description: maintDescription,
					maint_title: maintTitle,
				});

				window.location.href = `/maintenance/${maintType}`;
			} catch (error) {
				console.error("Error updating maintenance record:", error);
			}
		}
	};

	const handleDelete = async () => {
		if (maintenance) {
			const clientAPI = ClientAPI(token);
			try {
				await clientAPI.maintenance.deleteMaintenance({
					maint_id: maintenance.maint_id,
				});
				window.location.href = `/maintenance/${maintType}`;
			} catch (error) {
				console.error("Error deleting maintenance record:", error);
			}
		}
	};

	return (
		<Container>
			<h2>メンテナンス記録を更新</h2>
			<Form onSubmit={handleUpdate}>
				{maintType == "Other" && (
					<Label>
						タイトル:
						<Input
							type="text"
							value={maintTitle}
							onChange={(e) => setMaintTitle(e.target.value)}
						/>
					</Label>
				)}
				<Label>
					メンテナンス日:
					<Input
						type="date"
						value={maintDate}
						onChange={(e) => setMaintDate(e.target.value)}
						required
					/>
				</Label>
				<Label>
					メンテナンス詳細:
					<Input
						type="text"
						value={maintDescription}
						onChange={(e) => setMaintDescription(e.target.value)}
					/>
				</Label>
				<ButtonsContainer>
					<BorderButton label="更新" onClick={(e) => handleUpdate(e)} />
					<BorderButton label="削除" onClick={handleDelete} />
				</ButtonsContainer>
			</Form>
		</Container>
	);
};

export default UpdateMaintenancePageContent;
