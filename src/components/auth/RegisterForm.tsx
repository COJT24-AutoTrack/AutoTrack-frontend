"use client";

import { FormEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { useRouter } from "next/navigation";
import { Main, Container } from "./FormContainer";
import {
	Form,
	Label,
	Input,
	ErrorMessage,
	Button,
	Paragraph,
	StyledLink,
} from "./FormElements";
import { LogoText } from "../text/LogoTextComponen";

export default function RegisterForm() {
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
			await createUserWithEmailAndPassword(getAuth(app), email, password);
			router.push("/login");
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
						<StyledLink href="/login">ログインはこちら</StyledLink>
					</Paragraph>
				</Form>
			</Container>
		</Main>
	);
}
