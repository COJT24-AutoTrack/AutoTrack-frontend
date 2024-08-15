"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { Maintenance, MaintType } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { Calendar, FileText, Wrench, Save, Trash2 } from "lucide-react";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
`;

const FormContainer = styled.div`
	max-width: 500px;
	margin: 0 auto;
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const FormTitle = styled.h2`
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
`;

const FormElementContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Label = styled.label`
	font-size: 16px;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
`;

const Input = styled.input`
	background-color: #2b2b2b;
	border: 1px solid #ffffff;
	border-radius: 4px;
	color: #ffffff;
	padding: 10px;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: #4a90e2;
	}
`;

const Button = styled.button`
	width: 101px;
	background-color: #f12424;
	color: #ffffff;
	border: none;
	border-radius: 4px;
	padding: 12px 20px;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d61f1f;
	}
`;

const DeleteButton = styled(Button)`
	background-color: transparent;
	border: 1px solid #f12424;
	color: #f12424;

	&:hover {
		background-color: rgba(241, 36, 36, 0.1);
	}
`;

const DeleteButtonInner = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;
interface UpdateMaintenancePageContentProps {
	token: string;
	maintenance: Maintenance | null;
}

const UpdateMaintenancePageContent: React.FC<
	UpdateMaintenancePageContentProps
> = ({ token, maintenance }) => {
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
		<PageContainer>
			<FormContainer>
				<FormTitle className={Anton400.className}>
					メンテナンス記録を更新
				</FormTitle>
				<Form onSubmit={handleUpdate}>
					{maintType === "Other" && (
						<FormElementContainer>
							<Label>
								<Wrench color="white" size={16} />
								タイトル:
							</Label>
							<Input
								type="text"
								value={maintTitle}
								onChange={(e) => setMaintTitle(e.target.value)}
							/>
						</FormElementContainer>
					)}
					<FormElementContainer>
						<Label>
							<Calendar color="white" size={16} />
							メンテナンス日:
						</Label>
						<Input
							type="date"
							value={maintDate}
							onChange={(e) => setMaintDate(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<FileText color="white" size={16} />
							メンテナンス詳細:
						</Label>
						<Input
							type="text"
							value={maintDescription}
							onChange={(e) => setMaintDescription(e.target.value)}
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<DeleteButton type="button" onClick={handleDelete}>
							<DeleteButtonInner>
								<Trash2 size={18} />
								<p>削除</p>
							</DeleteButtonInner>
						</DeleteButton>
						<Button type="submit">更新</Button>
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default UpdateMaintenancePageContent;
