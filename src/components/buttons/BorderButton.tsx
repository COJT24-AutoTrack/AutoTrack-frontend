import styled from "styled-components";

interface StyledButtonProps {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
}

const Button = styled.button`
	background-color: transparent;
	color: white;
	border: 2px solid #f12424;
	border-radius: 10px;
	padding: 10px 20px;
	font-size: 18px;
	cursor: pointer;
	transition:
		background-color 0.3s,
		color 0.3s;

	&:hover {
		background-color: #f12424;
		color: white;
	}

	&:active {
		background-color: #d91e1e;
		color: white;
	}
`;

const BorderButton: React.FC<StyledButtonProps> = ({
	label,
	onClick,
	type = "button",
}) => {
	return (
		<Button onClick={onClick} type={type}>
			{label}
		</Button>
	);
};

export default BorderButton;
