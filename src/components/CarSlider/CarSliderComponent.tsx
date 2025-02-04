import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCardComponent from "@/components/CarSlider/CarCardComponent";
import AddCarCardComponent from "@/components/CarSlider/AddCarCardComponent";
import { Navigation, Pagination } from "swiper/modules";
import { carInfo } from "@/api/models/models";
import { useRouter } from "next/navigation";
import { useSPandTBQuery, useSPQuery } from "@/hooks/useBreakpoints";
import { useSelectedCarContext } from "@/context/selectedCarContext";
import styled from "styled-components";

const SliderWrapper = styled.div`
	.swiper {
		display: flex;
		flex-direction: column;
		height: fit-content;
		gap: 10px;
	}
	.swiper-wrapper {
		height: fit-content;
		align-items: center;
	}
	.swiper-slide {
		height: fit-content;
	}
	.swiper-pagination {
		position: relative !important;
	}
`;

interface CarSliderComponentProps {
	userCars: carInfo[];
	// onSelectCar プロパティは不要になりました
}

const CarSliderComponent: React.FC<CarSliderComponentProps> = ({
	userCars,
}) => {
	const router = useRouter();
	const { setSelectedCar } = useSelectedCarContext();

	// カードがクリックされた場合、コンテキストの selectedCar を更新し、詳細ページへ遷移
	const carCardOnClick = (userCar: carInfo) => {
		setSelectedCar(userCar);
		window.location.href = `car/${userCar.car_id}`;
	};

	// スライド変更時に、表示中の車情報を selectedCar として更新
	const handleSlideChange = (swiper: { realIndex: number }) => {
		const activeIndex = swiper.realIndex;
		const newSelectedCar = userCars[activeIndex];
		setSelectedCar(newSelectedCar);
	};

	const isSPandTB = useSPandTBQuery();

	const handleAddCarClick = () => {
		window.location.href = "/car/add";
	};

	return (
		<SliderWrapper>
			<Swiper
				spaceBetween={30}
				slidesPerView={"auto"}
				centeredSlides={isSPandTB ? true : false}
				loop={false}
				onSlideChange={handleSlideChange}
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
			>
				{userCars.map((userCar) => (
					<SwiperSlide key={userCar.car_id} style={{ width: "auto" }}>
						<CarCardComponent
							userCar={userCar}
							onClick={() => carCardOnClick(userCar)}
						/>
					</SwiperSlide>
				))}
				<SwiperSlide
					style={{
						width: "280px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AddCarCardComponent onClick={handleAddCarClick} />
					{userCars.length === 0 && (
						<div style={{ height: "5dvh", width: "100dvw" }}></div>
					)}
				</SwiperSlide>
			</Swiper>
		</SliderWrapper>
	);
};

export default CarSliderComponent;
