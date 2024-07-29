export const fetchWithToken = async (
	url: string,
	options: RequestInit,
	jwt: string,
) => {
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	});
};
