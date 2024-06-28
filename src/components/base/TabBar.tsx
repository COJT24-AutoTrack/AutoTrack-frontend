import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import HomeIcon from "../../public/icons/HomeIcon.svg";
import RefuelingIcon from "../../public/icons/RefuelingIcon.svg";
import MaintenaneIcon from "../../public/icons/MaintenanceIcon.svg";
import TuningIcon from "../../public/icons/TuningIcon.svg";

const TabBarContainer = styled.nav`
	background-color: ${(props) => props.theme.colors.baseBackground};
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 16px 0;
	width: 100vw;
`;

const activeStyle = css`
	color: ${(props) => props.theme.colors.link};
	svg {
		fill: ${(props) => props.theme.colors.link};
	}
`;

const TabBarItem = styled.a<{ isActive: boolean }>`
	color: ${(props) => props.theme.colors.textPrimary};
	text-decoration: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: ${(props) => props.theme.fontFamily.primary};
	font-size: ${(props) => props.theme.fontSizes.subsubContent};
	transition: color 0.3s;

	${(props) => props.isActive && activeStyle}

	svg {
		width: 24px;
		height: 24px;
		margin-bottom: 8px;
		fill: ${(props) =>
			props.isActive
				? props.theme.colors.link
				: props.theme.colors.textPrimary};
	}
`;

const TabBar = () => {
	const router = useRouter();
	const [currentPath, setCurrentPath] = useState<string>("");

	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, [router]);

	return (
		<TabBarContainer>
			<TabBarItem href="/" isActive={currentPath === "/"}>
				<HomeIcon />
				Home
			</TabBarItem>
			<TabBarItem href="/refueling" isActive={currentPath === "/refueling"}>
				<RefuelingIcon />
				Refueling
			</TabBarItem>
			<TabBarItem href="/maintenance" isActive={currentPath === "/maintenance"}>
				<MaintenaneIcon />
				Maintenance
			</TabBarItem>
			<TabBarItem href="/tuning" isActive={currentPath === "/tuning"}>
				<TuningIcon />
				Tuning
			</TabBarItem>
		</TabBarContainer>
	);
};

export default TabBar;
