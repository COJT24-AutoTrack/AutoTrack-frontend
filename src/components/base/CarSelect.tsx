import { Car } from "@/api/models/models";
import styled from "styled-components";
import BackIcon from "@/../public/icons/BackIcon.svg";
import { ContentText } from "../text/TextComponents";

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
		fill: white;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
`;

const ChangeCarLeftButton = styled(ChangeCarButton)`
	svg {
		transform: rotate(180deg);
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
				<ChangeCarLeftButton onClick={switchCar}>
					<BackIcon style={{ fill: "white" }} />
				</ChangeCarLeftButton>
			</ChangeIconContainer>
			<ContentText>{userCars[selectedCarIndex]?.car_name}</ContentText>
			<ChangeIconContainer>
				<ChangeCarButton onClick={switchCar}>
					<BackIcon style={{ fill: "white" }} />
				</ChangeCarButton>
			</ChangeIconContainer>
		</Container>
	);
};

export default CarSelect;
