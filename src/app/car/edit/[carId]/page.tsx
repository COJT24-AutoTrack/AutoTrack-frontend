export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import CarEditComponent from "@/components/car/CarEditComponent";

const CarEditPage = async ({ params }: { params: { carId: number } }) => {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		console.error("Not signed in");
		return notFound();
	}

	if (!params.carId) {
		return notFound();
	} else {
		console.log(params.carId);
	}

	return (
		<div>
			<CarEditComponent carId={params.carId} tokens={tokens} />
		</div>
	);
};

export default CarEditPage;
