import styled from "styled-components";
import Link from "next/link";
import { LogoText } from "../text/LogoTextComponen";
import { media } from "../../styles/breakpoints";
import { usePCQuery } from "@/hooks/useBreakpoints";
import TabBar from "./TabBar";

const HeaderContainer = styled.div`
	display: flex;
	width: 100vw;
	align-items: center;
	background-color: ${(props) => props.theme.colors.baseBackground};
	${media.SP} {
		height: 60px;
		justify-content: center;
	}
	${media.PC} {
		height: 80px;
		justify-content: left;
		padding-left: 5dvw;
	}
`;

const Header = () => {
	return (
		<HeaderContainer>
			<Link href="/" passHref>
				<LogoText />
			</Link>
			{usePCQuery() && <TabBar />}
		</HeaderContainer>
	);
};

export default Header;
