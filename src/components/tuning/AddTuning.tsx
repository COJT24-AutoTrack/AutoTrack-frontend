"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackHeader from "@/components/base/BackHeader";
import MainButton from "@/components/buttons/MainButton";
import {
	BigLabel,
	ButtonsContainer,
	Form,
	FormContainer,
	FormElementContainer,
} from "@/components/form/FormElements";
import { Anton } from "next/font/google";
import { ClientAPI } from "@/api/clientImplement";

const Anton400 = Anton({
	weight: "400",
	subsets: ["latin"],
});

interface AddTuningProps {
    tokens: {
		token: string;
		decodedToken: { uid: string };
	};
	carId: string;
}

const AddTuning: React.FC<AddTuningProps> = ({ tokens, carId }) => {
	const [date, setDate] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const tuId = searchParams.get("id");

	useEffect(() => {
        const fetchTunings = async () => {
            const clientAPI = ClientAPI(tokens.token);
            
            const response = await clientAPI.car.getCarTuning({
                car_id: parseInt(carId, 10),
            });
            const tu = response.find((tu) => tu.tuning_id === Number(tuId));
            if (tu) {
                setDate(tu.tuning_date.substr(0, 10));
                setTitle(tu.tuning_name);
                setDescription(tu.tuning_description);
            }
        };
        fetchTunings();
    }, [tokens.token, carId, tuId]);

	const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        const clientAPI = ClientAPI(tokens.token);
        const offsetDateTime = new Date(date).toISOString();

        console.log(tokens.token);
        console.log({
            car_id: carId,
            tuning_date: offsetDateTime,
            tuning_name: title,
            tuning_description: description,
        });

        await clientAPI.tuning.createTuning({
            car_id: parseInt(carId, 10),
            tuning_date: offsetDateTime,
            tuning_name: title,
            tuning_description: description,
        });
        router.push("/tuning");
	};

	return (
		<>
			<BackHeader route="/tuning" />
			<FormContainer>
				<Form onSubmit={handleRegister}>
					<BigLabel>チューニング記録追加</BigLabel>
					<FormElementContainer>
						<BigLabel>日付</BigLabel>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>タイトル</BigLabel>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormElementContainer>
					<FormElementContainer>
						<BigLabel>内容</BigLabel>
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormElementContainer>
					<ButtonsContainer>
						<MainButton label="登録" type="submit" />
					</ButtonsContainer>
				</Form>
			</FormContainer>
		</>
	);
};

export default AddTuning;
