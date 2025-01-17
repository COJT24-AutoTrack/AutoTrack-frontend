import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QrScannerComponent: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [scannedResults, setScannedResults] = useState<string[]>([]);
	const scannerRef = useRef<QrScanner | null>(null);

	// "/" の数を数える関数
	const countSlashes = (text: string): number => {
		return (text.match(/\//g) || []).length;
	};

	// "/" の数でソートする関数
	const sortBySlashCount = (list: string[], order: number[]): string[] => {
		return list.sort((a, b) => {
			const countA = countSlashes(a);
			const countB = countSlashes(b);
			return order.indexOf(countA) - order.indexOf(countB);
		});
	};

	// QR Scanner の初期化
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
						// "/"が(5, 6, 7, 1, 4)の順でソートされるようにする
						return sortBySlashCount(newResults, [5, 6, 7, 1, 4]);
					});
				} else {
					console.warn("QRコードが空です。正しく読み取れませんでした。");
				}

				// スキャナーを一時停止
				scannerRef.current?.stop();

				// 1秒後にスキャナーを再開
				setTimeout(() => {
					scannerRef.current?.start().catch(console.error);
				}, 1000);
			},
			{
				highlightScanRegion: true,
				highlightCodeOutline: true,
			}
		);

		scannerRef.current.start().catch(console.error);

		return () => {
			scannerRef.current?.stop();
		};
	}, []);

	// スキャン結果をクリア
	const handleClearResults = () => {
		setScannedResults([]);
	};

	return (
		<div>
			<p>車検証のQRコードをスキャンできます</p>
			<div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
				<video ref={videoRef} style={{ width: "100%" }} />
			</div>

			<h3>スキャン結果:</h3>
			<ul style={{ maxHeight: "200px", overflowY: "auto", background: "#2b2b2b", padding: "10px", borderRadius: "5px", color: "white" }}>
				{scannedResults.length > 0 ? (
					scannedResults.map((result, index) => (
						<li key={index} style={{ marginBottom: "5px" }}>
							{result}
						</li>
					))
				) : (
					<p>スキャン待機中...</p>
				)}
			</ul>

			<button
				onClick={handleClearResults}
				style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f12424", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
			>
				スキャン結果をクリア
			</button>
		</div>
	);
};

export default QrScannerComponent;
