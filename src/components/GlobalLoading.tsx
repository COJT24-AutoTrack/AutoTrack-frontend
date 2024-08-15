import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

const LoadingOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Spinner = styled.div`
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const LoadingText = styled.p`
	color: white;
	margin-top: 10px;
	font-size: 18px;
`;

const Loading = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const GlobalLoading = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => setLoading(true);
		const handleComplete = () => setLoading(false);

		window.addEventListener("beforeunload", handleStart);
		window.addEventListener("load", handleComplete);

		return () => {
			window.removeEventListener("beforeunload", handleStart);
			window.removeEventListener("load", handleComplete);
		};
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [pathname, searchParams]);

	return loading ? (
		<LoadingOverlay>
			<Loading>
				<Spinner />
				<LoadingText>Loading...</LoadingText>
			</Loading>
		</LoadingOverlay>
	) : null;
};

export default GlobalLoading;
