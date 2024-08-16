import styled from "styled-components";
import { ContentText } from "@/components/text/TextComponents";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
			<BackButton onClick={() => (window.location.href = route)}>
				<ChevronRightIcon />
				<ContentText>戻る</ContentText>
			</BackButton>
		</TopBar>
	);
};

export default BackHeader;
