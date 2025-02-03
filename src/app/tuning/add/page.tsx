export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { MaintType } from "@/api/models/models";
import { notFound } from "next/navigation";
import AddTuningPageContent from "@/components/tuning/AddTuningPage";
import { clientConfig, serverConfig } from "@/../config";
import { useSelectedCarContext } from "@/context/selectedCarContext";

const AddTuningPage = async () => {
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

	const maintTypes: MaintType[] = Object.values(MaintType);

	return <AddTuningPageContent userCars={userCars} tokens={tokens} />;
};

export default AddTuningPage;
