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
	PositionLampChange = "Position Lamp Change",
	FogLampChange = "Fog Lamp Change",
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
	"Position Lamp Change": "ポジションランプ交換",
	"Fog Lamp Change": "フォグランプ交換",
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
	fe_mileage: number; // 給油時のODOの表示値を保存
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
	monthly_gas_cost: number;
	monthly_mileage: number;
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

interface BaseCarInspection {
	car_id: number;
	is_kcar: 0 | 1;
	version_info_1?: string;
	registration_version_info?: string; // 登録情報のバージョン情報
	chassis_number_stamp_location?: string;
	model_specification_number_category_classification_number?: string;
	expiration_date?: string; // YYYY-MM-DD
	first_registration_year_month?: string; // YYYY-MM
	model?: string;
	axle_weight_ff?: number; // 軸重(前前)
	axle_weight_fr?: number; // 軸重(前後)
	axle_weight_rf?: number; // 軸重(後前)
	axle_weight_rr?: number; // 軸重(後後)
	noise_regulation?: string;
	proximity_exhaust_noise_limit?: number; // dB
	drive_system?: string;
	opacimeter_measured_car?: boolean;
	nox_pm_measurement_mode?: string;
	nox_value?: number; // g/km
	pm_value?: number; // g/km
	fuel_type_code?: string;
	version_info_2?: string;
	car_registration_number?: string;
	plate_count_size_preferred_number_identifier?: string;
	chassis_number?: string;
	engine_model?: string;
	document_type?: string;
}
export interface CarInspection extends BaseCarInspection {
	safety_standard_application_date?: string;
	system_id_1?: string;
	system_id_2?: string;
	version_number?: string;
	preliminary_item?: string;
}

export interface StandardCarInspection extends BaseCarInspection {
	safety_standard_application_date?: string;
}

export interface KCarInspection extends BaseCarInspection {
	system_id_1?: string;
	system_id_2?: string;
	version_number?: string;
	preliminary_item?: string;
}
