export const runtime = "edge";

import SignUpForm from "@/components/auth/SignUpForm";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";

export default async function SignUpPage() {
	const tokens = await getTokens(await cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (tokens) {
		redirect("/");
	}
	return <SignUpForm />;
}
