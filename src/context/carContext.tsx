import React, { createContext, useContext, useState, ReactNode } from "react";
import { carInfo } from "@/api/models/models";

// Contextの型定義
interface CarContextType {
	selectedCar: carInfo | null;
	setSelectedCar: React.Dispatch<React.SetStateAction<carInfo | null>>;
}

// デフォルト値を設定
const CarContext = createContext<CarContextType | undefined>(undefined);

// Providerコンポーネントの定義
export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);

	return (
		<CarContext.Provider value={{ selectedCar, setSelectedCar }}>
			{children}
		</CarContext.Provider>
	);
};

// Contextを使用するカスタムフック
export const useCarContext = (): CarContextType => {
	const context = useContext(CarContext);
	if (!context) {
		throw new Error("useCarContext must be used within a CarProvider");
	}
	return context;
};
