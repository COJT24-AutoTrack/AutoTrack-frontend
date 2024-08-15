"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { Tuning } from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import BackHeader from "@/components/base/BackHeader";
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

const FormTitle = styled.p`
	font-size: 24px;
	text-align: center;
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

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

interface UpdateTuningProps {
	tunings: Tuning[];
	token: string;
}

const UpdateTuning: React.FC<UpdateTuningProps> = ({ tunings, token }) => {
	const [tuning, setTuning] = useState<Tuning | null>(null);
	const [date, setDate] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const tuId = searchParams.get("id");

	useEffect(() => {
		if (tunings) {
			const tu = tunings.find((tu) => tu.tuning_id === Number(tuId));
			if (tu) {
				setTuning(tu);
				setDate(tu.tuning_date);
				setTitle(tu.tuning_name);
				setDescription(tu.tuning_description);
			}
		}
	}, [tuId, tunings]);

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (tuning) {
			const clientAPI = ClientAPI(token);
			try {
				await clientAPI.tuning.updateTuning({
					tuning_id: tuning.tuning_id,
					car_id: tuning.car_id,
					tuning_date: date,
					tuning_name: title,
					tuning_description: description,
				});
				window.location.href = "/tuning";
			} catch (error) {
				console.error("Error updating tuning record:", error);
			}
		}
	};

	const handleDelete = async () => {
		if (tuning) {
			const clientAPI = ClientAPI(token);
			try {
				await clientAPI.tuning.deleteTuning({
					tuning_id: tuning.tuning_id,
				});
				window.location.href = "/tuning";
			} catch (error) {
				console.error("Error deleting tuning record:", error);
			}
		}
	};

	return (
		<PageContainer>
			<BackHeader route="/tuning" />
			<FormContainer>
				<Form onSubmit={handleUpdate}>
					<FormTitle className={Anton400.className}>
						チューニング記録を更新
					</FormTitle>
					<FormElementContainer>
						<Label>
							<Calendar color="white" size={16} />
							日付
						</Label>
						<Input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Wrench color="white" size={16} />
							タイトル
						</Label>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<FileText color="white" size={16} />
							説明
						</Label>
						<Input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<DeleteButton type="button" onClick={handleDelete}>
							<Trash2 size={18} />
							削除
						</DeleteButton>
						<Button type="submit">更新</Button>
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default UpdateTuning;
