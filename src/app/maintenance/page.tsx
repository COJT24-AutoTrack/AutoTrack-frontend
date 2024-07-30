export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { clientConfig, serverConfig } from "../../../config";
import MaintenanceComponent from "@/components/maintenance/MaintenanceComponent";

const MaintenancePage = async () => {
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

	return <MaintenanceComponent userCars={userCars} token={tokens.token} />;
};

export default MaintenancePage;
