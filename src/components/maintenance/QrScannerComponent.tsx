import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import {
	CarInspection,
	StandardCarInspection,
	KCarInspection,
} from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";

// ===== スタイル定義 =====
const ScannerContainer = styled.div`
	text-align: left;
`;

const VideoWrapper = styled.div`
	position: relative;
	width: 100%;
	max-width: 500px;
	margin: auto;
`;

const VideoElement = styled.video`
	width: 100%;
`;

const ResultsList = styled.ul`
	max-height: 200px;
	overflow-y: auto;
	background: #2b2b2b;
	padding: 10px;
	border-radius: 5px;
	color: white;
`;

const SplitResultsList = styled(ResultsList)`
	max-height: 400px;
`;

const ListItem = styled.li`
	margin-bottom: 5px;
`;

const SubmitButton = styled.button`
	margin-top: 10px;
	width: 100px;
	padding: 10px;
	background-color: #f12424;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const ClearButton = styled(SubmitButton)`
	background-color: #333;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	gap: 10px;
`;

// ===== 定数マッピング =====
const plateCategoryMap: Record<string, string> = {
	A: "小板・2枚・ペイント 希望",
	B: "大板・2枚・ペイント 希望",
	C: "小板・1枚・ペイント 希望",
	D: "大板・1枚・ペイント 希望",
	E: "小板・2枚・字光 希望",
	F: "大板・2枚・字光 希望",
	G: "小板・1枚・字光 希望",
	H: "大板・1枚・字光 希望",
	"1": "小板・2枚・ペイント 希望以外",
	"2": "大板・2枚・ペイント 希望以外",
	"3": "小板・1枚・ペイント 希望以外",
	"4": "大板・1枚・ペイント 希望以外",
	"5": "小板・2枚・字光 希望以外",
	"6": "大板・2枚・字光 希望以外",
	"7": "小板・1枚・字光 希望以外",
	"8": "大板・1枚・字光 希望以外",
	"-": "番号指示キー無し又は転入抹消番号",
};

const KcarPlateCategoryMap: Record<string, string> = {
	A: "中板・2枚・ペイント 希望",
	B: "小板・2枚・ペイント 希望",
	C: "中板・1枚・ペイント 希望",
	D: "小板・1枚・ペイント 希望",
	E: "中板・2枚・字光 希望",
	F: "小板・2枚・字光 希望",
	G: "中板・1枚・字光 希望",
	H: "小板・1枚・字光 希望",
	"1": "中板・2枚・ペイント 希望以外",
	"2": "小板・2枚・ペイント 希望以外",
	"3": "中板・1枚・ペイント 希望以外",
	"4": "小板・1枚・ペイント 希望以外",
	"5": "中板・2枚・字光 希望以外",
	"6": "小板・2枚・字光 希望以外",
	"7": "中板・1枚・字光 希望以外",
	"8": "小板・1枚・字光 希望以外",
	"-": "番号指示キー無し又は転入抹消番号",
};

const fuelTypeMap: Record<string, string> = {
	"01": "ガソリン",
	"02": "軽油",
	"03": "LPG",
	"04": "灯油",
	"05": "電気",
	"06": "ガソリン・LPG",
	"07": "ガソリン・灯油",
	"08": "メタノール",
	"09": "CNG",
	"11": "LNG",
	"12": "ANG",
	"13": "圧縮水素",
	"14": "ガソリン・電気",
	"15": "LPG・電気",
	"16": "軽油・電気",
	"99": "その他",
	"00": "-",
};

const convertAxleWeight = (value: string): string => {
	const numericValue = parseInt(value, 10) * 10;
	return isNaN(numericValue) ? "-" : `${numericValue}kg`;
};

const getFuelType = (type: string): string => {
	return fuelTypeMap[type] || "-";
};

const getPlateCategory = (category: string): string => {
	return plateCategoryMap[category] || "-";
};

const getKcarPlateCategory = (category: string): string => {
	return KcarPlateCategoryMap[category] || "-";
};

const formatDate = (dateString: string): string => {
	if (!/^\d{6}$/.test(dateString)) return "-";
	if (dateString === "999999") return "-";

	const yearPart = parseInt(dateString.substring(0, 2), 10);
	const month = dateString.substring(2, 4);
	const day = dateString.substring(4, 6);

	const currentYear = new Date().getFullYear();
	let year = 2000 + yearPart;

	if (year > currentYear) {
		year -= 100;
	}

	return `${year}/${month}/${day}`;
};

const formatYearMonth = (yearMonthString: string): string => {
	if (!/^\d{4}$/.test(yearMonthString)) return "-";
	if (yearMonthString === "999999") return "-";

	const yearPart = parseInt(yearMonthString.substring(0, 2), 10);
	const month = yearMonthString.substring(2, 4);

	const currentYear = new Date().getFullYear();
	let year = 2000 + yearPart;

	if (year > currentYear) {
		year -= 100;
	}

	return `${year}/${month}`;
};

// ===== ヘッダ配列 =====
const headers = [
	"バージョン情報",
	"車台番号打刻位置",
	"型式指定番号・類別区分番号",
	"有効期間の満了する日",
	"初度登録年月",
	"型式",
	"軸重(前前)",
	"軸重(前後)",
	"軸重(後前)",
	"軸重(後後)",
	"騒音規制",
	"近接排気騒音規制値",
	"駆動方式",
	"オパシメータ測定車",
	"NOx・PM測定モード",
	"NOx値",
	"PM値",
	"保安基準適用年月日",
	"燃料の種類コード",
	"バージョン情報",
	"自動車登録番号および車両番号",
	"標板の枚数・大きさ・希望番号の識別",
	"車台番号",
	"原動機型式",
	"帳票種別",
];

const KcarHeaders = [
	"システムID",
	"バージョン番号",
	"車台番号打刻位置",
	"型式指定番号・類別区分番号",
	"有効期間満了日",
	"初度検査年月",
	"型式",
	"軸重(前前)",
	"軸重(前後)",
	"軸重(後前)",
	"軸重(後後)",
	"騒音規制",
	"近接排気騒音規制値",
	"駆動方式",
	"オパシメータ測定車",
	"NOx・PM測定モード",
	"NOx値",
	"PM値",
	"燃料の種類コード",
	"予備項目",
	"システムID",
	"バージョン情報",
	"自動車登録番号および車両番号",
	"標板の枚数・大きさ・希望番号の識別",
	"車台番号",
	"原動機型式",
	"帳票種別",
];

const countSlashes = (text: string): number => (text.match(/\//g) || []).length;

const sortBySlashCount = (list: string[]): string[] => {
	let order: number[] = [];
	if (list[0]?.[0] === "K") {
		// 軽自動車の場合
		order = [19, 6];
	} else {
		// 普通車の場合
		order = [5, 6, 7, 1, 4];
	}
	return list.sort(
		(a, b) => order.indexOf(countSlashes(a)) - order.indexOf(countSlashes(b)),
	);
};

const getDisplayValue = (isKcar: boolean, idx: number, val: string): string => {
	if (isKcar) {
		// 軽自動車向け処理
		switch (idx) {
			case 4:
				return formatDate(val);
			case 5:
				return formatYearMonth(val);
			case 7:
			case 8:
			case 9:
			case 10:
				return convertAxleWeight(val);
			case 11:
				return `平成${val}年騒音規制適合車`;
			case 12:
				return `${parseInt(val, 10)} dB`;
			case 18:
				// 999999 は「-」扱い
				return val === "999999" ? "-" : val;
			case 19:
				return getFuelType(val);
			case 23:
				return getKcarPlateCategory(val);
			default:
				return val;
		}
	} else {
		// 普通車向け処理
		switch (idx) {
			case 3:
				return formatDate(val);
			case 4:
				return formatYearMonth(val);
			case 6:
			case 7:
			case 8:
			case 9:
				return convertAxleWeight(val);
			case 10:
				return `平成${val}年騒音規制適合車`;
			case 11:
				return `${parseInt(val, 10)} dB`;
			case 17:
				return val === "999999" ? "-" : val;
			case 18:
				return getFuelType(val);
			case 21:
				return getPlateCategory(val);
			default:
				return val;
		}
	}
};

interface QrScannerComponentProps {
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	carId: string;
}

const QrScannerComponent: React.FC<QrScannerComponentProps> = ({
	tokens,
	carId,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const scannerRef = useRef<QrScanner | null>(null);

	const [scannedResults, setScannedResults] = useState<string[]>([]);
	const [splittedResults, setSplittedResults] = useState<string[]>([]);
	const [isKcar, setIsKcar] = useState<boolean>(false);
	const [carInspection, setCarInspection] = useState<CarInspection | null>(
		null,
	);
	const [StandardCarInspection, setStandardCarInspection] =
		useState<StandardCarInspection | null>(null);
	const [KCarInspection, setKCarInspection] = useState<KCarInspection | null>(
		null,
	);

	// 既存の車検証情報があれば取得
	useEffect(() => {
		const fetchCarInspection = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const car = await clientAPI.carInspection.getCarInspection({
					car_id: carId,
				});
				if (car.is_kcar === 1) {
					setKCarInspection(car);
				} else {
					setStandardCarInspection(car);
				}
			} catch (error) {
				console.error("Error fetching car inspection:", error);
			}
		};
		fetchCarInspection();
	}, [carId, tokens]);

	// カメラ初期化 & スキャン
	useEffect(() => {
		if (!videoRef.current) return;

		scannerRef.current = new QrScanner(
			videoRef.current,
			(result) => {
				if (result.data && result.data.trim() !== "") {
					// 新しい結果であれば scannedResults に追加
					setScannedResults((prevResults) => {
						if (prevResults.includes(result.data)) {
							return prevResults;
						}
						const newResults = [...prevResults, result.data];
						const sortedResults = sortBySlashCount(newResults);

						// 軽自動車判定
						if (sortedResults.length > 0) {
							if (sortedResults[0][0] === "K") {
								setIsKcar(true);
							} else {
								setIsKcar(false);
							}
						}

						// パターン分岐
						if (sortedResults[0]?.[0] === "K") {
							// 軽自動車
							setSplittedResults(sortedResults.join("/").split("/"));
						} else if (sortedResults.length === 5) {
							// 普通車
							let joinedString = "";
							for (let i = 0; i < sortedResults.length; i++) {
								joinedString += sortedResults[i];
								if (i === 2) joinedString += "/";
							}
							setSplittedResults(joinedString.split("/"));
						}
						return sortedResults;
					});
				} else {
					console.warn("QRコードが空です or 解析失敗");
				}

				// スキャン後: 一旦停止 & 1秒後に再開
				scannerRef.current?.stop();
				setTimeout(() => {
					scannerRef.current?.start().catch(console.error);
				}, 1000);
			},
			{
				highlightScanRegion: true,
				highlightCodeOutline: true,
			},
		);

		scannerRef.current.start().catch(console.error);
		return () => {
			scannerRef.current?.stop();
		};
	}, []);

	// クリアボタン
	const handleClearResults = () => {
		setScannedResults([]);
		setSplittedResults([]);
		setIsKcar(false);
		setCarInspection(null);
	};

	const handleSubmitAPI = async () => {
		try {
			const clientAPI = ClientAPI(tokens.token);

			if (isKcar) {
				const payload: KCarInspection = {
					car_id: carId,
					is_kcar: 1,

					system_id_1: splittedResults[0] ?? "",
					version_number: splittedResults[1] ?? "",
					chassis_number_stamp_location: splittedResults[2] ?? "",
					model_specification_number_category_classification_number:
						splittedResults[3] ?? "",
					expiration_date: splittedResults[4] ?? "",
					first_registration_year_month: splittedResults[5] ?? "",
					model: splittedResults[6] ?? "",
					axle_weight_ff: splittedResults[7]
						? parseInt(splittedResults[7], 10)
						: undefined,
					axle_weight_fr: splittedResults[8]
						? parseInt(splittedResults[8], 10)
						: undefined,
					axle_weight_rf: splittedResults[9]
						? parseInt(splittedResults[9], 10)
						: undefined,
					axle_weight_rr: splittedResults[10]
						? parseInt(splittedResults[10], 10)
						: undefined,
					noise_regulation: splittedResults[11] ?? "",
					proximity_exhaust_noise_limit: splittedResults[12]
						? parseInt(splittedResults[12], 10)
						: undefined,
					drive_system: splittedResults[13] ?? "",
					opacimeter_measured_car: parseInt(splittedResults[14], 10) as 0 | 1,
					nox_pm_measurement_mode: splittedResults[15] ?? "",
					nox_value: splittedResults[16]
						? parseFloat(splittedResults[16])
						: undefined,
					pm_value: splittedResults[17]
						? parseFloat(splittedResults[17])
						: undefined,
					fuel_type_code: splittedResults[18] ?? "",
					preliminary_item: splittedResults[19] ?? "",
					system_id_2: splittedResults[20] ?? "",
					version_info_2: splittedResults[21] ?? "",
					car_registration_number: splittedResults[22] ?? "",
					plate_count_size_preferred_number_identifier:
						splittedResults[23] ?? "",
					chassis_number: splittedResults[24] ?? "",
					engine_model: splittedResults[25] ?? "",
					document_type: splittedResults[26] ?? "",
				};

				await clientAPI.carInspection.createCarInspection({
					car_id: payload.car_id,
					inspection_data: payload,
				});
				alert("軽自動車の車検証情報を送信しました。");
			} else {
				const payload: StandardCarInspection = {
					car_id: carId,
					is_kcar: 0,

					version_info_1: splittedResults[0] ?? "",
					chassis_number_stamp_location: splittedResults[1] ?? "",
					model_specification_number_category_classification_number:
						splittedResults[2] ?? "",
					expiration_date: splittedResults[3] ?? "",
					first_registration_year_month: splittedResults[4] ?? "",
					model: splittedResults[5] ?? "",
					axle_weight_ff: splittedResults[6]
						? parseInt(splittedResults[6], 10)
						: undefined,
					axle_weight_fr: splittedResults[7]
						? parseInt(splittedResults[7], 10)
						: undefined,
					axle_weight_rf: splittedResults[8]
						? parseInt(splittedResults[8], 10)
						: undefined,
					axle_weight_rr: splittedResults[9]
						? parseInt(splittedResults[9], 10)
						: undefined,
					noise_regulation: splittedResults[10] ?? "",
					proximity_exhaust_noise_limit: splittedResults[11]
						? parseInt(splittedResults[11], 10)
						: undefined,
					drive_system: splittedResults[12] ?? "",
					opacimeter_measured_car: parseInt(splittedResults[13], 10) as 0 | 1,
					nox_pm_measurement_mode: splittedResults[14] ?? "",
					nox_value: splittedResults[15]
						? parseFloat(splittedResults[15])
						: undefined,
					pm_value: splittedResults[16]
						? parseFloat(splittedResults[16])
						: undefined,
					safety_standard_application_date: splittedResults[17] ?? "",
					fuel_type_code: splittedResults[18] ?? "",
					version_info_2: splittedResults[19] ?? "",
					car_registration_number: splittedResults[20] ?? "",
					plate_count_size_preferred_number_identifier:
						splittedResults[21] ?? "",
					chassis_number: splittedResults[22] ?? "",
					engine_model: splittedResults[23] ?? "",
					document_type: splittedResults[24] ?? "",
				};

				await clientAPI.carInspection.createCarInspection({
					car_id: payload.car_id,
					inspection_data: payload,
				});
				alert("普通車の車検証情報を送信しました。");
			}
		} catch (error) {
			console.error("Error posting car inspection:", error);
			alert("API通信エラーが発生しました。");
		}
	};

	return (
		<ScannerContainer>
			<p>車検証のQRコードをスキャンできます</p>

			{carInspection && (
				<div style={{ background: "#eee", padding: "10px", margin: "10px 0" }}>
					<h3>DBに登録済みの車検証情報</h3>
					<ul>
						{Object.entries(carInspection).map(([key, val], index) => (
							<li key={key}>
								{key}:{" "}
								{getDisplayValue(
									carInspection.is_kcar === 1,
									index,
									String(val),
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			<VideoWrapper>
				<VideoElement ref={videoRef} />
			</VideoWrapper>

			{/* --- 生のスキャン結果を出す --- */}
			<ResultsList>
				{scannedResults.length > 0 ? (
					scannedResults.map((result, index) => (
						<ListItem key={index}>{result}</ListItem>
					))
				) : (
					<p>スキャン待機中...</p>
				)}
			</ResultsList>

			{/* --- 分割・変換後の結果表示 --- */}
			<SplitResultsList>
				{splittedResults.length > 0 ? (
					splittedResults.map((result, index) => {
						const currentHeaders = isKcar ? KcarHeaders : headers;
						const headerLabel = currentHeaders[index] || `項目 ${index + 1}`;
						return (
							<ListItem key={index}>
								<strong>{headerLabel}:</strong>{" "}
								{getDisplayValue(isKcar, index, result)}
							</ListItem>
						);
					})
				) : (
					<p>スキャンが完了すると表示されます...</p>
				)}
			</SplitResultsList>

			<ButtonsContainer>
				<ClearButton onClick={handleClearResults}>クリア</ClearButton>
				<SubmitButton onClick={handleSubmitAPI}>送信</SubmitButton>
			</ButtonsContainer>
		</ScannerContainer>
	);
};

export default QrScannerComponent;
