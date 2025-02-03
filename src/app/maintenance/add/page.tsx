export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { MaintType } from "@/api/models/models";
import { notFound } from "next/navigation";
import AddMaintenancePageContent from "@/components/maintenance/AddMaintenance";
import { clientConfig, serverConfig } from "@/../config";
import { ClientAPI } from "@/api/clientImplement";

interface Params {
	maintType: string;
}

const AddMaintenancePage = async () => {
	const tokens = await getTokens(await cookies(), {
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

	return (
		<AddMaintenancePageContent
			userCars={userCars}
			tokens={tokens}
			maintTypes={maintTypes}
		/>
	);
};

export default AddMaintenancePage;
