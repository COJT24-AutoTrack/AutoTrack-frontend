export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { ClientAPI } from "@/api/clientImplement";
import { Maintenance, MaintType } from "@/api/models/models";
import { notFound } from "next/navigation";
import AddMaintenancePageContent from "@/components/maintenance/AddMaintenance";
import { clientConfig, serverConfig } from "../../../../../../config";

interface Params {
	carId: string;
	maintType: string;
}

const AddMaintenancePage = async ({ params }: { params: Params }) => {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	const maintTypes: MaintType[] = Object.values(MaintType);

	return (
		<AddMaintenancePageContent
			carId={Number(params.carId)}
			token={tokens.token}
			maintTypes={maintTypes}
		/>
	);
};

export default AddMaintenancePage;
