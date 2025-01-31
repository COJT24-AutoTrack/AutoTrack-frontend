"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { Car } from "@/api/models/models";
import { ClientAPI } from "@/api/clientImplement";
import Image from "next/image";
import { checkIsUserCars } from "@/module/checkUserCars";
import {
	Car as CarIcon,
	Hash,
	Palette,
	Navigation,
	Droplet,
	Cigarette,
	Image as ImageIcon,
	Save,
} from "lucide-react";
import compressImage from "../../module/imageCompress";
import { v4 as uuidv4 } from "uuid";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const PageContainer = styled.div`
	background-color: #1a1a1a;
	min-height: 100vh;
	color: #ffffff;
	padding: 20px;
`;

const EditPanel = styled.div`
	max-width: 500px;
	margin: 0 auto;
	background-color: #2b2b2b;
	border-radius: 8px;
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const FormTitle = styled.h1`
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Label = styled.label`
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const Input = styled.input`
	background-color: #333333;
	border: 1px solid #ffffff;
	border-radius: 4px;
	color: #ffffff;
	padding: 10px;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: #4a90e2;
	}
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
	width: 20px;
	height: 20px;
`;

const Button = styled.button`
	background-color: #f12424;
	color: #ffffff;
	border: none;
	border-radius: 4px;
	padding: 12px 20px;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;

	&:hover {
		background-color: #d61f1f;
	}
`;

interface CarEditComponentProps {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}

const CarEditComponent: React.FC<CarEditComponentProps> = ({
	carId,
	tokens,
}) => {
	const [car, setCar] = useState<Car | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		const fetchCar = async () => {
			const clientAPI = ClientAPI(tokens.token);
			try {
				const response = await clientAPI.car.getCar({
					car_id: carId,
				});
				setCar(response);
			} catch (error) {
				console.error("Failed to fetch car:", error);
				alert("Failed to fetch car data. Please try again.");
			}
		};
		fetchCar();
	}, [carId, tokens]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!car) return;

		const clientAPI = ClientAPI(tokens.token);

		const isUserCar = await checkIsUserCars({ carId, tokens });
		if (!isUserCar) {
			alert("この車両は登録されていません");
			window.location.href = "/";
			return;
		}

		let newImageURL = car.car_image_url; // 既存の画像URL

		if (image) {
			const formData = new FormData();
			try {
				// ファイル名を UUID に変更
				const uuid = uuidv4();
				const fileExtension = "webp"; // 圧縮後は常に WebP とする
				const newFileName = `${uuid}.${fileExtension}`;

				// 画像を圧縮
				const compressedImage = await compressImage(image);

				// ファイル名を UUID に変更して FormData に追加
				const renamedFile = new File([compressedImage], newFileName, {
					type: "image/webp",
				});
				formData.append("file", renamedFile);

				// デバッグ用ログ
				console.log("Renamed Compressed File:", renamedFile);
				console.log("FormData Content:", formData.get("file"));

				// API を呼び出して画像をアップロード
				await clientAPI.image.uploadImage({ formData });

				// 新しい画像URLを設定
				newImageURL = `https://r2.autotrack.work/images/${newFileName}`;
			} catch (e) {
				// 圧縮またはアップロード失敗時のエラーハンドリング
				console.error("Upload Error:", e);
				alert((e as Error).message);
				return;
			}
		}

		try {
			// 新しい画像URLを使用して車両情報を更新
			const request = {
				car_id: car.car_id,
				car_name: car.car_name,
				carmodelnum: car.carmodelnum,
				car_color: car.car_color,
				car_mileage: car.car_mileage,
				car_isflooding: car.car_isflooding,
				car_issmoked: car.car_issmoked,
				car_image_url: newImageURL,
			};
			console.log("request:", request);

			const response = await clientAPI.car.updateCar(request);

			console.log("response:", response);
			if (response) {
				alert("車両情報が更新されました！");
				window.location.href = "/";
			}
		} catch (error) {
			console.error("Failed to update car:", error);
			alert("車両情報の更新に失敗しました。もう一度お試しください。");
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
			if (car) {
				setCar({
					...car,
					car_image_url: `https://r2.autotrack.work/images/${file.name}`,
				});
			}
		}
	};

	if (!car) return <div>Loading...</div>;

	return (
		<PageContainer>
			<EditPanel>
				<FormTitle className={Anton400.className}>車両情報を編集</FormTitle>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label>
							<CarIcon size={16} /> 車名
						</Label>
						<Input
							value={car.car_name}
							onChange={(e) => setCar({ ...car, car_name: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<Hash size={16} /> 型式番号
						</Label>
						<Input
							value={car.carmodelnum}
							onChange={(e) => setCar({ ...car, carmodelnum: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<Palette size={16} /> 色
						</Label>
						<Input
							value={car.car_color}
							onChange={(e) => setCar({ ...car, car_color: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<Navigation size={16} /> 走行距離 (km)
						</Label>
						<Input
							type="number"
							value={car.car_mileage}
							onChange={(e) =>
								setCar({ ...car, car_mileage: Number(e.target.value) })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<Checkbox
								checked={Boolean(car.car_isflooding)}
								onChange={(e) =>
									setCar({ ...car, car_isflooding: e.target.checked ? 1 : 0 })
								}
							/>
							<Droplet size={16} /> 浸水車
						</Label>
					</FormGroup>
					<FormGroup>
						<Label>
							<Checkbox
								checked={Boolean(car.car_issmoked)}
								onChange={(e) =>
									setCar({ ...car, car_issmoked: e.target.checked ? 1 : 0 })
								}
							/>
							<Cigarette size={16} /> 喫煙車
						</Label>
					</FormGroup>
					<FormGroup>
						<Label>
							<ImageIcon size={16} /> 車両画像
						</Label>
						<Input type="file" accept="image/*" onChange={handleImageChange} />
						{preview && (
							<Image
								src={preview}
								alt="Car Preview"
								width={300}
								height={200}
								style={{
									objectFit: "cover",
									borderRadius: "4px",
									marginTop: "10px",
								}}
							/>
						)}
					</FormGroup>
					<Button type="submit">
						<Save size={18} />
						更新
					</Button>
				</Form>
			</EditPanel>
		</PageContainer>
	);
};

export default CarEditComponent;
