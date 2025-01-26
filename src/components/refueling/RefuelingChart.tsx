"use client";

import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
	Tick,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { FuelEfficiency } from "@/api/models/models";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
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
	const colors = {
		fuelEfficiency: "#ed3b70",
		fuelEfficiencyTransparent: "#ed3b70",
		cumulativeDistance: "#b1fbd1",
		cumulativeDistanceTransparent: "#b1fbd1",
		distanceSinceLastRefuel: "#22537466",
		distanceSinceLastRefuelTransparent: "#22537466",
		fuelAmount: "#5db2be",
		fuelAmountTransparent: "#5db2be",
		fuelCost: "#cce5f3",
		fuelCostTransparent: "#cce5f3",
		legendText: "#999999",
		tooltipBackground: "#333333",
		tooltipTitle: "#999999",
		tooltipBody: "#999999",
		grid: "#444444",
		axisText: "#999999",
	};

	const sortedAsc = [...fuelEfficiencies].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime(),
	);

	const labels = sortedAsc.map((fe) => fe.fe_date.slice(0, 10));

	const dataFuelEfficiency = sortedAsc.map((fe) =>
		fe.fe_amount ? fe.fe_mileage / fe.fe_amount : 0,
	);

	const dataFuelAmount = sortedAsc.map((fe) => fe.fe_amount || 0);

	const dataFuelCost = sortedAsc.map((fe) =>
		fe.fe_amount ? fe.fe_unitprice * fe.fe_amount : 0,
	);

	let cumulative = 0;
	const dataDistance = sortedAsc.map((fe) => {
		cumulative += fe.fe_mileage;
		return cumulative;
	});

	const dataDistanceSinceLastRefuel = sortedAsc.map((fe) => fe.fe_mileage);

	const chartData: ChartData<"bar" | "line", number[], string> = {
		labels,
		datasets: [
			{
				label: "燃費 (km/L)",
				data: dataFuelEfficiency,
				borderColor: colors.fuelEfficiency,
				backgroundColor: colors.fuelEfficiencyTransparent,
				yAxisID: "yFe",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "累計走行距離 (km)",
				data: dataDistance,
				borderColor: colors.cumulativeDistance,
				backgroundColor: colors.cumulativeDistanceTransparent,
				yAxisID: "yDist",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "前回からの走行距離 (km)",
				data: dataDistanceSinceLastRefuel,
				borderColor: colors.distanceSinceLastRefuel,
				backgroundColor: colors.distanceSinceLastRefuelTransparent,
				yAxisID: "yDist",
				type: "bar",
			},
			{
				label: "給油量 (L)",
				data: dataFuelAmount,
				borderColor: colors.fuelAmount,
				backgroundColor: colors.fuelAmountTransparent,
				yAxisID: "yFuelAmount",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "給油金額 (円)",
				data: dataFuelCost,
				borderColor: colors.fuelCost,
				backgroundColor: colors.fuelCostTransparent,
				yAxisID: "yFuelCost",
				type: "line",
				fill: false,
				tension: 0.2,
			},
		],
	};

	const chartOptions: ChartOptions<"bar" | "line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					color: colors.legendText,
					font: {
						size: 14,
					},
				},
			},
			tooltip: {
				mode: "index",
				intersect: false,
				backgroundColor: colors.tooltipBackground,
				titleColor: colors.tooltipTitle,
				bodyColor: colors.tooltipBody,
				borderWidth: 1,
			},
			title: {
				display: false,
			},
		},
		interaction: {
			mode: "nearest",
			axis: "x",
			intersect: false,
		},
		scales: {
			yFe: {
				type: "linear",
				position: "left",
				title: {
					display: false,
				},
				ticks: {
					color: colors.axisText,
					font: {
						size: 14,
					},
					callback: function (tickValue: string | number) {
						if (typeof tickValue === "number" && tickValue === 0) {
							return `${tickValue} km/L`;
						}
						return tickValue;
					},
				},
			},
			yDist: {
				type: "linear",
				position: "right",
				title: {
					display: false,
				},
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					color: colors.axisText,
					font: {
						size: 14,
					},
					callback: function (tickValue: string | number) {
						if (typeof tickValue === "number" && tickValue === 0) {
							return `${tickValue} km`;
						}
						return tickValue;
					},
				},
			},
			yFuelAmount: {
				type: "linear",
				position: "left",
				title: {
					display: false,
				},
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					color: colors.axisText,
					font: {
						size: 14,
					},
					callback: function (tickValue: string | number) {
						if (typeof tickValue === "number" && tickValue === 0) {
							return `${tickValue} L`;
						}
						return tickValue;
					},
				},
			},
			yFuelCost: {
				type: "linear",
				position: "right",
				title: {
					display: false,
				},
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					color: colors.axisText,
					font: {
						size: 14,
					},
					callback: function (tickValue: string | number) {
						if (typeof tickValue === "number" && tickValue === 0) {
							return `${tickValue} 円`;
						}
						return tickValue;
					},
				},
			},
			x: {
				title: {
					display: true,
					text: "日付",
					color: colors.axisText,
					font: {
						size: 16,
					},
				},
				ticks: {
					color: colors.axisText,
					font: {
						size: 14,
					},
				},
			},
		},
	};

	return (
		<div
			style={{
				maxWidth: 1000,
				margin: "0 auto",
				padding: "20px",
				borderRadius: "8px",
			}}
		>
			<Chart type="bar" data={chartData} options={chartOptions} />
		</div>
	);
};

export default RefuelingChart;
