export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/../../config";
import { notFound } from "next/navigation";
import TuningPageComponent from "@/components/tuning/TuningPageComponent";
import { useSelectedCarContext } from "@/context/selectedCarContext";

const TuningPage = async () => {
	const { userCars } = useSelectedCarContext();
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	if (!userCars) {
		return notFound();
	}

	return <TuningPageComponent userCars={userCars} tokens={tokens} />;
};

export default TuningPage;
