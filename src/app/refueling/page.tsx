import { createClientAPI } from "@/api/clientImplement";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { notFound } from "next/navigation";
import Refueling from "@/components/refueling/Refueling";

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

	const clientAPI = createClientAPI(tokens.token);

	const response = await clientAPI.user.getCars({
		user_id: tokens.decodedToken.uid,
	});

	if (!response) {
		return notFound();
	}

	return <Refueling userCars={response} userId={tokens.decodedToken.uid} />;
};

export default RefuelingPage;
