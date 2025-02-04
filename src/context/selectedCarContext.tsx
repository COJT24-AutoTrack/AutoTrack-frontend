import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Car, carInfo, FuelEfficiency, Maintenance } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";
import { convertCarToCarInfo } from "@/module/carUtils";

interface SelectedCarContextType {
	selectedCar: carInfo | null;
	setSelectedCar: React.Dispatch<React.SetStateAction<carInfo | null>>;
	userCars: carInfo[];
	setUserCars: React.Dispatch<React.SetStateAction<carInfo[]>>;
	fetchUserCars: (token: string, userId: string) => Promise<void>;
	initialized: boolean;
}

const SelectedCarContext = createContext<SelectedCarContextType | undefined>(
	undefined,
);

interface ProviderProps {
	children: ReactNode;
	token?: string;
	userId?: string;
}

export const SelectedCarProvider: React.FC<ProviderProps> = ({
	children,
	token,
	userId,
}) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);
	const [userCars, setUserCars] = useState<carInfo[]>([]);
	const [initialized, setInitialized] = useState(false);

	const fetchUserCars = async (token: string, userId: string) => {
		console.log("Fetching user cars with token:", token);
		console.log("Fetching user cars for userId:", userId);

		const clientAPI = ClientAPI(token);

		try {
			const response: Car[] = await clientAPI.user.getUserCars({
				firebase_user_id: userId,
			});
			console.log("Fetched user cars response:", response);

			// 各車両の追加情報を取得して carInfo に変換
			const carInfos = await Promise.all(
				response.map(async (car) => {
					console.log(`Fetching additional data for car_id: ${car.car_id}`);

					const fuelEfficiencies: FuelEfficiency[] =
						await clientAPI.car.getCarFuelEfficiency({
							car_id: car.car_id,
						});
					console.log(
						`Fetched fuel efficiencies for car_id ${car.car_id}:`,
						fuelEfficiencies,
					);

					const maintenances: Maintenance[] =
						await clientAPI.car.getCarMaintenance({
							car_id: car.car_id,
						});
					console.log(
						`Fetched maintenances for car_id ${car.car_id}:`,
						maintenances,
					);

					const carInfoData = convertCarToCarInfo(
						car,
						fuelEfficiencies,
						maintenances,
					);
					console.log(
						`Converted carInfo for car_id ${car.car_id}:`,
						carInfoData,
					);

					return carInfoData;
				}),
			);

			setUserCars(carInfos);
			console.log("Set userCars in context:", carInfos);

			if (carInfos.length > 0) {
				setSelectedCar(carInfos[0]);
				console.log("Initial selectedCar set:", carInfos[0]);
			}
		} catch (error) {
			console.error("Failed to fetch user cars:", error);
		} finally {
			setInitialized(true);
			console.log("Fetch user cars completed. initialized set to true.");
		}
	};

	// token, userId がある場合にのみ fetchUserCars を呼び出す
	useEffect(() => {
		if (token && userId) {
			fetchUserCars(token, userId);
		}
	}, [token, userId]);

	return (
		<SelectedCarContext.Provider
			value={{
				selectedCar,
				setSelectedCar,
				userCars,
				setUserCars,
				fetchUserCars,
				initialized,
			}}
		>
			{children}
		</SelectedCarContext.Provider>
	);
};

export const useSelectedCarContext = (): SelectedCarContextType => {
	const context = useContext(SelectedCarContext);
	if (!context) {
		throw new Error(
			"useSelectedCarContext must be used within a SelectedCarProvider",
		);
	}
	console.log("Accessed SelectedCarContext:", context);
	return context;
};
