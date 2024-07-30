import MaintenancePage from "@/components/maintenance/MaintenancePage";

const MaintenancePageWrapper = async () => {
	// Firebase Authentication トークンの取得
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	// トークンが取得できない場合、404 ページを表示
	if (!tokens) {
		return notFound();
	}

	// クライアント API を作成
	const clientAPI = createClientAPI();

	// ユーザーの車の情報を取得
	const response = await clientAPI.user.getCars({
		user_id: tokens.decodedToken.uid,
	});

	// 車の情報が取得できない場合、404 ページを表示
	if (!response) {
		return notFound();
	}

	// MaintenancePage コンポーネントにデータを渡す
	return (
		<MaintenancePage userCars={response} userId={tokens.decodedToken.uid} />
	);
};

export default MaintenancePageWrapper;
