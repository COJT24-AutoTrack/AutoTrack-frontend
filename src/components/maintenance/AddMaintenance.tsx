"use client";

import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { Car, maintenanceTypeMap, MaintType } from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import CarSelect from "@/components/base/CarSelect";
import {
	BigLabel,
	FormContainer,
	FormElementContainer,
	Select,
	Input,
	ButtonsContainer,
	Button,
	Form,
} from "@/components/form/FormElements";

interface AddMaintenancePageContentProps {
	userCars: Car[] | null;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	maintTypes: MaintType[];
}

const AddMaintenancePageContent: React.FC<AddMaintenancePageContentProps> = ({
	userCars,
	tokens,
	maintTypes,
}) => {
	const [maintType, setMaintType] = useState<MaintType>(maintTypes[0]);
	const [maintTitle, setMaintTitle] = useState("");
	const [maintDate, setMaintDate] = useState("");
	const [maintDescription, setMaintDescription] = useState("");
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [isUserCar, setIsUserCar] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const searchParams = useSearchParams();

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
		const maintTypeParam = searchParams.get("maintType");
		if (maintTypeParam) {
			const decodedMaintType = decodeURIComponent(maintTypeParam);
			if (maintTypes.includes(decodedMaintType as MaintType)) {
				setMaintType(decodedMaintType as MaintType);
			}
		}
		const selectedCarIndexParam = searchParams.get("selectedCarIndex");

		if (selectedCarIndexParam) {
			setSelectedCarIndex(parseInt(selectedCarIndexParam));
		}
	}, [searchParams, maintTypes]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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

		const formattedDate = new Date(maintDate).toISOString();

		const clientAPI = ClientAPI(tokens.token);

		try {
			const response = await clientAPI.maintenance.createMaintenance({
				car_id: userCars[selectedCarIndex].car_id,
				maint_type: maintType,
				maint_date: formattedDate,
				maint_description: maintDescription,
				maint_title: maintTitle,
			});

			if (response) {
				window.location.href = `/maintenance`;
			} else {
				alert("メンテナンス記録の追加に失敗しました");
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
		<div>
			<div>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</div>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<BigLabel>メンテナンス記録を追加</BigLabel>
					<FormElementContainer>
						<BigLabel>メンテナンスタイプ</BigLabel>
						<Select
							value={maintType}
							onChange={(e) => setMaintType(e.target.value as MaintType)}
						>
							{maintTypes.map((type) => (
								<option key={type} value={type}>
									{maintenanceTypeMap[type] || type}
								</option>
							))}
						</Select>
					</FormElementContainer>
					{maintType == "Other" && (
						<FormElementContainer>
							<BigLabel>タイトル:</BigLabel>
							<Input
								type="text"
								value={maintTitle}
								onChange={(e) => setMaintTitle(e.target.value)}
							/>
						</FormElementContainer>
					)}
					<FormElementContainer>
						<BigLabel>メンテナンス日:</BigLabel>
						<Input
							type="date"
							value={maintDate}
							onChange={(e) => setMaintDate(e.target.value)}
							required
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>メンテナンス詳細:</BigLabel>
						<Input
							type="text"
							value={maintDescription}
							onChange={(e) => setMaintDescription(e.target.value)}
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<Button type="submit">追加</Button>
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</div>
	);
};

export default AddMaintenancePageContent;
