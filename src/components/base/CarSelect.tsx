import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styled from "styled-components";
import { ContentText } from "../text/TextComponents";
import { useSelectedCarContext } from "@/context/selectedCarContext";
import { convertCarToCarInfo } from "@/module/carUtils";
import { ClientAPI } from "@/api/clientImplement";
import { useEffect, useState } from "react";
import { FuelEfficiency, Maintenance } from "@/api/models/models";

const Container = styled.div`
	display: flex;
	height: 60px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: #2b2b2b;
	padding: 0 20px;
`;

const ChangeIconContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ChangeCarButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		margin: 0 8px;
	}
`;

const CarSelect: React.FC<{ token: string; userId: string }> = ({ token }) => {
	const { userCars, selectedCar, setSelectedCar } = useSelectedCarContext();

	// ローカルステートの初期化と変更時のログ出力
	const [fuelEfficiencies, setFuelEfficiencies] = useState<FuelEfficiency[]>(
		[],
	);
	const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

	useEffect(() => {
		console.log("CarSelect: fuelEfficiencies changed:", fuelEfficiencies);
	}, [fuelEfficiencies]);

	useEffect(() => {
		console.log("CarSelect: maintenances changed:", maintenances);
	}, [maintenances]);

	// userCars が空の場合のログ
	if (!userCars || userCars.length === 0) {
		console.log("CarSelect: userCars is empty:", userCars);
		return <Container>車が見つかりません</Container>;
	}

	// 現在の車のインデックスを取得
	const selectedCarIndex = userCars.findIndex(
		(car) => car.car_id === selectedCar?.car_id,
	);
	console.log("CarSelect: selectedCarIndex =", selectedCarIndex);

	// userCars の変更時のログ（コンポーネントが再レンダリングされるタイミングで確認）
	useEffect(() => {
		console.log("CarSelect: userCars changed:", userCars);
	}, [userCars]);

	// selectedCar の変更時のログ
	useEffect(() => {
		console.log("CarSelect: selectedCar changed:", selectedCar);
	}, [selectedCar]);

	// 選択中の車の燃費・メンテナンスデータを取得する
	useEffect(() => {
		const fetchData = async () => {
			const clientAPI = ClientAPI(token);
			try {
				const fuelData = await clientAPI.car.getCarFuelEfficiency({
					car_id: userCars[selectedCarIndex]?.car_id,
				});
				const maintenanceData = await clientAPI.car.getCarMaintenance({
					car_id: userCars[selectedCarIndex]?.car_id,
				});
				console.log(
					"CarSelect: fetchData - fuelData fetched for car_id",
					userCars[selectedCarIndex]?.car_id,
					":",
					fuelData,
				);
				console.log(
					"CarSelect: fetchData - maintenanceData fetched for car_id",
					userCars[selectedCarIndex]?.car_id,
					":",
					maintenanceData,
				);
				setFuelEfficiencies(fuelData);
				setMaintenances(maintenanceData);
			} catch (error) {
				console.error("CarSelect: データの取得に失敗しました:", error);
			}
		};

		if (userCars[selectedCarIndex]) {
			console.log(
				"CarSelect: fetchData called for car at index",
				selectedCarIndex,
				"userCars[selectedCarIndex] =",
				userCars[selectedCarIndex],
			);
			fetchData();
		}
	}, [selectedCarIndex, userCars, token]);

	// 前の車に切り替える関数
	const switchToPreviousCar = () => {
		const newIndex = (selectedCarIndex - 1 + userCars.length) % userCars.length;
		console.log("CarSelect: switchToPreviousCar - newIndex =", newIndex);
		const carInfoData = convertCarToCarInfo(
			userCars[newIndex],
			fuelEfficiencies,
			maintenances,
		);
		console.log("CarSelect: switchToPreviousCar - carInfoData =", carInfoData);
		setSelectedCar(carInfoData);
		console.log(
			"CarSelect: switchToPreviousCar - selectedCar set to =",
			carInfoData,
		);
	};

	// 次の車に切り替える関数
	const switchToNextCar = () => {
		const newIndex = (selectedCarIndex + 1) % userCars.length;
		console.log("CarSelect: switchToNextCar - newIndex =", newIndex);
		const carInfoData = convertCarToCarInfo(
			userCars[newIndex],
			fuelEfficiencies,
			maintenances,
		);
		console.log("CarSelect: switchToNextCar - carInfoData =", carInfoData);
		setSelectedCar(carInfoData);
		console.log(
			"CarSelect: switchToNextCar - selectedCar set to =",
			carInfoData,
		);
	};

	return (
		<Container>
			<ChangeIconContainer>
				<ChangeCarButton onClick={switchToPreviousCar}>
					<ChevronLeftIcon />
				</ChangeCarButton>
			</ChangeIconContainer>

			<ContentText>
				{selectedCar?.car_name || "車が選択されていません"}
			</ContentText>

			<ChangeIconContainer>
				<ChangeCarButton onClick={switchToNextCar}>
					<ChevronRightIcon />
				</ChangeCarButton>
			</ChangeIconContainer>
		</Container>
	);
};

export default CarSelect;
