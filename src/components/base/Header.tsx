import styled from "styled-components";
import Link from "next/link";
import { LogoText } from "@/components/text/LogoTextComponent";
import { media } from "@/styles/breakpoints";
import { usePCQuery } from "@/hooks/useBreakpoints";
import TabBar from "@/components/base/TabBar";

const HeaderContainer = styled.div`
	display: flex;
	width: 100vw;
	align-items: center;
	background-color: ${(props) => props.theme.colors.baseBackground};
	${media.SPandTB} {
		height: 60px;
		justify-content: center;
	}
	${media.PC} {
		height: 80px;
		justify-content: left;
	}
`;

const LogoTextWrapper = styled.div`
	${media.PC} {
		padding: 0 5dvw;
	}
`;

const Header = () => {
	return (
		<HeaderContainer>
			<Link href="/" passHref>
				<LogoTextWrapper>
					<LogoText />
				</LogoTextWrapper>
			</Link>
			{usePCQuery() && <TabBar />}
		</HeaderContainer>
	);
};

export default Header;
