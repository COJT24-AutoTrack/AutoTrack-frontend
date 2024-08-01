import { ClientAPI } from "@/api/clientImplement";

export const checkIsUserCars = async ({
	carId,
	tokens,
}: {
	carId: string;
	tokens: {
		token: string;
		decodedToken: { uid: string };
	};
}): Promise<boolean> => {
	if (!tokens) {
		return false;
	}

	const clientAPI = ClientAPI(tokens.token);
	const response = await clientAPI.user.getUserCars({
		firebase_user_id: tokens.decodedToken.uid,
	});
	const userCarIds = response.map((car) => car.car_id);

	// carId がユーザーの車に含まれているかどうかをチェック
	if (!userCarIds.includes(parseInt(carId, 10))) {
		return false;
	} else {
		return true;
	}
};
