"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import { Car } from "@/api/models/models";
import { checkIsUserCars } from "@/module/checkUserCars";
import CarSelect from "@/components/base/CarSelect";
import { Calendar, Wrench, FileText } from "lucide-react";

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

const FormTitle = styled.h1`
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

interface AddTuningProps {
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	userCars: Car[] | null;
}

const AddTuningPageContent: React.FC<AddTuningProps> = ({
	tokens,
	userCars,
}) => {
	const [tuningName, setTuningName] = useState("");
	const [tuningDate, setTuningDate] = useState("");
	const [tuningDescription, setTuningDescription] = useState("");
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [isUserCar, setIsUserCar] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const checkUserCar = async () => {
			if (!userCars || userCars.length === 0) {
				setIsUserCar(false);
				setIsLoading(false);
				return;
			}

			try {
				const result = await checkIsUserCars({
					carId: userCars[selectedCarIndex].car_id,
					tokens,
				});
				setIsUserCar(result);
			} catch (error) {
				console.error("Error checking user car:", error);
				setIsUserCar(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkUserCar();
	}, [userCars, selectedCarIndex, tokens]);

	useEffect(() => {
		const selectedCarIndexParam = searchParams.get("selectedCarIndex");
		if (selectedCarIndexParam) {
			setSelectedCarIndex(parseInt(selectedCarIndexParam));
		}
	}, [searchParams]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!userCars || userCars.length === 0) {
			alert("車両が登録されていません");
			window.location.href = "/";
			return;
		}

		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}

		const formattedDate = new Date(tuningDate).toISOString();
		const clientAPI = ClientAPI(tokens.token);

		try {
			const response = await clientAPI.tuning.createTuning({
				car_id: userCars[selectedCarIndex].car_id,
				tuning_date: formattedDate,
				tuning_name: tuningName,
				tuning_description: tuningDescription,
			});
			if (response) {
				window.location.href = "/tuning";
			} else {
				alert("チューニング記録の追加に失敗しました");
			}
		} catch (error) {
			console.error("Error creating maintenance record:", error);
			alert("エラーが発生しました。もう一度お試しください");
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isUserCar) {
		alert("この車両は登録されていません");
	}

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	return (
		<PageContainer>
			<CarSelect
				userCars={userCars}
				selectedCarIndex={selectedCarIndex}
				switchCar={switchCar}
			/>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<FormTitle className={Anton400.className}>
						チューニング記録追加
					</FormTitle>
					<FormElementContainer>
						<Label>
							<Wrench color="white" />
							<span>タイトル</span>
						</Label>
						<Input
							type="text"
							value={tuningName}
							onChange={(e) => setTuningName(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Calendar color="white" />
							<span>日付</span>
						</Label>
						<Input
							type="date"
							value={tuningDate}
							onChange={(e) => setTuningDate(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<FileText color="white" />
							<span>内容</span>
						</Label>
						<Input
							type="text"
							value={tuningDescription}
							onChange={(e) => setTuningDescription(e.target.value)}
						/>
					</FormElementContainer>
					<Button type="submit">追加</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default AddTuningPageContent;