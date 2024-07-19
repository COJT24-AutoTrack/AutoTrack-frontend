export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";
import HomeClient from "@/components/HomeClient";
import { createClientAPI } from "@/api/clientImplement";

export default async function Home() {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		notFound();
	}

	const clientAPI = createClientAPI();

	// todo: api接続
	const response = await clientAPI.user.getCars({
		user_id: tokens.decodedToken.uid,
	});

	if (!response) {
		notFound();
	}

	if (response) return <HomeClient userCars={response} />;
}
