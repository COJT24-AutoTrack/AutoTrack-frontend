"use client";

import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { Car, maintenanceTypeMap, MaintType } from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import CarSelect from "@/components/base/CarSelect";

interface AddMaintenancePageContentProps {
	userCars: Car[] | null;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
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

const Fixed = styled.div``;

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
	}, [searchParams, maintTypes]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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
				router.push(`/maintenance`);
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
			<Fixed>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
			</Fixed>
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
									{maintenanceTypeMap[type] || type}
								</option>
							))}
						</Select>
					</Label>
					{maintType == "Other" && (
						<Label>
							タイトル:
							<Input
								type="text"
								value={maintTitle}
								onChange={(e) => setMaintTitle(e.target.value)}
							/>
						</Label>
					)}
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
		</div>
	);
};

export default AddMaintenancePageContent;
