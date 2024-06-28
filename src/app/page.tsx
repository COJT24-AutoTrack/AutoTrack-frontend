import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";
import HomeClient from "@/components/HomeClient";
import { Anton } from "@next/font/google";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

export default async function Home() {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		notFound();
	}

	return <HomeClient tokens={tokens} />;
}
