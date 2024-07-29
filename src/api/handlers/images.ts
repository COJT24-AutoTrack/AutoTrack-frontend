import { ClientAPI, ImageAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_IMAGES_URL = `${AUTOTRACK_API_BASE_URL}/images`;

export const ImageAPI = (jwt: string): ClientAPI["image"] => ({
	uploadImage: async (
		request: ImageAPIInterface["uploadImage"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_IMAGES_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to upload image");
		}
	},
});
