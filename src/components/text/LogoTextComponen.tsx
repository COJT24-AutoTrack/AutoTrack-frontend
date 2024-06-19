import styled from "styled-components";

export const LogoText = styled.span`
	font-size: ${(props) => props.theme.fontSizes.logo};
	font-family: ${(props) => props.theme.fontFamily.primary};
	justify-content: center;
	align-content: center;

	&::before {
		content: "Auto";
		color: ${(props) => props.theme.colors.textPrimary};
	}

	&::after {
		content: "Track";
		color: ${(props) => props.theme.colors.textSecondary};
	}
`;
