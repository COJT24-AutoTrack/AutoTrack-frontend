"use client";

import { Car } from "@/api/models/models";
import { useState, useEffect } from "react";
import CarSelect from "@/components/base/CarSelect";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import TuningInfoCardGroup from "@/components/tuning/TuningInfoCardGroup";
import type { Tuning } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";
import { CirclePlus } from "lucide-react";

const Container = styled.div`
	position: relative;
`;

const SVGButton = styled.button`
	position: absolute;
	right: 14px;
	bottom: 100px;
	width: 80px;
	height: 80px;
	background-color: transparent;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		width: 100px;
		height: 100px;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 1.2em;
	color: #666;
`;

interface TuningPageComponentProps {
	userCars: Car[] | null;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const TuningPageComponent: React.FC<TuningPageComponentProps> = ({
	userCars,
	tokens,
}) => {
	const [selectedCarIndex, setSelectedCarIndex] = useState(0);
	const [tunings, setTunings] = useState<Tuning[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const switchCar = () => {
		if (userCars) {
			setSelectedCarIndex((prevIndex) => (prevIndex + 1) % userCars.length);
		}
	};

	const handleAddClick = () => {
		if (userCars) {
			window.location.href = `/tuning/add?selectedCarIndex=${selectedCarIndex}`;
		}
	};

	useEffect(() => {
		const fetchTunings = async () => {
			if (userCars && userCars.length !== 0) {
				setIsLoading(true);
				try {
					const clientAPI = ClientAPI(tokens.token);
					const response = await clientAPI.car.getCarTuning({
						car_id: userCars[selectedCarIndex].car_id,
					});
					setTunings(response);
				} catch (error) {
					console.error("Failed to fetch tunings:", error);
					// エラー処理をここに追加することもできます
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchTunings();
	}, [selectedCarIndex, userCars, tokens.token]);

	if (!userCars) {
		return <div>ユーザーの車が見つかりません</div>;
	}

	return (
		<>
			<Container>
				<CarSelect
					userCars={userCars}
					selectedCarIndex={selectedCarIndex}
					switchCar={switchCar}
				/>
				{isLoading ? (
					<LoadingContainer>データを読み込み中...</LoadingContainer>
				) : (
					tunings && (
						<TuningInfoCardGroup
							tunings={tunings.filter(
								(tuning) => tuning.car_id === userCars[selectedCarIndex].car_id,
							)}
						/>
					)
				)}
			</Container>
			{userCars.length !== 0 && (
				<SVGButton onClick={handleAddClick}>
					<CirclePlus color="red" />
				</SVGButton>
			)}
		</>
	);
};

export default TuningPageComponent;
