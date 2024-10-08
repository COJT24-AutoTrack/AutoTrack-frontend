"use client";

import Home from "@/components/base/Home";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import theme from "../styles/theme";
import { ThemeProvider } from "styled-components";
import "../styles/GlobalStyle.css";
import GlobalLoading from "@/components/GlobalLoading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const noLayoutPages = ["/signin", "/signup"];
	const shouldUseLayout = !noLayoutPages.includes(pathname);

	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={theme}>
					<Suspense>
						<GlobalLoading />
					</Suspense>
					{shouldUseLayout ? <Home>{children}</Home> : children}
				</ThemeProvider>
			</body>
		</html>
	);
}