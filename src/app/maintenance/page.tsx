import { ClientAPI } from "@/api/clientImplement";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../../../config";
import MaintenancePage from "@/components/maintenance/Maintenance";
import { notFound } from "next/navigation";

const MaintenancePageWrapper = async () => {
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

    const response = await clientAPI.user.getUserCars({
        firebase_user_id: tokens.decodedToken.uid,
    });

    if (!response) {
        return notFound();
    }

    return <MaintenancePage userCars={response} userId={tokens.decodedToken.uid} token={tokens.token} />;
};

export default MaintenancePageWrapper;
