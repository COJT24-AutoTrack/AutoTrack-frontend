import styled from "styled-components";

export const TitleText = styled.h1`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.title};
	font-family: ${(props) => props.theme.fontFamily.primary};
`;

export const ContentText = styled.p`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.content};
	font-family: ${(props) => props.theme.fontFamily.primary};
`;

export const SubContentText = styled.p`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.subContent};
	font-family: ${(props) => props.theme.fontFamily.primary};
`;

export const SubSubContentText = styled.p`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.subsubContent};
	font-family: ${(props) => props.theme.fontFamily.primary};
`;
