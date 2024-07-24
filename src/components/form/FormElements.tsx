import styled from "styled-components";
import Link from "next/link";

const FormContainer = styled.div`
	display: flex;
	padding: 20px;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
`;

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const FormElementContainer = styled.div`
	display: flex;
	padding: 10px 0px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
`;

const BigLabel = styled.label`
	display: block;
	font-size: 24px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.textPrimary};
`;

const Label = styled.label`
	display: block;
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.textPrimary};
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
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

export {
	FormContainer,
	Form,
	BigLabel,
	FormElementContainer,
	ButtonsContainer,
	Label,
	Input,
	ErrorMessage,
	Button,
	Paragraph,
	StyledLink,
};
