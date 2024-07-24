import styled from "styled-components";

export const TitleText = styled.h1`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.title};
`;

export const ContentText = styled.p`
	margin: 0;
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.content};
`;

export const SubContentText = styled.p`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.subContent};
`;

export const SubSubContentText = styled.p`
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: ${(props) => props.theme.fontSizes.subsubContent};
`;
