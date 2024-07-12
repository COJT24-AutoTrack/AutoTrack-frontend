import styled from "styled-components";
import Link from "next/link";
import { LogoText } from "../text/LogoTextComponen";
import { media } from "../../styles/breakpoints";

const HeaderContainer = styled.div`
	display: flex;
	width: 100vw;
	align-items: center;
	${media.SP} {
		height: 60px;
		justify-content: center;
		background-color: ${(props) => props.theme.colors.baseBackground};
	}
	${media.PC} {
		height: 80px;
		justify-content: left;
		padding-left: 20px;
		background-color: ${(props) => props.theme.colors.baseBackground};
	}
`;

const Header = () => {
	return (
		<HeaderContainer>
			<Link href="/" passHref>
				<LogoText />
			</Link>
		</HeaderContainer>
	);
};

export default Header;
