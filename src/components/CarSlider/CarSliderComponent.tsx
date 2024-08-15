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
import { useSPQuery } from "@/hooks/useBreakpoints";
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
	onSelectCar: (userCar: carInfo) => void;
}

const CarSliderComponent: React.FC<CarSliderComponentProps> = ({
	userCars,
	onSelectCar,
}) => {
	const router = useRouter();

	const carCardOnClick = (userCar: carInfo) => {
		onSelectCar(userCar);
		router.push(`car/${userCar.car_id}`);
	};

	const handleSlideChange = (swiper: { realIndex: any }) => {
		const activeIndex = swiper.realIndex;
		const newSelectedCar = userCars[activeIndex];
		onSelectCar(newSelectedCar);
	};

	const isSP = useSPQuery();
	const handleAddCarClick = () => {
		router.push("/add-car");
	};

	return (
		<SliderWrapper>
			<Swiper
				spaceBetween={30}
				slidesPerView={"auto"}
				centeredSlides={isSP ? true : false}
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
					{/* <div style={{ height: "80px", width: "280px" }}></div> */}
				</SwiperSlide>
			</Swiper>
		</SliderWrapper>
	);
};

export default CarSliderComponent;
