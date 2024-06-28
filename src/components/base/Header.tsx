import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoText } from "../text/LogoTextComponen";
import { media } from "../../styles/breakpoints";

const HeaderContainer = styled.div`
	${media.SP} {
		display: flex;
		width: 100vw;
		height: 60px;
		justify-content: center;
		align-items: center;
		background-color: ${(props) => props.theme.colors.baseBackground};
	}
	${media.PC} {
		display: flex;
		width: 100vw;
		height: 80px;
		justify-content: left;
		align-items: center;
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
