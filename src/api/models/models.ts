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
	car_id: string;
	car_name: string;
	carmodelnum: string;
	car_color: string;
	car_mileage: number;
	car_isflooding: 0 | 1;
	car_issmoked: 0 | 1;
	car_image_url: string;
	created_at?: string;
	updated_at?: string;
}

export interface Tuning {
	tuning_id: string;
	car_id: string;
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
	maint_id: string;
	car_id: string;
	maint_type: MaintType;
	maint_title: string;
	maint_date: string;
	maint_description: string;
	created_at?: string;
	updated_at?: string;
}

export interface FuelEfficiency {
	fe_id: string;
	car_id: string;
	fe_date: string;
	fe_amount: number;
	fe_unitprice: number;
	fe_mileage: number; // 給油時のODOの表示値を保存
	created_at?: string;
	updated_at?: string;
}

export interface Accident {
	accident_id: string;
	car_id: string;
	accident_date: string;
	accident_description: string;
	created_at?: string;
	updated_at?: string;
}

export interface PeriodicInspection {
	pi_id: string;
	car_id: string;
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
	car_id: string;
	total_fuel_efficiency: number;
	fuel_efficiencies: {
		fe_id: string;
		fuel_efficiency: number;
	}[];
}

interface BaseCarInspection {
	car_id: string;
	is_kcar: 0 | 1;

	registration_version_info?: string; // 登録情報のバージョン情報
	chassis_number_stamp_location?: string; // 車台番号打刻位置
	model_specification_number_category_classification_number?: string; // 型式指定番号・類別区分番号
	expiration_date?: string; // 有効期間の満了日
	first_registration_year_month?: string; // 初度登録年月
	model?: string; // 型式
	axle_weight_ff?: number; // 軸重(前前)
	axle_weight_fr?: number; // 軸重(前後)
	axle_weight_rf?: number; // 軸重(後前)
	axle_weight_rr?: number; // 軸重(後後)
	noise_regulation?: string; // 騒音規制
	proximity_exhaust_noise_limit?: number; // 接近排気騒音規制
	drive_system?: string; // 駆動方式
	opacimeter_measured_car?: 0 | 1; // オパシメータ測定車
	nox_pm_measurement_mode?: string; // NOx・PM測定モード
	nox_value?: number; // NOx
	pm_value?: number; // PM
	fuel_type_code?: string; // 燃料種類コード
	version_info_2?: string; // バージョン情報2
	car_registration_number?: string; // 自動車登録番号および車両番号
	plate_count_size_preferred_number_identifier?: string; // 標板の枚数・大きさ・希望番号の識別
	chassis_number?: string; // 車台番号
	engine_model?: string; // 原動機型式
	document_type?: string; // 帳票種別
}
export interface CarInspection extends BaseCarInspection {
	version_info_1?: string; // バージョン情報1
	version_info_2?: string; // バージョン情報2
	safety_standard_application_date?: string; // 保安基準適用年月日
	system_id_1?: string; // システムID1
	system_id_2?: string; // システムID2
	preliminary_item?: string; // 予備項目
}

export interface StandardCarInspection extends BaseCarInspection {
	safety_standard_application_date?: string;
	version_info_1?: string; // バージョン情報1
}

export interface KCarInspection extends BaseCarInspection {
	system_id_1?: string;
	system_id_2?: string;
	version_number?: string;
	preliminary_item?: string;
}
