"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="jp">
			<body>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
