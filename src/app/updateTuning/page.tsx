import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../../config";
import { ClientAPI } from "@/api/clientImplement";
import { Tuning } from "@/api/models/models";
import UpdateTuning from "@/components/tuning/UpdateTuning";

export default async function UpdateTuningPage() {
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
	const tunings: Tuning[] = await clientAPI.tuning.getTunings();

	return <UpdateTuning tunings={tunings} token={tokens.token} />;
}