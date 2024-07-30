import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { ClientAPI } from "@/api/clientImplement";
import { Maintenance, MaintType } from "@/api/models/models";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../../../../../config";
import AddMaintenance from "@/components/maintenance/AddMaintenance";

interface Params {
  carId: string;
  maintType: string;
}

const AddMaintenancePage = async ({ params }: { params: Params }) => {
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
    (maintenance) => maintenance.maint_type === decodeURIComponent(params.maintType)
  );

  return (
    <AddMaintenance
      maintenances={filteredMaintenances}
      maintType={params.maintType}
      carId={Number(params.carId)}
      token={tokens.token}
      maintTypes={Object.values(MaintType)}
    />
  );
};

export default AddMaintenancePage;
