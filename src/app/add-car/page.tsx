"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { carInfo } from "@/api/models/models";
import { useRouter } from "next/navigation";
import BackIcon from "../../public/icons/BackIcon.svg";
import { ContentText } from "@/components/text/TextComponents";
import { createClientAPI } from "@/api/clientImplement";
import { Form, Input, Label } from "@/components/form/FormElements";
import { Anton } from "next/font/google";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Container = styled.div`
	padding: 20px;
`;

const TopBar = styled.div`
	width: 100vw;
	height: 50px;
	padding-left: 10px;
	display: flex;
	align-items: center;
	background-color: #2b2b2b;
`;

const BackButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		transform: rotate(180deg);
		fill: white;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
`;

const Button = styled.button`
	padding: 10px;
	font-size: 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	width: 80%;
	margin-top: 10px;
`;

const CheckBoxInput = styled.input`
	margin-right: 10px;
`;

const CheckboxLabel = styled.label`
	display: flex;
`;

const AddCarPage: React.FC = () => {
	const router = useRouter();
	const [carData, setCarData] = useState<Partial<carInfo>>({
		car_name: "",
		carmodelnum: "",
		car_color: "",
		car_mileage: 0,
		car_isflooding: false,
		car_issmoked: false,
	});
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setCarData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSaveCar = async () => {
		const clientAPI = createClientAPI();

		const user_id = 1; // 実際のユーザーIDに置き換える
		try {
			const newCar = await clientAPI.user.registerCar({
				user_id: user_id.toString(),
				car: carData as carInfo,
			});

			if (newCar) {
				router.push("/"); // 保存後にホームページに戻る
			}
		} catch (error) {
			console.error("Failed to save car", error);
		}
	};

	return (
		<>
			<TopBar>
				<BackButton onClick={() => router.push("/")}>
					<BackIcon style={{ fill: "white" }} />
					<ContentText>戻る</ContentText>
				</BackButton>
			</TopBar>
			<Container>
				<Form>
					<ContentText className={Anton400.className}>Add New Car</ContentText>
					<Input
						type="text"
						name="car_name"
						placeholder="Car Name"
						value={carData.car_name}
						onChange={handleChange}
					/>
					<Input
						type="text"
						name="carmodelnum"
						placeholder="Car Model Number"
						value={carData.carmodelnum}
						onChange={handleChange}
					/>
					<Input
						type="text"
						name="car_color"
						placeholder="Car Color"
						value={carData.car_color}
						onChange={handleChange}
					/>
					<Input
						type="number"
						name="car_mileage"
						placeholder="Car Mileage"
						value={carData.car_mileage}
						onChange={handleChange}
					/>
					<CheckboxLabel>
						<CheckBoxInput
							type="checkbox"
							name="car_isflooding"
							checked={carData.car_isflooding}
							onChange={handleChange}
						/>
						<Label>Flooding</Label>
					</CheckboxLabel>
					<CheckboxLabel>
						<CheckBoxInput
							type="checkbox"
							name="car_issmoked"
							checked={carData.car_issmoked}
							onChange={handleChange}
						/>
						<Label>Smoked</Label>
					</CheckboxLabel>
					<Input type="file" accept="image/*" onChange={handleImageChange} />
					{preview && (
						<img
							src={preview}
							alt="Car Preview"
							style={{ width: "80%", marginBottom: "10px" }}
						/>
					)}
					<Button onClick={handleSaveCar}>Save Car</Button>
				</Form>
			</Container>
		</>
	);
};

export default AddCarPage;