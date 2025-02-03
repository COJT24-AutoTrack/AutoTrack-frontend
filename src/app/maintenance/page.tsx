export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { clientConfig, serverConfig } from "@/../config";
import MaintenanceComponent from "@/components/maintenance/MaintenanceComponent";
import { useSelectedCarContext } from "@/context/selectedCarContext";

const MaintenancePage = async () => {
	const { userCars } = useSelectedCarContext();
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return notFound();
	}

	if (!userCars) {
		return notFound();
	}

	return <MaintenanceComponent userCars={userCars} tokens={tokens} />;
};

export default MaintenancePage;
