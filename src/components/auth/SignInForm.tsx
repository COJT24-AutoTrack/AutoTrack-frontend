"use client";

import { FormEvent, Suspense, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/../firebase";
import { Main, Container } from "@/components/form/FormContainer";
import {
	Form,
	Label,
	Input,
	ErrorMessage,
	Button,
	Paragraph,
	StyledLink,
} from "@/components/form/FormElements";
import { LogoText } from "@/components/text/LogoTextComponent";
import { fetchWithToken } from "@/api/module/fetchWithToken";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setError("");
		setIsLoading(true);
		try {
			const auth = getAuth(app);
			const credential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const idToken = await credential.user.getIdToken();

			// セッションの作成
			const response = await fetchWithToken(
				"api/signin",
				{
					method: "POST",
					body: JSON.stringify({ idToken }),
				},
				idToken,
			);

			if (response.ok) {
				// セッションが正常に作成されたことを確認
				window.location.href = "/"; // route.pushだとcookieがセットされない
			} else {
				throw new Error("Failed to create session");
			}
		} catch (e) {
			console.error("Signin error:", e);

			// エラーメッセージを日本語で表示
			if (e instanceof Error) {
				switch (e.message) {
					case "Firebase: Error (auth/user-not-found).":
						setError(
							"ユーザーが見つかりません。メールアドレスを確認してください。",
						);
						break;
					case "Firebase: Error (auth/wrong-password).":
						setError("パスワードが間違っています。");
						break;
					case "Firebase: Error (auth/invalid-email).":
						setError("無効なメールアドレスです。");
						break;
					default:
						setError(
							"ログイン中にエラーが発生しました。もう一度お試しください。",
						);
				}
			} else {
				setError("予期せぬエラーが発生しました。もう一度お試しください。");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Main>
				<Container>
					<LogoText />
					<Form onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="email">メールアドレス</Label>
							<Input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								placeholder="name@company.com"
								required
							/>
						</div>
						<div>
							<Label htmlFor="password">パスワード</Label>
							<Input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								id="password"
								placeholder="••••••••"
								required
							/>
						</div>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "ログイン中..." : "ログイン"}
						</Button>
						{error && <ErrorMessage>{error}</ErrorMessage>}
						<Paragraph>
							アカウントをお持ちでない場合は
							<StyledLink href="/signup">こちら</StyledLink>
							から登録してください。
						</Paragraph>
					</Form>
				</Container>
			</Main>
		</Suspense>
	);
}
