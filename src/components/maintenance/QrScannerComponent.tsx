import React, { useCallback, useEffect, useRef, useState } from "react";
// import QrScanner from "qr-scanner";
import styled from "styled-components";
import { CarInspection } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";
import {
	getDisplayValue,
	KCarHeaders,
	StandardCarheaders,
} from "@/lib/parseCarInspection";
import { useZxing } from "react-zxing";
import { DecodeHintType } from "@zxing/library";

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
	/* background: #2b2b2b; */
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

const countSlashes = (text: string): number => (text.match(/\//g) || []).length;

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
	// const scannerRef = useRef<QrScanner | null>(null);

	const [scannedResults, setScannedResults] = useState<string[]>([]);
	const [splittedResults, setSplittedResults] = useState<string[]>([]);
	const [isKcar, setIsKcar] = useState<boolean>(false);
	const [carInspection, setCarInspection] = useState<CarInspection | null>(
		null,
	);

	const [result, setResult] = useState("");

	const handleDecode = useCallback(
		(result: string) => {
			console.log("QRコードスキャン結果:", result);
			const rawData = result.trim();
			if (!rawData) {
				console.warn("QRコードが空です or 解析失敗");
				return;
			} else {
				console.log("QRコード解析成功:", rawData);
			}

			setScannedResults((prev) => {
				// 同じ結果は重複登録しない
				if (prev.includes(rawData)) {
					return prev;
				}

				const newResults = [...prev, rawData];
				const sortedResults = sortBySlashCount(newResults);

				// 軽自動車判定
				const detectedIsKcar = sortedResults[0]?.[0] === "K";

				// splittedResults を生成
				let newSplitted: string[] = [];
				if (detectedIsKcar) {
					// 軽自動車
					newSplitted = sortedResults.join("/").split("/");
				} else if (sortedResults.length === 5) {
					// 普通車
					let joinedString = "";
					for (let i = 0; i < sortedResults.length; i++) {
						joinedString += sortedResults[i];
						if (i === 2) joinedString += "/";
					}
					newSplitted = joinedString.split("/");
				}

				// CarInspection を作成
				const newInspection: CarInspection = {
					car_id: carId,
					is_kcar: detectedIsKcar ? 1 : 0,

					// BaseCarInspection
					chassis_number_stamp_location: detectedIsKcar
						? newSplitted[2]
						: newSplitted[1],
					model_specification_number_category_classification_number:
						detectedIsKcar ? newSplitted[2] : newSplitted[3],
					expiration_date: detectedIsKcar ? newSplitted[4] : newSplitted[3],
					first_registration_year_month: detectedIsKcar
						? newSplitted[5]
						: newSplitted[4],
					model: detectedIsKcar ? newSplitted[6] : newSplitted[5],
					axle_weight_ff: detectedIsKcar ? newSplitted[7] : newSplitted[6],
					axle_weight_rr: detectedIsKcar ? newSplitted[10] : newSplitted[9],
					noise_regulation: detectedIsKcar ? newSplitted[11] : newSplitted[10],
					proximity_exhaust_noise_limit: detectedIsKcar
						? newSplitted[12]
						: newSplitted[11],
					fuel_type_code: newSplitted[18],
					car_registration_number: detectedIsKcar
						? newSplitted[22]
						: newSplitted[20],
					plate_count_size_preferred_number_identifier: detectedIsKcar
						? newSplitted[23]
						: newSplitted[21],
					chassis_number: detectedIsKcar ? newSplitted[24] : newSplitted[22],
					engine_model: detectedIsKcar ? newSplitted[25] : newSplitted[23],
					document_type: detectedIsKcar ? newSplitted[26] : newSplitted[24],

					// Standard (普通車)
					version_info_2: detectedIsKcar ? null : newSplitted[0],
					axle_weight_fr: detectedIsKcar ? null : newSplitted[7],
					axle_weight_rf: detectedIsKcar ? null : newSplitted[8],
					drive_system: detectedIsKcar ? null : newSplitted[12],
					opacimeter_measured_car: detectedIsKcar ? null : newSplitted[13],
					nox_pm_measurement_mode: detectedIsKcar ? null : newSplitted[14],
					nox_value: detectedIsKcar ? null : newSplitted[15],
					pm_value: detectedIsKcar ? null : newSplitted[16],
					safety_standard_application_date: detectedIsKcar
						? null
						: newSplitted[17],
					version_info_3: detectedIsKcar ? null : newSplitted[19],

					// KCar (軽自動車)
					system_id_2: detectedIsKcar ? "K" : null,
					version_number_2: detectedIsKcar ? "32" : null,
					k_axle_weight_fr: detectedIsKcar ? "-" : null,
					k_axle_weight_rf: detectedIsKcar ? "-" : null,
					k_drive_system: detectedIsKcar ? "-" : null,
					k_opacimeter_measured_car: detectedIsKcar ? "-" : null,
					k_nox_pm_measurement_mode: detectedIsKcar ? "-" : null,
					k_nox_value: detectedIsKcar ? "-" : null,
					k_pm_value: detectedIsKcar ? "-" : null,
					preliminary_item: detectedIsKcar ? "999" : null,
					system_id_3: detectedIsKcar ? "K" : null,
					version_number_3: detectedIsKcar ? "22" : null,
				};

				// state 更新を集約
				setIsKcar(detectedIsKcar);
				setSplittedResults(newSplitted);
				setCarInspection(newInspection);

				return sortedResults;
			});
		},
		[carId],
	);
	const hints = new Map();
	hints.set(DecodeHintType.TRY_HARDER, true);
	const constraints: MediaStreamConstraints = {
		video: { width: { ideal: 1280 }, height: { ideal: 720 } },
		audio: false,
	};

	const { ref } = useZxing({
		onDecodeResult(result) {
			setResult(result.getText());
			handleDecode(result.getText());
		},
		constraints,
		hints,
	});

	useEffect(() => {
		// if (!videoRef.current) return;
		// scannerRef.current = new QrScanner(videoRef.current, handleDecode, {
		// 	highlightScanRegion: true,
		// 	highlightCodeOutline: true,
		// });
		// scannerRef.current.start().catch(console.error);
		// // クリーンアップ
		// return () => {
		// 	scannerRef.current?.stop();
		// };
		console.log("QR Scanner Error: No QR Code Found.");
	}, [handleDecode]);

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
			if (!carInspection) {
				alert("スキャン結果がありません");
				return;
			}
			await clientAPI.carInspection.createCarInspection(carInspection);
			window.location.reload();
		} catch (error) {
			console.error("Error posting car inspection:", error);
			alert("API通信エラーが発生しました。");
		}
	};

	return (
		<ScannerContainer>
			<p>車検証のQRコードをスキャンできます</p>

			{/* {carInspection && (
				<div style={{ padding: "10px", margin: "10px 0" }}>
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
					<div>{JSON.stringify(carInspection, null, 2)}</div>
				</div>
			)} */}

			<VideoWrapper>
				<VideoElement ref={ref} />
			</VideoWrapper>

			{/* --- 生のスキャン結果を出す ---
			<ResultsList>
				{scannedResults.length > 0 ? (
					scannedResults.map((result, index) => (
						<ListItem key={index}>{result}</ListItem>
					))
				) : (
					<p>スキャン待機中...</p>
				)}
			</ResultsList> */}

			{/* --- 分割・変換後の結果表示 --- */}
			<SplitResultsList>
				<p>{result}</p>
				{splittedResults.length > 0 ? (
					splittedResults.map((result, index) => {
						const currentHeaders = isKcar ? KCarHeaders : StandardCarheaders;
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
