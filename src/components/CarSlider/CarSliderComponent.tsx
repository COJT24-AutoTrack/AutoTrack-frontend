import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCardComponent from "./CarCardComponent";
import { Navigation, Pagination } from "swiper/modules";
import { carInfo, userCarInfos } from "@/api/models/models";

interface CarSliderComponentProps {
	userCars: userCarInfos;
	onSelectCar: (userCar: carInfo) => void;
}

const CarSliderComponent: React.FC<CarSliderComponentProps> = ({
	userCars,
	onSelectCar,
}) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);

	const handleSelectCar = (userCar: carInfo) => {
		setSelectedCar(userCar);
		onSelectCar(userCar);
	};

	const handleSlideChange = (swiper: { realIndex: any }) => {
		const activeIndex = swiper.realIndex;
		const newSelectedCar = userCars[activeIndex];
		handleSelectCar(newSelectedCar);
	};

	return (
		<Swiper
			spaceBetween={30}
			slidesPerView={"auto"}
			centeredSlides={true}
			loop={false}
			onSlideChange={handleSlideChange}
			modules={[Navigation, Pagination]}
			pagination={{ clickable: true }}
			style={{ height: "255px" }}
		>
			{userCars.map((userCar) => (
				<SwiperSlide key={userCar.car_id} style={{ width: "280px" }}>
					<CarCardComponent
						userCar={userCar}
						isSelected={userCar === selectedCar}
						onClick={() => handleSelectCar(userCar)}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CarSliderComponent;
