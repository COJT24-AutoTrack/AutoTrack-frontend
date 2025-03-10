import React from "react";
import styled from "styled-components";
import { Anton } from "next/font/google";
import { FuelEfficiency } from "@/api/models/models";
import { useRouter } from "next/navigation";
import {
	Calendar,
	ChevronRight,
	JapaneseYen,
	Droplets,
	Fuel,
	Navigation,
} from "lucide-react";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 8px;
	border: 1px solid #fff;
	background: #2b2b2b;
	position: relative;
	padding: 10px 0 10px 10px;
	gap: 2dvw;
	width: min(93dvw, 860px);
`;

const FuelEfficiencySection = styled.div`
	padding: 10px 10px 10px 0px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8px;
	flex: 4;
	gap: 10px;
	svg {
		width: min(6dvw, 30px);
		height: min(6dvw, 30px);
	}
`;

const FuelEfficiencyContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const FuelEfficiencyLabel = styled.p`
	color: #fff;
	font-size: min(3dvw, 15px);
`;

const FuelEfficiencyValue = styled.div`
	display: flex;
	align-items: baseline;
	color: #fff;
	gap: 2px;
`;

const FuelEfficiencyNumber = styled.span`
	font-weight: bold;
	line-height: 1;
	font-size: min(6dvw, 30px);
`;

const FuelEfficiencyUnit = styled.span``;

const MetricItemContainer = styled.div`
	flex: 8;
	display: flex;
	flex-direction: column;
	@media (min-width: 700px) {
		flex-direction: row;
	}
	gap: max(10px, 2dvw);
`;

const MetricItemRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: max(10px, 2dvw);
`;

const MetricItem = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const MetricIcon = styled.div`
	svg {
		width: min(3dvw, 20px);
		height: min(3dvw, 20px);
	}
`;

const MetricContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const MetricLabel = styled.p`
	color: #999;
	font-size: min(3dvw, 13px);
`;

const MetricValue = styled.p`
	color: #fff;
	font-size: min(3dvw, 14px);
	white-space: nowrap;
`;

const NextPageButton = styled.button`
	flex: 0.25;
	padding: 0;
	background: none;
	border: none;
	color: white;
	cursor: pointer;
`;

interface RefuelingCardProps {
	fuelEfficiency?: FuelEfficiency;
	deltaMileage?: number | null;
	calculatedFuelEfficiency?: number | null;
}

const RefuelingCard: React.FC<RefuelingCardProps> = ({
	fuelEfficiency,
	deltaMileage,
	calculatedFuelEfficiency,
}) => {
	const router = useRouter();

	const handleDetailClick = () => {
		if (fuelEfficiency) {
			window.location.href = `refueling/update/${fuelEfficiency.fe_id}`;
		}
	};

	return (
		<Container>
			<FuelEfficiencySection className={Anton400.className}>
				<Droplets color="white" />
				<FuelEfficiencyContent>
					<FuelEfficiencyLabel>燃費</FuelEfficiencyLabel>
					<FuelEfficiencyValue>
						<FuelEfficiencyNumber>
							{fuelEfficiency &&
							calculatedFuelEfficiency &&
							fuelEfficiency.fe_amount > 0
								? calculatedFuelEfficiency.toFixed(2)
								: "0.00"}
						</FuelEfficiencyNumber>
						<FuelEfficiencyUnit>km/L</FuelEfficiencyUnit>
					</FuelEfficiencyValue>
				</FuelEfficiencyContent>
			</FuelEfficiencySection>

			<MetricItemContainer>
				<MetricItemRow>
					<MetricItem>
						<MetricIcon>
							<Calendar color="#999" />
						</MetricIcon>
						<MetricContent>
							<MetricLabel>日付</MetricLabel>
							<MetricValue>
								{fuelEfficiency
									? new Date(fuelEfficiency.fe_date).toLocaleDateString()
									: ""}
							</MetricValue>
						</MetricContent>
					</MetricItem>
					<MetricItem>
						<MetricIcon>
							<Navigation color="#999" />
						</MetricIcon>
						<MetricContent>
							<MetricLabel>走行距離</MetricLabel>
							<MetricValue>
								{deltaMileage ? `${deltaMileage.toFixed(0)}km` : "0km"}
							</MetricValue>
						</MetricContent>
					</MetricItem>
				</MetricItemRow>
				<MetricItemRow>
					<MetricItem>
						<MetricIcon>
							<Fuel color="#999" />
						</MetricIcon>
						<MetricContent>
							<MetricLabel>給油量</MetricLabel>
							<MetricValue>
								{fuelEfficiency
									? `${fuelEfficiency.fe_amount.toFixed(2)}L`
									: ""}
							</MetricValue>
						</MetricContent>
					</MetricItem>
					<MetricItem>
						<MetricIcon>
							<JapaneseYen color="#999" />
						</MetricIcon>
						<MetricContent>
							<MetricLabel>給油金額</MetricLabel>
							<MetricValue>
								{fuelEfficiency
									? `${(fuelEfficiency.fe_amount * fuelEfficiency.fe_unitprice).toFixed(0)}円 (${fuelEfficiency.fe_unitprice}円/L)`
									: ""}
							</MetricValue>
						</MetricContent>
					</MetricItem>
				</MetricItemRow>
			</MetricItemContainer>

			<NextPageButton onClick={handleDetailClick}>
				<ChevronRight />
			</NextPageButton>
		</Container>
	);
};

export default RefuelingCard;
