import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import { notFound } from "next/navigation";
import AddRefueling from "@/components/refueling/AddRefueling";

export default async function AddRefuelingPage({
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

	return <AddRefueling tokens={tokens} carId={car_id} />;
}