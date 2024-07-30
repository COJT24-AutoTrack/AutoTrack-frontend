"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { Main, Container } from "../form/FormContainer";
import {
	Form,
	Label,
	Input,
	ErrorMessage,
	Button,
	Paragraph,
	StyledLink,
} from "../form/FormElements";
import { LogoText } from "../text/LogoTextComponen";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setError("");
		try {
			const credential = await signInWithEmailAndPassword(
				getAuth(app),
				email,
				password,
			);

			router.push("/");
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
					<Button type="submit">ログイン</Button>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<Paragraph>
						アカウントをお持ちでない場合は
						<StyledLink href="/register">こちら</StyledLink>
						から登録してください。
					</Paragraph>
				</Form>
			</Container>
		</Main>
	);
}
