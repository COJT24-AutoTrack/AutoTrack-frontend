import styled from "styled-components";
import Link from "next/link";

export const FormContainer = styled.div`
	display: flex;
	padding: 20px;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 3dvh;
`;

export const FormElementContainer = styled.div`
	display: flex;
	padding: 10px 0px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
`;

export const BigLabel = styled.label`
	display: block;
	font-size: 24px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.textPrimary};
`;

export const Label = styled.label`
	display: block;
	font-size: 14px;
	font-weight: 500;
	margin-bottom: 0.5rem;
	color: ${(props) => props.theme.colors.textSecondary};
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;

export const Button = styled.button`
	background-color: #f12424;
	color: white;
	border: none;
	border-radius: 8px;
	padding: 10px 20px;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d91e1e;
	}

	&:active {
		background-color: #b91919;
	}
`;

export const Select = styled.select`
	padding: 8px;
	font-size: 16px;
`;

export const Input = styled.input`
	width: 100%;
	padding: 12px;
	background-color: ${(props) => props.theme.colors.baseBackground};
	color: ${(props) => props.theme.colors.textPrimary};
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	font-size: 14px;
`;

export const ErrorMessage = styled.div`
	color: ${(props) => props.theme.colors.textSecondary};
	padding: 12px;
	border-radius: 4px;
	margin-top: 8px;
`;

export const Paragraph = styled.p`
	font-size: 14px;
	text-align: center;
	color: ${(props) => props.theme.colors.textPrimary};
	margin-top: 16px;
`;

export const StyledLink = styled(Link)`
	font-weight: 500;
	color: ${(props) => props.theme.colors.link};
	text-decoration: none;
`;
