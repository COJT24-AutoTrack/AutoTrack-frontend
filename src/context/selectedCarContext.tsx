import React, { createContext, useContext, useState, ReactNode } from "react";
import { Car, carInfo } from "@/api/models/models";

// デフォルト値を設定
const SelectedCarContext = createContext<SelectedCarContextType | undefined>(
	undefined,
);

interface SelectedCarContextType {
	selectedCar: carInfo | null;
	userCars: Car[];
	setSelectedCar: React.Dispatch<React.SetStateAction<carInfo | null>>;
	setUserCars: React.Dispatch<React.SetStateAction<Car[]>>; // 追加
}

export const SelectedCarProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);
	const [userCars, setUserCars] = useState<Car[]>([]);

	return (
		<SelectedCarContext.Provider
			value={{ selectedCar, userCars, setSelectedCar, setUserCars }}
		>
			{children}
		</SelectedCarContext.Provider>
	);
};

// Contextを使用するカスタムフック
export const useSelectedCarContext = (): SelectedCarContextType => {
	const context = useContext(SelectedCarContext);
	if (!context) {
		throw new Error(
			"useSelectedCarContext must be used within a SelectedCarProvider",
		); // 修正
	}
	return context;
};
