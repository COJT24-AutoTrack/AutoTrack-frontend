"use client";

import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FuelEfficiency } from "@/api/models/models";

// Chart.jsに必要な要素を登録
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface RefuelingChartProps {
	fuelEfficiencies: FuelEfficiency[];
}

const RefuelingChart: React.FC<RefuelingChartProps> = ({
	fuelEfficiencies,
}) => {
	// 古い→新しい順にソート
	const sortedAsc = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime(),
	);

	// X 軸: 日付
	const labels = sortedAsc.map((fe) => fe.fe_date.slice(0, 10));

	// 燃費 (km/L)
	const dataFuelEfficiency = sortedAsc.map((fe) =>
		fe.fe_amount ? fe.fe_mileage / fe.fe_amount : 0,
	);

	// 価格 (円/L)
	const dataPrice = sortedAsc.map((fe) => fe.fe_unitprice);

	// 走行距離 (累計)
	let cumulative = 0;
	const dataDistance = sortedAsc.map((fe) => {
		cumulative += fe.fe_mileage;
		return cumulative;
	});

	// 複数データセット + 複数Y軸
	const chartData = {
		labels,
		datasets: [
			{
				label: "燃費",
				data: dataFuelEfficiency,
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				yAxisID: "yFe",
			},
			{
				label: "ガソリン価格",
				data: dataPrice,
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				yAxisID: "yPrice",
			},
			{
				label: "累計走行距離",
				data: dataDistance,
				borderColor: "rgba(153, 102, 255, 1)",
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				yAxisID: "yDist",
			},
		],
	};

	// ChartOptions<"line"> を使う
	const chartOptions: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
			},
		},
		scales: {
			yFe: {
				type: "linear",
				position: "left",
			},
			yPrice: {
				type: "linear",
				position: "right",
				grid: {
					drawOnChartArea: false, // 左軸との重複グリッドラインを避ける
				},
			},
			yDist: {
				type: "linear",
				position: "right",
				grid: {
					drawOnChartArea: false,
				},
			},
		},
	};

	return (
		<div style={{ maxWidth: 800, margin: "0 auto" }}>
			<h3>燃費・価格・走行距離の推移</h3>
			<Line data={chartData} options={chartOptions} />
		</div>
	);
};

export default RefuelingChart;
