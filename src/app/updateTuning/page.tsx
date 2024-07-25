"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientAPI } from "@/api/clientImplement";
import { Tuning } from "@/api/models/models";
import BackHeader from "@/components/base/BackHeader";
import BorderButton from "@/components/buttons/BorderButton";
import MainButton from "@/components/buttons/MainButton";
import {
	BigLabel,
	ButtonsContainer,
	Form,
	FormContainer,
	FormElementContainer,
} from "@/components/form/FormElements";
import { Anton } from "next/font/google";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface UpdateTuningProps {
	tunings: Tuning[];
}

const UpdateTuning: React.FC<UpdateTuningProps> = ({ tunings }) => {
	const [tuning, setTuning] = useState<Tuning | null>(null);
	const [date, setDate] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const tuId = searchParams.get("id");

	useEffect(() => {
		if (tunings) {
			const tuning = tunings.find((tu) => tu.tuning_id === Number(tuId));
			if (tuning) {
				setTuning(tuning);
				setDate(tuning.tuning_date);
				setTitle(tuning.tuning_name);
				setDescription(tuning.tuning_description);
			}
		}
	}, [tuId, tunings]);

	const handleUpdate = async () => {
		if (tuning) {
			const clientAPI = createClientAPI();
			await clientAPI.tuning.updateTuning({
				id: tuning.tuning_id,
				car_id: tuning.car_id,
				tuning_date: date,
				tuning_name: title,
				tuning_description: description,
			});
			router.push("/tuning");
		}
	};

	const handleDelete = async () => {
		if (tuning) {
			const clientAPI = createClientAPI();
			await clientAPI.tuning.deleteTuning({
				id: tuning.tuning_id,
			});
			router.push("/tuning");
		}
	};

	return (
		<>
			<BackHeader route="/tuning" />
			<FormContainer>
				<Form>
					<BigLabel>チューニング記録編集</BigLabel>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>タイトル</BigLabel>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>内容</BigLabel>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<MainButton label="更新" onClick={handleUpdate} />
						<BorderButton label="削除" onClick={handleDelete} />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default UpdateTuning;
