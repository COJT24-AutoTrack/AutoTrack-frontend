export const fetchWithToken = async (
	url: string,
	options: RequestInit,
	idToken: string,
) => {
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${idToken}`,
		},
	});
};
