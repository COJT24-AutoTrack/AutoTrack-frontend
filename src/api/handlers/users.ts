import { ClientAPIInterface, UserAPIInterface } from "@/api/client";
import { Car, carInfo, User } from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_USERS_URL = `${AUTOTRACK_API_BASE_URL}/users`;

export const UserAPI = (jwt: string) => ({
	createUser: async (
		request: UserAPIInterface["createUser"]["request"],
	): Promise<UserAPIInterface["createUser"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create user");
		}
		const user: User = await response.json();
		return user;
	},
	getUsers: async (): Promise<UserAPIInterface["getUsers"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		const users: User[] = await response.json();
		return users;
	},

	getUser: async (
		request: UserAPIInterface["getUser"]["request"],
	): Promise<UserAPIInterface["getUser"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}/${request.firebase_user_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}
		const user: User = await response.json();
		return user;
	},

	updateUser: async (
		request: UserAPIInterface["updateUser"]["request"],
	): Promise<UserAPIInterface["updateUser"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}/${request.firebase_user_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update user");
		}
		const user: User = await response.json();
		return user;
	},

	deleteUser: async (
		request: UserAPIInterface["deleteUser"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}/${request.firebase_user_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete user");
		}
	},
	getUserCars: async (
		request: UserAPIInterface["getUserCars"]["request"],
	): Promise<UserAPIInterface["getUserCars"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_USERS_URL}/${request.firebase_user_id}/cars`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch cars: ${errorText}`);
		}
		const carInfos: Car[] = await response.json();
		return carInfos;
	},
});
