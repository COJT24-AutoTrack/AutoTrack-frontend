"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Car } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { ErrorMessage } from "@/components/form/FormElements";
import { Anton } from "next/font/google";
import {
	Car as CarIcon,
	Hash,
	Palette,
	Navigation,
	Droplet,
	Cigarette,
	Image,
	ChevronLeft,
} from "lucide-react";

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

const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const CheckboxInput = styled.input`
	width: 20px;
	height: 20px;
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

const BackHeader = styled.div`
	background-color: #2b2b2b;
	padding: 10px 20px;
	display: flex;
	align-items: center;
`;

const BackButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 16px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

interface AddCarPageComponentProps {
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const AddCar: React.FC<AddCarPageComponentProps> = ({ tokens }) => {
	const [carData, setCarData] = useState<Partial<Car>>({
		car_name: "",
		carmodelnum: "",
		car_color: "",
		car_mileage: 0,
		car_isflooding: false,
		car_issmoked: false,
		car_image_url: "https://r2.autotrack.work/images/No_Image9e6034d5.png",
	});
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setCarData((prevData) => ({
			...prevData,
			[name]:
				type === "checkbox"
					? checked
					: name === "car_mileage"
						? value === ""
							? 0
							: Number(value)
						: value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
			setCarData((prevData) => ({
				...prevData,
				car_image_url: `https://r2.autotrack.work/images/${file.name}`,
			}));
		}
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!carData.car_name) {
			newErrors.car_name = "車名を入力してください";
		}
		if (!carData.carmodelnum) {
			newErrors.carmodelnum = "車種番号を入力してください";
		}
		if (!carData.car_color) {
			newErrors.car_color = "車の色を入力してください";
		}
		if (carData.car_mileage === undefined || carData.car_mileage < 0) {
			newErrors.car_mileage = "有効な走行距離を入力してください";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSaveCar = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		const clientAPI = ClientAPI(tokens.token);
		if (image) {
			const formData = new FormData();
			formData.append("file", image);

			try {
				await clientAPI.image.uploadImage({
					formData: formData,
				});
			} catch (e) {
				alert((e as Error).message);
				return;
			}
		}
		try {
			const newCar = await clientAPI.car.createCar({
				firebase_user_id: tokens.decodedToken.uid,
				car: carData as Car,
			});

			if (newCar) {
				window.location.href = "/";
			}
		} catch (e) {
			alert((e as Error).message);
		}
	};

	return (
		<PageContainer>
			<BackHeader>
				<BackButton onClick={() => (window.location.href = "/")}>
					<ChevronLeft /> 戻る
				</BackButton>
			</BackHeader>
			<FormContainer>
				<Form onSubmit={handleSaveCar}>
					<FormTitle className={Anton400.className}>新しい車を追加</FormTitle>
					<FormElementContainer>
						<Label>
							<CarIcon color="white" />
							<p>車名</p>
						</Label>
						<Input
							type="text"
							name="car_name"
							value={carData.car_name}
							onChange={handleChange}
							placeholder="例: トヨタ カローラ"
						/>
						{errors.car_name && <ErrorMessage>{errors.car_name}</ErrorMessage>}
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Hash color="white" />
							<p>車種番号</p>
						</Label>
						<Input
							type="text"
							name="carmodelnum"
							value={carData.carmodelnum}
							onChange={handleChange}
							placeholder="例: ZRE212"
						/>
						{errors.carmodelnum && (
							<ErrorMessage>{errors.carmodelnum}</ErrorMessage>
						)}
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Palette color="white" />
							<p>車の色</p>
						</Label>
						<Input
							type="text"
							name="car_color"
							value={carData.car_color}
							onChange={handleChange}
							placeholder="例: ホワイトパールクリスタルシャイン"
						/>
						{errors.car_color && (
							<ErrorMessage>{errors.car_color}</ErrorMessage>
						)}
					</FormElementContainer>
					<FormElementContainer>
						<Label>
							<Navigation color="white" />
							<p>総走行距離 (km)</p>
						</Label>
						<Input
							type="number"
							name="car_mileage"
							value={carData.car_mileage === 0 ? "" : carData.car_mileage}
							onChange={handleChange}
							placeholder="例: 50000"
						/>
						{errors.car_mileage && (
							<ErrorMessage>{errors.car_mileage}</ErrorMessage>
						)}
					</FormElementContainer>
					<CheckboxContainer>
						<CheckboxInput
							type="checkbox"
							name="car_isflooding"
							checked={carData.car_isflooding}
							onChange={handleChange}
						/>
						<Label>
							<Droplet color="white" />
							<p>浸水車</p>
						</Label>
					</CheckboxContainer>
					<CheckboxContainer>
						<CheckboxInput
							type="checkbox"
							name="car_issmoked"
							checked={carData.car_issmoked}
							onChange={handleChange}
						/>
						<Label>
							<Cigarette color="white" />
							<p>喫煙車</p>
						</Label>
					</CheckboxContainer>
					<FormElementContainer>
						<Label>
							<Image color="white" />
							<p>車の画像</p>
						</Label>
						<Input type="file" accept="image/*" onChange={handleImageChange} />
						{preview && (
							<img
								src={preview}
								alt="Car Preview"
								style={{
									width: "100%",
									marginTop: "10px",
									borderRadius: "4px",
								}}
							/>
						)}
					</FormElementContainer>
					<Button type="submit">登録</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default AddCar;
