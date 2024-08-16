export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { MaintType } from "@/api/models/models";
import { notFound } from "next/navigation";
import AddTuningPageContent from "@/components/tuning/AddTuningPage";
import { clientConfig, serverConfig } from "@/../config";
import { ClientAPI } from "@/api/clientImplement";

const AddTuningPage = async () => {
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

	const userCars = await clientAPI.user.getUserCars({
		firebase_user_id: tokens.decodedToken.uid,
	});

	if (!userCars) {
		return notFound();
	}

	const maintTypes: MaintType[] = Object.values(MaintType);

	return <AddTuningPageContent userCars={userCars} tokens={tokens} />;
};

export default AddTuningPage;
