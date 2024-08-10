export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/../../config";
import { notFound } from "next/navigation";
import TuningPageComponent from "@/components/tuning/TuningPageComponent";
import { ClientAPI } from "@/api/clientImplement";

const TuningPage = async () => {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	const clientAPI = ClientAPI(tokens.token);

	const response = await clientAPI.user.getUserCars({
		firebase_user_id: tokens.decodedToken.uid,
	});

	if (!response) {
		return notFound();
	}

	return <TuningPageComponent userCars={response} tokens={tokens} />;
};

export default TuningPage;
