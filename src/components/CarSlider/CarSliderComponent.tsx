import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCardComponent from "./CarCardComponent";
import { Car } from "../types/car";
import { Navigation, Pagination } from "swiper/modules";

interface CarSliderComponentProps {
	cars: Car[];
	onSelectCar: (car: Car) => void;
}

const CarSliderComponent: React.FC<CarSliderComponentProps> = ({
	cars,
	onSelectCar,
}) => {
	const [selectedCar, setSelectedCar] = useState<Car | null>(null);

	const handleSelectCar = (car: Car) => {
		setSelectedCar(car);
		onSelectCar(car);
	};

	const handleSlideChange = (swiper: { realIndex: any }) => {
		const activeIndex = swiper.realIndex;
		const newSelectedCar = cars[activeIndex];
		handleSelectCar(newSelectedCar);
	};

	return (
		<Swiper
			spaceBetween={30}
			slidesPerView={"auto"}
			centeredSlides={true}
			loop={true}
			onSlideChange={handleSlideChange}
			modules={[Navigation, Pagination]}
			pagination={{ clickable: true }}
			style={{ height: "255px" }}
		>
			{cars.map((car) => (
				<SwiperSlide key={car.car_id} style={{ width: "280px" }}>
					<CarCardComponent
						car={car}
						isSelected={car === selectedCar}
						onClick={() => handleSelectCar(car)}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CarSliderComponent;
