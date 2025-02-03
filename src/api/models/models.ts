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

export interface BaseCarInspection {
	chassis_number_stamp_location: string;
	model_specification_number_category_classification_number?: string; // 10 可変/ 9 固定
	expiration_date: string;
	first_registration_year_month: string; // // first_inspection_year_month
	model: string; // 17 可変/ 20 可変
	axle_weight_ff: string;
	axle_weight_rr: string;
	noise_regulation: string; // 取る値が変わる
	proximity_exhaust_noise_limit: string;
	fuel_type_code: string; // 取る値が変わる
	car_registration_number: string; // // car_number
	plate_count_size_preferred_number_identifier: string; // 取る値の対応表が変わる
	chassis_number: string; // 23 可変/ 20 固定
	engine_model: string;
	document_type: string;
}

export interface Standard {
	version_info_2: string | null;
	axle_weight_fr: string | null;
	axle_weight_rf: string | null;
	drive_system: string | null;
	opacimeter_measured_car: string | null;
	nox_pm_measurement_mode: string | null;
	nox_value: string | null;
	pm_value: string | null;
	safety_standard_application_date: string | null;
	version_info_3: string | null;
}

export interface KCar {
	system_id_2: "K" | null;
	version_number_2: "32" | null;
	k_axle_weight_fr: "-" | null;
	k_axle_weight_rf: "-" | null;
	k_drive_system: "-" | null;
	k_opacimeter_measured_car: "-" | null;
	k_nox_pm_measurement_mode: "-" | null;
	k_nox_value: "-" | null;
	k_pm_value: "-" | null;
	preliminary_item: "999" | null;
	system_id_3: "K" | null;
	version_number_3: "22" | null;
}

export type CarInspection = {
	car_id: string;
	is_kcar: 0 | 1;
} & BaseCarInspection &
	Standard &
	KCar;

type CarInspectionKeys = keyof BaseCarInspection | keyof Standard | keyof KCar;

const carInspectionRecord: Record<CarInspectionKeys, string> = {
	chassis_number_stamp_location: "車台番号打刻位置",
	model_specification_number_category_classification_number: "型式指定番号・類別区分番号",
	expiration_date: "有効期間の満了する日",
	first_registration_year_month: "初度登録年月",
	model: "型式",
	axle_weight_ff: "軸重(前前)",
	axle_weight_rr: "軸重(後後)",
	noise_regulation: "騒音規制",
	proximity_exhaust_noise_limit: "接近排気騒音規制",
	fuel_type_code: "燃料種類コード",
	car_registration_number: "自動車登録番号および車両番号",
	plate_count_size_preferred_number_identifier: "標板の枚数・大きさ・希望番号の識別",
	chassis_number: "車台番号",
	engine_model: "原動機型式",
	document_type: "帳票種別",
	version_info_2: "バージョン情報",
	axle_weight_fr: "軸重(前後)",
	axle_weight_rf: "軸重(後前)",
	drive_system: "駆動方式",
	opacimeter_measured_car: "オパシメータ測定車",
	nox_pm_measurement_mode: "NOx・PM測定モード",
	nox_value: "NOx値",
	pm_value: "PM値",
	safety_standard_application_date: "保安基準適用年月日",
	version_info_3: "バージョン情報",
	system_id_2: "システムID",
	version_number_2: "バージョン番号",
	k_axle_weight_fr: "軸重(前後)",
	k_axle_weight_rf: "軸重(後前)",
	k_drive_system: "駆動方式",
	k_opacimeter_measured_car: "オパシメータ測定車",
	k_nox_pm_measurement_mode: "NOx・PM測定モード",
	k_nox_value: "NOx値",
	k_pm_value: "PM値",
	preliminary_item: "予備項目",
	system_id_3: "システムID",
	version_number_3: "バージョン番号",
}

// export interface StandardCarInspection {
// 	version_info_2: string; // バージョン情報 一桁 固定 0
// 	chassis_number_stamp_location: string; // 車台番号打刻位置 3桁 固定 || "-  " 1
// 	model_specification_number_category_classification_number?: string; // 型式指定番号・類別区分番号 10桁 可変 || 設定なし 2
// 	expiration_date: string; // 有効期間の満了する日 YYMMDD || 999999 3
// 	first_registration_year_month: string; // 初度登録年月 YYMM || 9999 4
// 	model: string; // 型式 17桁 可変 5
// 	axle_weight_ff: string; // 軸重(前前) 4桁 固定 単位は10kg || "-   " 6
// 	axle_weight_fr: string; // 軸重(前後) 同じく 7
// 	axle_weight_rf: string; // 軸重(後前) 同じく 8
// 	axle_weight_rr: string; // 軸重(後後) 同じく 9
// 	noise_regulation: string; // 騒音規制 2桁 固定 (10, 11, 12, 13, 26, 28) || "- " 10
// 	proximity_exhaust_noise_limit: string; // 接近排気騒音規制 3桁 固定 単位はdB || "-  " 11
// 	drive_system: string; // 駆動方式 (1, 2, 0) || "-" 12
// 	opacimeter_measured_car: string; // オパシメータ測定車 (0, 1) 13
// 	nox_pm_measurement_mode: string; // NOx・PM測定モード "A" || "-" 14
// 	nox_value: string; // NOx 4桁 固定 || "-   " 15
// 	pm_value: string; // PM 5桁 固定 || "-    " 16
// 	safety_standard_application_date: string; // 保安基準適用年月日 YYMMDD || 999999 17
// 	fuel_type_code: string; // 燃料種類コード (00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 11, 12, 13, 14, 15, 16, 99) 18
// 	version_info_3: string; // バージョン情報 一桁 固定 19
// 	car_registration_number: string; // 自動車登録番号および車両番号 12桁 固定 20
// 	plate_count_size_preferred_number_identifier: string; // 標板の枚数・大きさ・希望番号の識別 1桁 固定 (A~H, 1~8)|| "-" 21
// 	chassis_number: string; // 車台番号 23桁 可変 22
// 	engine_model: string; // 原動機型式 24桁 可変 23
// 	document_type: string; // 帳票種別 1桁 固定 24
// }

// export interface KCarInspection {
// 	system_id_2: string; // システムID2 "K" 0
// 	version_number_2: string; // バージョン番号2 "32" 1
// 	chassis_number_stamp_location: string; // 車台番号打刻位置 3桁 固定 || "-  " 2
// 	model_specification_number_category_classification_number?: string; // 型式指定番号・類別区分番号 9桁 固定 || 設定なし 3
// 	expiration_date: string; // 有効期間の満了する日 YYMMDD || 999999 4
// 	first_inspection_year_month: string; // 初度検査年月 YYMM || 9999 5
// 	model: string; // 型式 20桁 可変 6
// 	axle_weight_ff: string; // 軸重(前前) 4桁 固定 単位は10kg 7
// 	axle_weight_fr: string; // 軸重(前後) "-" 8
// 	axle_weight_rf: string; // 軸重(後前) "-" 9
// 	axle_weight_rr: string; // 軸重(後後) 4桁 固定 10
// 	noise_regulation: string; // 騒音規制 2桁 固定 (10, 11, 12, 28) || "- " 11
// 	proximity_exhaust_noise_limit: string; // 接近排気騒音規制 3桁 固定 単位はdB || "-  " 12
// 	drive_system: string; // 駆動方式 "-" 13
// 	opacimeter_measured_car: string; // オパシメータ測定車 "-" 14
// 	nox_pm_measurement_mode: string; // NOx・PM測定モード "-" 15
// 	nox_value: string; // NOx "-   " 16
// 	pm_value: string; // PM "-    " 17
// 	fuel_type_code: string; // 燃料種類コード (00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 11, 12, 13, 14, 15, 16, 17, 18, 99 --) 18
// 	preliminary_item: string; // 予備項目 999 19
// 	system_id_3: string; // システムID3 "K" 20
// 	version_number_3: string; // バージョン番号3 "22" 21
// 	car_number: string; // 車両番号 12桁 固定 22
// 	plate_count_size_preferred_number_identifier: string; // 標板の枚数・大きさ・希望番号の識別 1桁 固定 (A~H, 1~8)|| "-" 23
// 	chassis_number: string; // 車台番号 20桁 固定 24
// 	engine_model: string; // 原動機型式 24桁 可変 25
// 	document_type: string; // 帳票種別 1桁 固定 26
// }
