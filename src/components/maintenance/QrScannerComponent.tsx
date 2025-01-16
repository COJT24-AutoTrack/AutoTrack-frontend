import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QrScannerComponent: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [qrResult, setQrResult] = useState<string | null>(null);
	const scannerRef = useRef<QrScanner | null>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		// QR Scanner の初期化
		scannerRef.current = new QrScanner(
			videoRef.current,
			(result) => {
				console.log("QR Code:", result.data);
				setQrResult(result.data); // `result.data` を使用
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

	return (
		<div>
			<h2>QRコードスキャナー</h2>
			<div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
				<video ref={videoRef} style={{ width: "100%" }} />
			</div>
			<p>スキャン結果: {qrResult || "スキャン中..."}</p>
		</div>
	);
};

export default QrScannerComponent;
