import React from "react";
import { AppProps } from "next/app";
import { SelectedCarProvider } from "@/context/selectedCarContext";

const CarContext = ({ Component, pageProps }: AppProps) => {
	return (
		<SelectedCarProvider>
			<Component {...pageProps} />
		</SelectedCarProvider>
	);
};

export default CarContext;
