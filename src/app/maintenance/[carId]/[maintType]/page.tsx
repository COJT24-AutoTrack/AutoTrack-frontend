export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { Maintenance } from "@/api/models/models";
import { clientConfig, serverConfig } from "../../../../../config";
import MaintenanceItemPageContent from "@/components/maintenance/MaintenanceItemPageContent";

interface Params {
	carId: number;
	maintType: string;
}

const MaintenanceItemPage = async ({ params }: { params: Params }) => {
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
	const maintenances: Maintenance[] = await clientAPI.car.getCarMaintenance({
		car_id: Number(params.carId),
	});

	const filteredMaintenances = maintenances.filter(
		(maintenance) =>
			maintenance.maint_type === decodeURIComponent(params.maintType),
	);

	return (
		<MaintenanceItemPageContent
			maintenances={filteredMaintenances}
			maintType={params.maintType}
			carId={params.carId}
			token={tokens.token}
		/>
	);
};

export default MaintenanceItemPage;
