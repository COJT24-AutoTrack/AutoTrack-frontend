"use client";

import React, { use, useState } from "react";
import styled from "styled-components";
import { usePCQuery } from "@/hooks/useBreakpoints";
import "chart.js/auto";
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
import { Car } from "@/api/models/models";

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
	carMileage: Car["car_mileage"];
}

const ChartContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FilterButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-bottom: 15px;
`;

const FilterButton = styled.button`
	background-color: #2b2b2b;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	transition: 0.2s;

	&:hover {
		background-color: #f12424;
	}
`;

const colors = {
	fuelEfficiency: "#EA4335",
	fuelEfficiencyTransparent: "#EA4335CC",
	cumulativeDistance: "#34A853",
	cumulativeDistanceTransparent: "#34A853CC",
	distanceSinceLastRefuel: "#225374",
	distanceSinceLastRefuelTransparent: "#22537466",
	fuelAmount: "#4285F4",
	fuelAmountTransparent: "#4285F4CC",
	fuelCost: "#FBBC05",
	fuelCostTransparent: "#FBBC05CC",
	fuelUnitPrice: "#ff8c00",
	fuelUnitPriceTransparent: "#ff8c00CC",
	averageFuelEfficiency: "#EA433544",
	averageFuelEfficiencyTranceparent: "#EA4335CC",
	legendText: "#999999",
	tooltipBackground: "#333333",
	tooltipTitle: "#999999",
	tooltipBody: "#999999",
	grid: "#444444",
	axisText: "#999999",
};

const now = new Date();

const oneMonthAgo = new Date(now.getTime());
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

const sixMonthsAgo = new Date(now.getTime());
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

const oneYearAgo = new Date(now.getTime());
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const RefuelingChart: React.FC<RefuelingChartProps> = ({
	fuelEfficiencies,
	carMileage,
}) => {
	const isPC = usePCQuery();
	const [filterRange, setFilterRange] = useState<"1M" | "6M" | "1Y" | "ALL">(
		"ALL",
	);

	const filteredData = fuelEfficiencies.filter((fe) => {
		const feDate = new Date(fe.fe_date);

		switch (filterRange) {
			case "1M":
				return feDate >= oneMonthAgo;
			case "6M":
				return feDate >= sixMonthsAgo;
			case "1Y":
				return feDate >= oneYearAgo;
			case "ALL":
			default:
				return true;
		}
	});

	const sortedAsc = [...filteredData].sort(
		(a, b) => new Date(a.fe_date).getTime() - new Date(b.fe_date).getTime(),
	);

	const labels: string[] = [];
	const dataFuelEfficiency: number[] = [];
	const dataDistanceSinceLastRefuel: number[] = [];
	const dataDistance: number[] = [];
	const dataFuelAmount: number[] = [];
	const dataFuelCost: number[] = [];
	const dataFuelUnitPrice: number[] = [];

	let prevMileage = carMileage;
	sortedAsc.forEach((fe, i) => {
		labels.push(fe.fe_date.slice(0, 10));

		dataDistance.push(fe.fe_mileage);

		const diff = fe.fe_mileage - prevMileage;
		dataDistanceSinceLastRefuel.push(diff);

		let feValue = 0;
		if (fe.fe_amount && fe.fe_amount > 0 && diff > 0) {
			feValue = diff / fe.fe_amount;
		}
		dataFuelEfficiency.push(feValue);

		dataFuelAmount.push(fe.fe_amount || 0);
		dataFuelCost.push(fe.fe_amount ? fe.fe_amount * fe.fe_unitprice : 0);
		dataFuelUnitPrice.push(fe.fe_unitprice);

		prevMileage = fe.fe_mileage;
	});

	const sumFE = dataFuelEfficiency.reduce((acc, val) => acc + val, 0);
	const averageFuelEfficiency =
		dataFuelEfficiency.length > 0 ? sumFE / dataFuelEfficiency.length : 0;

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
			{
				label: "単価",
				data: dataFuelUnitPrice,
				borderColor: colors.fuelUnitPrice,
				backgroundColor: colors.fuelUnitPriceTransparent,
				yAxisID: "yFuelCost",
				type: "line",
				fill: false,
				tension: 0.2,
			},
			{
				label: "平均燃費",
				data: Array(labels.length).fill(averageFuelEfficiency),
				borderColor: colors.averageFuelEfficiency,
				backgroundColor: colors.averageFuelEfficiencyTranceparent,
				yAxisID: "yFe",
				type: "line",
				fill: false,
				tension: 0,
				stepped: "before",
				borderDash: [5, 5],
				pointRadius: 0,
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
					padding: 20,
					font: { size: 14 },
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
		},
		scales: {
			yFe: {
				type: "linear",
				position: "left",
				ticks: {
					display: isPC,
					color: colors.axisText,
					callback: function (value) {
						return value === 0 ? "0 km/L" : value;
					},
				},
			},
			yDist: {
				type: "linear",
				position: "right",
				grid: { drawOnChartArea: false },
				ticks: {
					display: isPC,
					color: colors.axisText,
					callback: function (value) {
						return value === 0 ? "0 km" : value;
					},
				},
			},
			yFuelAmount: {
				type: "linear",
				position: "left",
				grid: { drawOnChartArea: false },
				ticks: {
					display: isPC,
					color: colors.axisText,
					callback: function (value) {
						return value === 0 ? "0 L" : value;
					},
				},
			},
			yFuelCost: {
				type: "linear",
				position: "right",
				grid: { drawOnChartArea: false },
				beginAtZero: false,
				ticks: {
					display: isPC,
					color: colors.axisText,
					callback: function (value) {
						return value === 0 ? "0 円" : value;
					},
				},
			},
			x: {
				ticks: { display: isPC, color: colors.axisText },
			},
		},
	};

	return (
		<ChartContainer>
			<FilterButtonContainer>
				<FilterButton onClick={() => setFilterRange("1M")}>1ヶ月</FilterButton>
				<FilterButton onClick={() => setFilterRange("6M")}>半年</FilterButton>
				<FilterButton onClick={() => setFilterRange("1Y")}>1年</FilterButton>
				<FilterButton onClick={() => setFilterRange("ALL")}>
					全期間
				</FilterButton>
			</FilterButtonContainer>

			<Chart type="bar" data={chartData} options={chartOptions} />
		</ChartContainer>
	);
};

export default RefuelingChart;
