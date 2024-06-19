import styled from "styled-components";

const Main = styled.main`
	display: flex;
	width: 100vw;
	height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 16px;
	background-color: ${(props) => props.theme.colors.background};
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
	background-color: ${(props) => props.theme.colors.cardBackground};
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 32px;
	gap: 15px;
`;

export { Main, Container };
