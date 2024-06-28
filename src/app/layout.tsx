"use client";

import Layout from "@/components/base/Layout";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import theme from "../styles/theme";
import { ThemeProvider } from "styled-components";
import "../styles/GlobalStyle.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const noLayoutPages = ["/login", "/signup"];
	const shouldUseLayout = !noLayoutPages.includes(pathname);

	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={theme}>
					{shouldUseLayout ? <Layout>{children}</Layout> : children}
				</ThemeProvider>
			</body>
		</html>
	);
}
