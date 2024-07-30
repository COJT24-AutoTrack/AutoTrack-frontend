import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import AddCarPageComponent from "@/components/auth/RegisterForm";

const AddCarPage = async () => {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		return <p>Token not found</p>;
	}

	return <AddCarPageComponent tokens={tokens} />;
};

export default AddCarPage;
