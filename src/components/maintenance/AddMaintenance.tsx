"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Maintenance, MaintType } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";

interface AddMaintenancePageContentProps {
	carId: number;
	token: string;
	maintTypes: MaintType[];
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

const Button = styled.button`
	padding: 12px;
	font-size: 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const AddMaintenancePageContent: React.FC<AddMaintenancePageContentProps> = ({
	carId,
	token,
	maintTypes,
}) => {
	const [maintType, setMaintType] = useState<MaintType>(maintTypes[0]);
	const [maintDate, setMaintDate] = useState("");
	const [maintDescription, setMaintDescription] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formattedDate = new Date(maintDate).toISOString();

		const clientAPI = ClientAPI(token);

		try {
			const response = await clientAPI.maintenance.createMaintenance({
				car_id: carId,
				maint_type: maintType,
				maint_date: formattedDate,
				maint_description: maintDescription,
				maint_title: maintType,
			});

			if (response) {
				router.push(`/maintenance/${carId}/${maintType}`);
			}
		} catch (error) {
			console.error("Error creating maintenance record:", error);
		}
	};

	return (
		<Container>
			<h2>メンテナンス記録を追加</h2>
			<Form onSubmit={handleSubmit}>
				<Label>
					メンテナンスタイプ:
					<Select
						value={maintType}
						onChange={(e) => setMaintType(e.target.value as MaintType)}
					>
						{maintTypes.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</Select>
				</Label>
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
						required
					/>
				</Label>
				<Button type="submit">追加</Button>
			</Form>
		</Container>
	);
};

export default AddMaintenancePageContent;
