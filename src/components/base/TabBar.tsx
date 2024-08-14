import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import { media } from "@/styles/breakpoints";
import { Fuel, Gauge, House, Wrench } from "lucide-react";

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
`;

const TabBarItem = styled.a<{ isActive: boolean }>`
	color: ${(props) => props.theme.colors.textPrimary};
	text-decoration: none;
	display: flex;
	align-items: center;
	transition: color 0.3s;
	flex: 1;
	${media.SP} {
		font-size: min(16px, 3dvw);
		flex-direction: column;
	}
	${media.PC} {
		font-size: ${(props) => props.theme.fontSizes.subContent};
		flex-direction: row;
		gap: 8px;
	}

	${(props) => props.isActive && activeStyle}
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
				{currentPath === "/" ? <House color="red" /> : <House />}
				Home
			</TabBarItem>
			<TabBarItem
				href="/refueling"
				isActive={currentPath.startsWith("/refueling")}
			>
				{currentPath.startsWith("/refueling") ? <Fuel color="red" /> : <Fuel />}
				Refueling
			</TabBarItem>
			<TabBarItem
				href="/maintenance"
				isActive={currentPath.startsWith("/maintenance")}
			>
				{currentPath.startsWith("/maintenance") ? (
					<Wrench color="red" />
				) : (
					<Wrench />
				)}
				Maintenance
			</TabBarItem>
			<TabBarItem href="/tuning" isActive={currentPath.startsWith("/tuning")}>
				{currentPath.startsWith("/tuning") ? <Gauge color="red" /> : <Gauge />}
				Tuning
			</TabBarItem>
		</TabBarContainer>
	);
};

export default TabBar;
