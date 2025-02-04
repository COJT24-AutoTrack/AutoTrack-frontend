"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { Car, maintenanceTypeMap, MaintType } from "@/api/models/models";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { checkIsUserCars } from "@/module/checkUserCars";
import CarSelect from "@/components/base/CarSelect";
import { Settings, Calendar, FileText, Wrench } from "lucide-react";
import QrScannerComponent from "./QrScannerComponent";

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

const Select = styled.select`
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

		const clientAPI = ClientAPI(tokens.token);

		try {
			const response = await clientAPI.maintenance.createMaintenance({
				car_id: userCars[selectedCarIndex].car_id,
				maint_type: maintType,
				maint_date: maintDate,
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

	if (!userCars) {
		return <PageContainer>ユーザーの車が見つかりません</PageContainer>;
	}

	return (
		<PageContainer>
			<CarSelect
				token={tokens.token}
				userCars={userCars}
				selectedCarIndex={selectedCarIndex}
				switchCar={switchCar}
			/>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<FormTitle className={Anton400.className}>
						メンテナンス記録を追加
					</FormTitle>
					<QrScannerComponent
						tokens={tokens}
						carId={userCars[selectedCarIndex].car_id}
					/>
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
							メンテナンス内容:
						</Label>
						<Input
							type="text"
							value={maintDescription}
							onChange={(e) => setMaintDescription(e.target.value)}
						/>
					</FormElementContainer>
					<Button type="submit">追加</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
};

export default AddMaintenancePageContent;
