"use client";

import { FormEvent, useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/../firebase";
import { useRouter } from "next/navigation";
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
import { LogoText } from "@/components/text/LogoTextComponen";
import { ClientAPI } from "@/api/clientImplement";
import { fetchWithToken } from "@/api/module/fetchWithToken";

export default function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmation, setConfirmation] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setError("");
		if (password !== confirmation) {
			setError("Passwords don't match");
			return;
		}
		try {
			const auth = getAuth(app);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			// アカウント作成後にユーザーのIDトークンを取得
			const jwt = await userCredential.user.getIdToken();

			// JWTトークンを使用してclientAPIを作成
			const clientAPI = ClientAPI(jwt);

			// バックエンドのユーザー作成apiを叩く
			const response = await clientAPI.user.createUser({
				user_email: email,
				user_name: "John Doe", //ユーザー名って概念は存在しなかったことにさせてくれ(
				user_password: password,
				firebase_user_id: userCredential.user.uid,
			});

			// ユーザー作成が成功したらログインページにリダイレクト
			try {
				const credential = await signInWithEmailAndPassword(
					getAuth(app),
					email,
					password,
				);
				const idToken = await credential.user.getIdToken();
				await fetchWithToken(
					"api/signin",
					{
						method: "POST",
						body: JSON.stringify({ idToken }),
					},
					idToken,
				);
				router.push("/");
			} catch (e) {
				setError((e as Error).message);
			}
		} catch (e) {
			setError((e as Error).message);
		}
	}

	return (
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
					<div>
						<Label htmlFor="confirm-password">パスワードを確認する</Label>
						<Input
							type="password"
							name="confirm-password"
							value={confirmation}
							onChange={(e) => setConfirmation(e.target.value)}
							id="confirm-password"
							placeholder="••••••••"
							required
						/>
					</div>
					<Button type="submit">アカウント作成</Button>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<Paragraph>
						すでにアカウントをお持ちですか?{" "}
						<StyledLink href="/signin">ログインはこちら</StyledLink>
					</Paragraph>
				</Form>
			</Container>
		</Main>
	);
}
