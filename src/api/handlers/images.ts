import { ImageAPIInterface } from "@/api/client";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_IMAGES_URL = `${AUTOTRACK_API_BASE_URL}/images`;

export const fetchWithToken = async (
	url: string,
	options: RequestInit,
	jwt: string,
) => {
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${jwt}`,
		},
	});
};

export const ImageAPI = (jwt: string) => ({
	uploadImage: async (
		request: ImageAPIInterface["uploadImage"]["request"],
	): Promise<ImageAPIInterface["uploadImage"]["response"]> => {
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

		return response.json();
	},
});
