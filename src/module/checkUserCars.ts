import { ClientAPI } from "@/api/clientImplement";
import { Car } from "@/api/models/models";

export const checkIsUserCars = async ({
	carId,
	tokens,
}: {
	carId: number;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}): Promise<boolean> => {
	if (!tokens) {
		return false;
	}

	const clientAPI = ClientAPI(tokens.token);
	const userCars: Car[] = await clientAPI.user.getUserCars({
		firebase_user_id: tokens.decodedToken.uid,
	});
	const userCarIds = userCars.map((car) => car.car_id);

	// 明示的に数値に変換して比較
	const result = userCarIds.includes(Number(carId));

	return result;
};
