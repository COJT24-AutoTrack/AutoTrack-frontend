export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import UpdateRefueling from "@/components/refueling/UpdateRefueling";

export default async function UpdateFuelingPage({
	params,
}: {
	params: { feId: string };
}) {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	return <UpdateRefueling feId={params.feId} tokens={tokens} />;
}
