export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { notFound } from "next/navigation";
import Refueling from "@/components/refueling/Refueling";
import { ClientAPI } from "@/api/clientImplement";

const RefuelingPage = async () => {
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

	return (
		<Refueling
			userCars={response}
			token={tokens.token}
			userId={tokens.decodedToken.uid}
		/>
	);
};

export default RefuelingPage;
