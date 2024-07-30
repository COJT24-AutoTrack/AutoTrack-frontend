import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import { ClientAPI } from "@/api/clientImplement";
import { FuelEfficiency } from "@/api/models/models";
import UpdateRefueling from "@/components/refueling/UpdateRefueling";

export default async function UpdateFuelingPage() {
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
	const fuelEfficiencies: FuelEfficiency[] =
		await clientAPI.fuelEfficiency.getFuelEfficiencies();

	return (
		<UpdateRefueling fuelEfficiencies={fuelEfficiencies} token={tokens.token} />
	);
}
