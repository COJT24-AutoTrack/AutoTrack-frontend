import React, { useState } from "react";
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

	const isSP = useSPQuery();
	const handleAddCarClick = () => {
		router.push("/add-car");
	};

	return (
		<Swiper
			spaceBetween={30}
			slidesPerView={"auto"}
			centeredSlides={isSP ? true : false}
			loop={false}
			onSlideChange={handleSlideChange}
			modules={[Navigation, Pagination]}
			pagination={{ clickable: true }}
			style={{ height: isSP ? "30dvh" : "72dvh" }}
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
				<div style={{ height: "80px", width: "280px" }}></div>
			</SwiperSlide>
		</Swiper>
	);
};

export default CarSliderComponent;
