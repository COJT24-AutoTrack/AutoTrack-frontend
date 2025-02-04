export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import CarComponent from "@/components/car/CarComponent";

const CarPage = async ({ params }: { params: Promise<{ carId: string }> }) => {
	const tokens = await getTokens(await cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	const { carId } = await params;

	if (!tokens) {
		console.error("Not signed in");
		return notFound();
	}

	if (!carId) {
		return notFound();
	}

	return (
		<div>
			<CarComponent carId={carId} tokens={tokens} />
		</div>
	);
};

export default CarPage;
