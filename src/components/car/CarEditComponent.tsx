"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Car } from "@/api/models/models";
import { media } from "@/styles/breakpoints";
import { ClientAPI } from "@/api/clientImplement";
import { Form, Input, Label } from "@/components/form/FormElements";
import Image from "next/image";
import theme from "@/styles/theme";
import router from "next/router";

const EditContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 5vh 0;
`;

const EditPanel = styled.div`
	width: 80dvw;
	max-width: 800px;
	padding: 20px;
	background-color: ${theme.colors.cardBackground};
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	color: ${theme.colors.textPrimary};
	font-family: ${theme.fontFamily.primary};
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
	margin-right: 0.5rem;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	font-size: ${theme.fontSizes.subContent};
	background-color: ${theme.colors.buttonBackground};
	color: ${theme.colors.textPrimary};
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${theme.colors.buttonHoverBackground};
	}
`;

interface CarEditComponentProps {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarEditComponent: React.FC<CarEditComponentProps> = ({
	carId,
	tokens,
}) => {
	const [car, setCar] = useState<Car | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const response = await clientAPI.car.getCar({
					car_id: carId,
				});
				setCar(response);
			} catch (error) {
				console.error("Failed to update car:", error);
				alert("Failed to update car. Please try again.");
			}
		};
		fetchCar();
	}, [carId, tokens]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!car) return;
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
		const response = await clientAPI.car.updateCar({
			car_id: car.car_id,
			car_name: car.car_name,
			carmodelnum: car.carmodelnum,
			car_color: car.car_color,
			car_mileage: car.car_mileage,
			car_isflooding: car.car_isflooding,
			car_issmoked: car.car_issmoked,
			car_image_url: car.car_image_url,
		});
		if (response) {
			alert("Car updated successfully!");
			window.location.href = "/";
		}
	};
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
			if (car) {
				setCar({
					...car,
					car_image_url: `https://r2.autotrack.work/images/${file.name}`,
				});
			}
		}
	};

	if (!car) return <div>Loading...</div>;

	return (
		<EditContainer>
			<EditPanel>
				<h1>Edit Car</h1>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="car_name">Car Name</Label>
						<Input
							id="car_name"
							value={car.car_name}
							onChange={(e) => setCar({ ...car, car_name: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="carmodelnum">Model Number</Label>
						<Input
							id="carmodelnum"
							value={car.carmodelnum}
							onChange={(e) => setCar({ ...car, carmodelnum: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="car_color">Color</Label>
						<Input
							id="car_color"
							value={car.car_color}
							onChange={(e) => setCar({ ...car, car_color: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="car_mileage">Mileage (km)</Label>
						<Input
							id="car_mileage"
							type="number"
							value={car.car_mileage}
							onChange={(e) =>
								setCar({ ...car, car_mileage: Number(e.target.value) })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<Checkbox
								checked={car.car_isflooding}
								onChange={(e) =>
									setCar({ ...car, car_isflooding: e.target.checked })
								}
							/>
							Flooded
						</Label>
					</FormGroup>
					<FormGroup>
						<Label>
							<Checkbox
								checked={car.car_issmoked}
								onChange={(e) =>
									setCar({ ...car, car_issmoked: e.target.checked })
								}
							/>
							Smoked in
						</Label>
					</FormGroup>
					<Input type="file" accept="image/*" onChange={handleImageChange} />
					<Button type="submit">Update Car</Button>
				</Form>
			</EditPanel>
		</EditContainer>
	);
};

export default CarEditComponent;
