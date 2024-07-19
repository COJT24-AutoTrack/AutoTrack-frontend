import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarCardComponent from "./CarCardComponent";
import AddCarCardComponent from "./AddCarCardComponent";
import { Navigation, Pagination } from "swiper/modules";
import { carInfo } from "@/api/models/models";
import { useRouter } from "next/navigation";

interface CarSliderComponentProps {
	userCars: carInfo[];
	onSelectCar: (userCar: carInfo) => void;
}

const CarSliderComponent: React.FC<CarSliderComponentProps> = ({
	userCars,
	onSelectCar,
}) => {
	const [selectedCar, setSelectedCar] = useState<carInfo | null>(null);
	const router = useRouter();

	const handleSelectCar = (userCar: carInfo) => {
		setSelectedCar(userCar);
		onSelectCar(userCar);
	};

	const handleSlideChange = (swiper: { realIndex: any }) => {
		const activeIndex = swiper.realIndex;
		const newSelectedCar = userCars[activeIndex];
		handleSelectCar(newSelectedCar);
	};

	const handleAddCarClick = () => {
		router.push("/add-car");
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
			style={{ height: "552px" }}
		>
			{userCars.map((userCar) => (
				<SwiperSlide key={userCar.car_id} style={{ width: "auto" }}>
					<CarCardComponent
						userCar={userCar}
						isSelected={userCar === selectedCar}
						onClick={() => handleSelectCar(userCar)}
					/>
				</SwiperSlide>
			))}
			<SwiperSlide style={{ width: "280px" }}>
				<AddCarCardComponent onClick={handleAddCarClick} />
			</SwiperSlide>
		</Swiper>
	);
};

export default CarSliderComponent;
