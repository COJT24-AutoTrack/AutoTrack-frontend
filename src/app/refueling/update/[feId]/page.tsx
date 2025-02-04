export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import UpdateRefueling from "@/components/refueling/UpdateRefueling";

export default async function UpdateFuelingPage({
	params,
}: {
	params: Promise<{ feId: string }>;
}) {
	const tokens = await getTokens(await cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	const { feId } = await params;

	return <UpdateRefueling feId={feId} tokens={tokens} />;
}
