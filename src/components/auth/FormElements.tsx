import styled from "styled-components";
import Link from "next/link";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.textPrimary};
`;

const Input = styled.input`
	width: 100%;
	padding: 12px;
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	font-size: 14px;
`;

const ErrorMessage = styled.div`
	color: ${(props) => props.theme.colors.textSecondary};
	padding: 12px;
	border-radius: 4px;
	margin-top: 8px;
`;

const Button = styled.button`
	width: 100%;
	padding: 12px;
	border: none;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.buttonBackground};
	color: ${(props) => props.theme.colors.textPrimary};
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	margin-top: 16px;

	&:hover {
		background-color: ${(props) => props.theme.colors.buttonHoverBackground};
	}
`;

const Paragraph = styled.p`
	font-size: 14px;
	text-align: center;
	color: ${(props) => props.theme.colors.textPrimary};
	margin-top: 16px;
`;

const StyledLink = styled(Link)`
	font-weight: 500;
	color: ${(props) => props.theme.colors.link};
	text-decoration: none;
`;

export { Form, Label, Input, ErrorMessage, Button, Paragraph, StyledLink };
