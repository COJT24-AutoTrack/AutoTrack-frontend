import { TestAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_ACCIDENTS_URL = `${AUTOTRACK_API_BASE_URL}/test`;

export const TestAPI = (jwt: string) => ({
	getTest: async (): Promise<TestAPIInterface["getTest"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch test");
		}
		const accidents = await response.json();
		return accidents;
	},
});
