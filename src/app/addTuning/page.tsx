import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { notFound } from "next/navigation";
import AddTuning from "@/components/tuning/AddTuning";

export default async function AddTuningPage({
	searchParams,
}: {
	searchParams: { car_id: string };
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

	const { car_id } = searchParams;

	return <AddTuning tokens={tokens} carId={car_id} />;
}