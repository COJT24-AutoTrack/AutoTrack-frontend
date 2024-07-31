import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import HomeIcon from "../../public/icons/HomeIcon.svg";
import RefuelingIcon from "../../public/icons/RefuelingIcon.svg";
import MaintenaneIcon from "../../public/icons/MaintenanceIcon.svg";
import TuningIcon from "../../public/icons/TuningIcon.svg";
import { media } from "@/styles/breakpoints";

const TabBarContainer = styled.nav`
	background-color: ${(props) => props.theme.colors.baseBackground};
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding-top: 20px;
	padding-bottom: 14px;
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
	align-items: center;
	transition: color 0.3s;
	${media.SP} {
		font-size: ${(props) => props.theme.fontSizes.subsubContent};
		flex-direction: column;
	}
	${media.PC} {
		font-size: ${(props) => props.theme.fontSizes.subContent};
		flex-direction: row;
		gap: 8px;
	}

	${(props) => props.isActive && activeStyle}

	svg {
		width: 24px;
		height: 24px;
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
