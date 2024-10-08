// src/api/models.ts

export interface User {
	user_id: string;
	user_email: string;
	user_name: string;
	user_password: string;
	firebase_user_id: string;
	created_at?: string;
	updated_at?: string;
}

export interface Car {
	car_id: number;
	car_name: string;
	carmodelnum: string;
	car_color: string;
	car_mileage: number;
	car_isflooding: boolean;
	car_issmoked: boolean;
	car_image_url: string;
	created_at?: string;
	updated_at?: string;
}

export interface Tuning {
	tuning_id: number;
	car_id: number;
	tuning_name: string;
	tuning_date: string;
	tuning_description: string;
	created_at?: string;
	updated_at?: string;
}

export enum MaintType {
	OilChange = "Oil Change",
	OilFilterChange = "Oil Filter Change",
	HeadlightChange = "Headlight Change",
	PositionLightChange = "Position Light Change",
	FogLightChange = "Fog Light Change",
	TurnSignalChange = "Turn Signal Change",
	BrakeLightChange = "Brake Light Change",
	LicensePlateLightChange = "License Plate Light Change",
	BackupLightChange = "Backup Light Change",
	CarWash = "Car Wash",
	WiperBladeChange = "Wiper Blade Change",
	BrakePadChange = "Brake Pad Change",
	BrakeDiscChange = "Brake Disc Change",
	TireChange = "Tire Change",
	BatteryChange = "Battery Change",
	TimingBeltChange = "Timing Belt Change",
	CoolantRefill = "Coolant Refill",
	WasherFluidRefill = "Washer Fluid Refill",
	Other = "Other",
}

export const maintenanceTypeMap: Record<string, string> = {
	"Oil Change": "オイル交換",
	"Oil Filter Change": "オイルフィルター交換",
	"Headlight Change": "ヘッドライト交換",
	"Position Light Change": "ポジションライト交換",
	"Fog Light Change": "フォグライト交換",
	"Turn Signal Change": "ウインカー交換",
	"Brake Light Change": "ブレーキライト交換",
	"License Plate Light Change": "ナンバー灯交換",
	"Backup Light Change": "バックライト交換",
	"Car Wash": "洗車",
	"Wiper Blade Change": "ワイパーブレード交換",
	"Brake Pad Change": "ブレーキパッド交換",
	"Brake Disc Change": "ブレーキディスク交換",
	"Tire Change": "タイヤ交換",
	"Battery Change": "バッテリー交換",
	"Timing Belt Change": "タイミングベルト交換",
	"Coolant Refill": "クーラント補充",
	"Washer Fluid Refill": "ウォッシャー液補充",
	Other: "その他",
};

export interface Maintenance {
	maint_id: number;
	car_id: number;
	maint_type: MaintType;
	maint_title: string;
	maint_date: string;
	maint_description: string;
	created_at?: string;
	updated_at?: string;
}

export interface FuelEfficiency {
	fe_id: number;
	car_id: number;
	fe_date: string;
	fe_amount: number;
	fe_unitprice: number;
	fe_mileage: number;
	created_at?: string;
	updated_at?: string;
}

export interface Accident {
	accident_id: number;
	car_id: number;
	accident_date: string;
	accident_description: string;
	created_at?: string;
	updated_at?: string;
}

export interface PeriodicInspection {
	pi_id: number;
	car_id: number;
	pi_name: string;
	pi_date: string;
	pi_nextdate: string;
	created_at?: string;
	updated_at?: string;
}

// 以下はクライアント側でよしなに定義しているもの

export interface carInfo extends Car {
	fuel_efficiency: FuelEfficiency[];
	odd_after_wash: number;
	odd_after_exchange: number;
	monthly_fuel_efficiency: string;
	total_gas_cost: number;
	total_mileage: number;
}

export interface FuelEfficiencyCalculationResult {
	car_id: number;
	total_fuel_efficiency: number;
	fuel_efficiencies: {
		fe_id: number;
		fuel_efficiency: number;
	}[];
}
