"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackHeader from "@/components/base/BackHeader";
import {
	BigLabel,
	Button,
	ButtonsContainer,
	Form,
	FormContainer,
	FormElementContainer,
	Input,
} from "@/components/form/FormElements";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";
import styled from "styled-components";
import CarSelect from "@/components/base/CarSelect";
import { Car } from "@/api/models/models";
import { checkIsUserCars } from "@/module/checkUserCars";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

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
			router.push("/");
			return;
		}

		if (!isUserCar) {
			alert("この車両は登録されていません");
			router.push("/");
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
				router.push("/tuning");
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
		<>
			<div>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</div>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<BigLabel>チューニング記録追加</BigLabel>
					<FormElementContainer>
						<BigLabel>タイトル</BigLabel>
						<Input
							type="text"
							value={tuningName}
							onChange={(e) => setTuningName(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<Input
							type="date"
							value={tuningDate}
							onChange={(e) => setTuningDate(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>内容</BigLabel>
						<Input
							type="text"
							value={tuningDescription}
							onChange={(e) => setTuningDescription(e.target.value)}
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<Button type="submit">追加</Button>
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default AddTuningPageContent;
