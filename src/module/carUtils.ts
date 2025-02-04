import { Car, FuelEfficiency, Maintenance, carInfo } from "@/api/models/models";

export const calculateMonthlyValues = (
	fuelEfficiencies: FuelEfficiency[],
	car: Car
): {
	monthlyAverageFuelEfficiency: number;
	monthlyGasCost: number;
	monthlyMileage: number;
	totalGasCost: number;
	totalMileage: number;
} => {
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

	let monthlyRecords = fuelEfficiencies
		.filter((fe) => {
			const feDate = new Date(fe.fe_date);
			return feDate >= startOfMonth && feDate < endOfMonth;
		})
		.sort((a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime());

	const lastRecordOfPreviousMonth = fuelEfficiencies
		.filter((fe) => new Date(fe.fe_date) < startOfMonth)
		.sort((a, b) => new Date(b.fe_date).getTime() - new Date(a.fe_date).getTime())[0];

	const monthlyMileage = (() => {
		if (monthlyRecords.length === 0) {
			return car.car_mileage ?? 0;
		} else if (monthlyRecords.length <= 1) {
			return monthlyRecords[0].fe_mileage - (lastRecordOfPreviousMonth?.fe_mileage ?? 0);
		} else {
			return (
				monthlyRecords[monthlyRecords.length - 1].fe_mileage -
				(lastRecordOfPreviousMonth?.fe_mileage ?? 0)
			);
		}
	})();

	const monthlyFuelAmount = monthlyRecords.reduce((acc, fe) => acc + fe.fe_amount, 0);
	const monthlyGasCost = monthlyRecords.reduce(
		(total, fe) => total + Math.round(fe.fe_amount * fe.fe_unitprice),
		0
	);

	const monthlyAverageFuelEfficiency =
		monthlyFuelAmount > 0 ? monthlyMileage / monthlyFuelAmount : 0;

	const totalGasCost = fuelEfficiencies.reduce(
		(total, fe) => total + Math.round(fe.fe_amount * fe.fe_unitprice),
		0
	);

	const totalMileage = fuelEfficiencies.reduce(
		(maxMileage, fe) => Math.max(maxMileage, fe.fe_mileage),
		0
	);

	return {
		monthlyAverageFuelEfficiency,
		monthlyGasCost,
		monthlyMileage,
		totalGasCost,
		totalMileage,
	};
};

export const calculateOddAfterMaintenance = (
	maintenanceType: string,
	maintenances: Maintenance[],
	fuelEfficiencies: FuelEfficiency[]
): number => {
	const lastMaintenanceDate = maintenances
		.filter((m) => m.maint_type === maintenanceType)
		.sort((a, b) => new Date(b.maint_date).getTime() - new Date(a.maint_date).getTime())[0]
		?.maint_date;

	if (!lastMaintenanceDate) return 0;

	return fuelEfficiencies
		.filter((fe) => new Date(fe.fe_date) >= new Date(lastMaintenanceDate))
		.reduce((acc, fe) => acc + fe.fe_mileage, 0);
};

// CarからcarInfoへの変換関数
export const convertCarToCarInfo = (
	car: Car,
	fuelEfficiencies: FuelEfficiency[],
	maintenances: Maintenance[]
): carInfo => {
	const {
		monthlyAverageFuelEfficiency,
		monthlyGasCost,
		monthlyMileage,
		totalGasCost,
		totalMileage,
	} = calculateMonthlyValues(fuelEfficiencies, car);

	return {
		...car,
		fuel_efficiency: fuelEfficiencies,
		odd_after_wash: calculateOddAfterMaintenance("Car Wash", maintenances, fuelEfficiencies),
		odd_after_exchange: calculateOddAfterMaintenance("Oil Change", maintenances, fuelEfficiencies),
		monthly_fuel_efficiency: monthlyAverageFuelEfficiency.toFixed(2),
		monthly_gas_cost: monthlyGasCost,
		monthly_mileage: monthlyMileage,
		total_gas_cost: totalGasCost,
		total_mileage: totalMileage,
	};
};
