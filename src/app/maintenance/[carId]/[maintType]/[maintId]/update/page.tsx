export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ClientAPI } from "@/api/clientImplement";
import { Maintenance, MaintType } from "@/api/models/models";
import UpdateMaintenancePageContent from "@/components/maintenance/UpdateMaintenance";
import { clientConfig, serverConfig } from "../../../../../../../config";

interface Params {
  carId: string;
  maintId?: string;
}

const UpdateMaintenancePage = async ({ params }: { params: Params }) => {
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
  let maintenance: Maintenance | null = null;

  if (params.maintId) {
    maintenance = await clientAPI.maintenance.getMaintenance({
      maint_id: Number(params.maintId),
    });
  }

  const maintTypes: MaintType[] = Object.values(MaintType);

  return (
    <UpdateMaintenancePageContent
      carId={Number(params.carId)}
      token={tokens.token}
      maintTypes={maintTypes}
      maintenance={maintenance}
    />
  );
};

export default UpdateMaintenancePage;
