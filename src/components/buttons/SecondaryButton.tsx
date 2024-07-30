import styled from "styled-components";

interface StyledButtonProps {
	label: string;
}

const Button = styled.button`
	background-color: #818181;
	color: white;
	border: none;
	border-radius: 10px;
	padding: 10px 20px;
	font-size: 18px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #6b6b6b;
	}

	&:active {
		background-color: #4d4d4d;
	}
`;

const SecondaryButton: React.FC<StyledButtonProps> = ({ label }) => {
	return <Button>{label}</Button>;
};

export default SecondaryButton;
