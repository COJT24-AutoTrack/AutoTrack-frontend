import React, { createContext, useContext, useState, ReactNode } from "react";
import { Car, carInfo } from "@/api/models/models";

// Contextの型定義
interface SelectedCarContextType {
	selectedCar: carInfo | null;
	userCars: Car[];
	setSelectedCar: React.Dispatch<React.SetStateAction<carInfo | null>>;
}

// デフォルト値を設定
const SelectedCarContext = createContext<SelectedCarContextType | undefined>(undefined);

// Providerコンポーネントの定義
export const SelectedCarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);
	const [userCars, setUserCars] = useState<Car[]>([]);

	return (
		<SelectedCarContext.Provider value={{ selectedCar, userCars, setSelectedCar }}>
			{children}
		</SelectedCarContext.Provider>
	);
};

// Contextを使用するカスタムフック
export const useSelectedCarContext = (): SelectedCarContextType => {
	const context = useContext(SelectedCarContext);
	if (!context) {
		throw new Error("useSelectedCarContext must be used within a CarProvider");
	}
	return context;
};
