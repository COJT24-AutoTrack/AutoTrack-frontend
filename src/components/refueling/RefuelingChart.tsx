"use client";

import React from "react";
import { usePCQuery } from "@/hooks/useBreakpoints";
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

const RefuelingChart: React.FC<RefuelingChartProps> = ({ fuelEfficiencies }) => {
	const isPC = usePCQuery(); // PC かどうかを判定

	const colors = {
		fuelEfficiency: "#EA4335",
		fuelEfficiencyTransparent: "#EA4335CC",
		cumulativeDistance: "#34A853",
		cumulativeDistanceTransparent: "#34A853CC",
		distanceSinceLastRefuel: "#22537466",
		distanceSinceLastRefuelTransparent: "#22537466",
		fuelAmount: "#4285F4",
		fuelAmountTransparent: "#4285F4CC",
		fuelCost: "#FBBC05",
		fuelCostTransparent: "#FBBC05CC",
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
				label: "燃費",
				data: dataFuelEfficiency,
				borderColor: colors.fuelEfficiency,
				backgroundColor: colors.fuelEfficiencyTransparent,
				yAxisID: "yFe",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "累計走行距離",
				data: dataDistance,
				borderColor: colors.cumulativeDistance,
				backgroundColor: colors.cumulativeDistanceTransparent,
				yAxisID: "yDist",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "走行距離",
				data: dataDistanceSinceLastRefuel,
				borderColor: colors.distanceSinceLastRefuel,
				backgroundColor: colors.distanceSinceLastRefuelTransparent,
				yAxisID: "yDist",
				type: "bar",
			},
			{
				label: "給油量",
				data: dataFuelAmount,
				borderColor: colors.fuelAmount,
				backgroundColor: colors.fuelAmountTransparent,
				yAxisID: "yFuelAmount",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "給油金額",
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
					usePointStyle: true,
					pointStyle: "circle",
					boxWidth: 6,
					boxHeight: 6,
					font: {
						size: isPC ? 14 : 8,
						weight: "bold",
					},
					color: colors.legendText,
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
				ticks: {
					display: isPC,
					color: colors.axisText,
					font: { size: 14 },
				},
			},
			yDist: {
				type: "linear",
				position: "right",
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					display: isPC,
					color: colors.axisText,
					font: { size: 14 },
				},
			},
			yFuelAmount: {
				type: "linear",
				position: "left",
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					display: isPC,
					color: colors.axisText,
					font: { size: 14 },
				},
			},
			yFuelCost: {
				type: "linear",
				position: "right",
				grid: {
					drawOnChartArea: false,
					color: colors.grid,
				},
				ticks: {
					display: isPC,
					color: colors.axisText,
					font: { size: 14 },
				},
			},
			x: {
				ticks: {
					display: isPC,
					color: colors.axisText,
					font: { size: 14 },
				},
			},
		},
	};

	return (
		<div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px", borderRadius: "8px" }}>
			<Chart type="bar" data={chartData} options={chartOptions} />
		</div>
	);
};

export default RefuelingChart;
