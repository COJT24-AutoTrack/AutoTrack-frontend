import styled from "styled-components";

interface StyledButtonProps {
	label: string;
	onClick: () => void;
}

const Button = styled.button`
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

const MainButton: React.FC<StyledButtonProps> = ({ label, onClick }) => {
	return <Button onClick={onClick}>{label}</Button>;
};

export default MainButton;
