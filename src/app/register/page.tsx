import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import SignUpForm from "../../components/auth/SignUpForm";
import { notFound } from "next/navigation";

export default async function SignUpPage() {
	return <SignUpForm />;
}
