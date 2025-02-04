export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "@/../config";
import { notFound } from "next/navigation";
import AddRefueling from "@/components/refueling/AddRefueling";

export default async function AddRefuelingPage({
	params,
}: {
	params: Promise<{ carId: string }>;
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

	const { carId } = await params;

	return <AddRefueling tokens={tokens} carId={carId} />;
}
