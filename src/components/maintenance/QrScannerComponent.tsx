import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";

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

const ClearButton = styled.button`
	margin-top: 10px;
	padding: 10px;
	background-color: #f12424;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const plateCategoryMap: Record<string, string> = {
	A: "小板・2枚・ペイント 希望",
	"1": "小板・2枚・ペイント 希望以外",
	B: "大板・2枚・ペイント 希望",
	"2": "大板・2枚・ペイント 希望以外",
	C: "小板・1枚・ペイント 希望",
	"3": "小板・1枚・ペイント 希望以外",
	D: "大板・1枚・ペイント 希望",
	"4": "大板・1枚・ペイント 希望以外",
	E: "小板・2枚・字光 希望",
	"5": "小板・2枚・字光 希望以外",
	F: "大板・2枚・字光 希望",
	"6": "大板・2枚・字光 希望以外",
	G: "小板・1枚・字光 希望",
	"7": "小板・1枚・字光 希望以外",
	H: "大板・1枚・字光 希望",
	"8": "大板・1枚・字光 希望以外",
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

const formatDate = (dateString: string): string => {
	if (!/^\d{6}$/.test(dateString)) return "-";

	const yearPart = parseInt(dateString.substring(0, 2), 10);
	const month = dateString.substring(2, 4);
	const day = dateString.substring(4, 6);

	const currentYear = new Date().getFullYear(); // 現在の西暦年
	let year = 2000 + yearPart; // 初期値として 2000 年代と仮定

	// 未来の日付になってしまう場合は 1900 年代に修正
	if (year > currentYear) {
		year -= 100; // 例えば 2049 年 → 1949 年 に変換
	}

	return `${year}/${month}/${day}`;
};

const formatYearMonth = (yearMonthString: string): string => {
	if (!/^\d{4}$/.test(yearMonthString)) return "-"; // 4桁でない場合は不明

	const yearPart = parseInt(yearMonthString.substring(0, 2), 10);
	const month = yearMonthString.substring(2, 4);

	const currentYear = new Date().getFullYear(); // 現在の西暦
	let year = 2000 + yearPart; // 初期値は 2000年代と仮定

	// 未来の年なら 1900 年代に修正
	if (year > currentYear) {
		year -= 100;
	}

	return `${year}/${month}`;
};

const QrScannerComponent: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [scannedResults, setScannedResults] = useState<string[]>([]);
	const [splittedResults, setSplittedResults] = useState<string[]>([]);
	const scannerRef = useRef<QrScanner | null>(null);

	const countSlashes = (text: string): number =>
		(text.match(/\//g) || []).length;

	const sortBySlashCount = (list: string[], order: number[]): string[] => {
		return list.sort(
			(a, b) => order.indexOf(countSlashes(a)) - order.indexOf(countSlashes(b)),
		);
	};

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

	useEffect(() => {
		if (!videoRef.current) return;

		scannerRef.current = new QrScanner(
			videoRef.current,
			(result) => {
				if (result.data && result.data.trim() !== "") {
					console.log("QR Code (テキスト):", result.data);

					setScannedResults((prevResults) => {
						const newResults = prevResults.includes(result.data)
							? prevResults
							: [...prevResults, result.data];

						// "/"の数をみて、5, 6, 7, 1, 4 の順にソート
						const sortedResults = sortBySlashCount(newResults, [5, 6, 7, 1, 4]);

						if (sortedResults.length === 5) {
							let joinedString = "";
							// 3番目の要素の後に"/"を追加しないといけない
							for (let i = 0; i < sortedResults.length; i++) {
								joinedString += sortedResults[i];
								if (i === 2) joinedString += "/";
							}
							setSplittedResults(joinedString.split("/"));
						}
						return sortedResults;
					});
				} else {
					console.warn("QRコードが空です。正しく読み取れませんでした。");
				}
				scannerRef.current?.stop();

				// スキャンできたら1秒取得をやめて、その後に再スキャン開始するようにしている
				setTimeout(
					() => scannerRef.current?.start().catch(console.error),
					1000,
				);
			},
			{ highlightScanRegion: true, highlightCodeOutline: true },
		);

		scannerRef.current.start().catch(console.error);
		return () => scannerRef.current?.stop();
	}, []);

	const handleClearResults = () => {
		setScannedResults([]);
		setSplittedResults([]);
	};

	return (
		<ScannerContainer>
			<p>車検証のQRコードをスキャンできます</p>
			<VideoWrapper>
				<VideoElement ref={videoRef} />
			</VideoWrapper>

			<ResultsList>
				{scannedResults.length > 0 ? (
					scannedResults.map((result, index) => (
						<ListItem key={index}>{result}</ListItem>
					))
				) : (
					<p>スキャン待機中...</p>
				)}
			</ResultsList>

			<SplitResultsList>
				{splittedResults.length > 0 ? (
					splittedResults.map((result, index) => {
						// どのインデックスに該当するかで表示文字列を切り替える関数
						const getDisplayValue = (idx: number, val: string) => {
							if (idx === 3) {
								return formatDate(val);
							} else if (idx === 4) {
								return formatYearMonth(val);
							} else if (idx >= 6 && idx <= 9) {
								return convertAxleWeight(val);
							} else if (idx === 10) {
								return `平成${val}年騒音規制適合車`;
							} else if (idx === 11) {
								return `${parseInt(val, 10)} dB`;
							} else if (idx === 17) {
								return val === "999999" ? "-" : val;
							} else if (idx === 18) {
								return getFuelType(val);
							} else if (idx === 21) {
								return `${getPlateCategory(val)}`;
							}
							// 上記いずれにも当てはまらない場合はそのまま表示
							return val;
						};

						return (
							<ListItem key={index}>
								<strong>{headers[index] || `項目 ${index + 1}`}:</strong>{" "}
								{getDisplayValue(index, result)}
							</ListItem>
						);
					})
				) : (
					<p>スキャンが完了すると表示されます...</p>
				)}
			</SplitResultsList>

			<ClearButton onClick={handleClearResults}>
				スキャン結果をクリア
			</ClearButton>
		</ScannerContainer>
	);
};

export default QrScannerComponent;
