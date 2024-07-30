import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import RegisterForm from "../../components/auth/RegisterForm";
import { notFound } from "next/navigation";

export default async function RegisterPage() {
	return <RegisterForm />;
}
