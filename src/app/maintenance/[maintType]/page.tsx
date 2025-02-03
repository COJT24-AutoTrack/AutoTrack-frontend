export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { MaintType } from "@/api/models/models";
import { clientConfig, serverConfig } from "@/../config";
import MaintenanceItemPageContent from "@/components/maintenance/MaintenanceItemPageContent";

interface Params {
	carId: string;
	maintType: MaintType;
}

const MaintenanceItemPage = async ({ params }: { params: Promise<Params> }) => {
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

	const { maintType } = await params;

	return (
		<MaintenanceItemPageContent
			maintType={decodeURIComponent(maintType) as MaintType}
			tokens={tokens}
			userCars={userCars}
		/>
	);
};

export default MaintenanceItemPage;
