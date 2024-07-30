import { carInfo } from "@/api/models/models";
import styled from "styled-components";
import BackIcon from "../../public/icons/BackIcon.svg";
import { ContentText } from "../text/TextComponents";
import { useRouter } from "next/navigation";

const TopBar = styled.div`
	width: 100vw;
	height: 50px;
	padding-left: 10px;
	display: flex;
	align-items: center;
	background-color: #2b2b2b;
`;

const BackButton = styled.button`
	display: flex;
	align-items: center;
	background: none;
	border: none;
	color: white;
	cursor: pointer;

	svg {
		transform: rotate(180deg);
		fill: white;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
`;

interface BackHeaderProps {
	route: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ route }) => {
	const router = useRouter();
	return (
		<TopBar>
			<BackButton onClick={() => router.push(route)}>
				<BackIcon style={{ fill: "white" }} />
				<ContentText>戻る</ContentText>
			</BackButton>
		</TopBar>
	);
};

export default BackHeader;
