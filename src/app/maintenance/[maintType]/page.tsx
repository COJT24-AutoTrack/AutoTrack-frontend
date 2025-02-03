export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { MaintType } from "@/api/models/models";
import { clientConfig, serverConfig } from "@/../config";
import MaintenanceItemPageContent from "@/components/maintenance/MaintenanceItemPageContent";
import { useSelectedCarContext } from "@/context/selectedCarContext";

interface Params {
	carId: string;
	maintType: MaintType;
}

const MaintenanceItemPage = async ({ params }: { params: Params }) => {
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

	return (
		<MaintenanceItemPageContent
			maintType={decodeURIComponent(params.maintType) as MaintType}
			tokens={tokens}
			userCars={userCars}
		/>
	);
};

export default MaintenanceItemPage;
