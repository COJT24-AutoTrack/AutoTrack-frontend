export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import CarComponent from "@/components/car/CarComponent";

const CarPage = async ({ params }: { params: { carId: number } }) => {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	if (params.carId) {
		return notFound();
	}

	return <CarComponent carId={params.carId} tokens={tokens} />;
};

export default CarPage;
