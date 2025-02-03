import React from "react";
import { AppProps } from "next/app";
import { CarProvider } from "@/context/carContext";

const CarContext = ({ Component, pageProps }: AppProps) => {
	return (
		<CarProvider>
			<Component {...pageProps} />
		</CarProvider>
	);
};

export default CarContext;
