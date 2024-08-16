import { Car } from "@/api/models/models";
import styled from "styled-components";
import { ContentText } from "../text/TextComponents";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Container = styled.div`
	display: flex;
	height: 60px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	background: #2b2b2b;
	padding: 0 20px;
`;

const ChangeIconContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ChangeCarButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
`;

interface CarSelectProps {
	userCars: Car[] | null;
	selectedCarIndex: number;
	switchCar: () => void;
}

const CarSelect: React.FC<CarSelectProps> = ({
	userCars,
	selectedCarIndex,
	switchCar,
}) => {
	if (!userCars || userCars.length === 0) {
		return <Container>車が見つかりません</Container>;
	}

	return (
		<Container>
			<ChangeIconContainer>
				<ChangeCarButton onClick={switchCar}>
					<ChevronLeftIcon />
				</ChangeCarButton>
			</ChangeIconContainer>
			<ContentText>{userCars[selectedCarIndex]?.car_name}</ContentText>
			<ChangeIconContainer>
				<ChangeCarButton onClick={switchCar}>
					<ChevronRightIcon />
				</ChangeCarButton>
			</ChangeIconContainer>
		</Container>
	);
};

export default CarSelect;