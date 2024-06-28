import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogoText } from "../text/LogoTextComponen";

const HeaderContainer = styled.div`
	display: flex;
	width: 100vw;
	height: 60px;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.colors.baseBackground};
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
