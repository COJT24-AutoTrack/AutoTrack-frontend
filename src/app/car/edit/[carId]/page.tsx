export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import CarEditComponent from "@/components/car/CarEditComponent";

const CarEditPage = async ({
	params,
}: {
	params: Promise<{ carId: string }>;
}) => {
	const tokens = await getTokens(await cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		console.error("Not signed in");
		return notFound();
	}

	const { carId } = await params;

	if (!carId) {
		return notFound();
	}

	return (
		<div>
			<CarEditComponent carId={carId} tokens={tokens} />
		</div>
	);
};

export default CarEditPage;
