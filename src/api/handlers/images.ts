import { ImageAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_IMAGES_URL = `${AUTOTRACK_API_BASE_URL}/images`;

export const ImageAPI = (jwt: string) => ({
	uploadImage: async (
		request: ImageAPIInterface["uploadImage"]["request"],
	): Promise<ImageAPIInterface["uploadImage"]["response"]> => {
		console.log(request.formData);
		const response = await fetchWithToken(
			`${AUTOTRACK_API_IMAGES_URL}`,
			{
				method: "POST",
				body: request.formData,
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		return { imgURL: "" };
	},
});
