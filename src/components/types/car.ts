export interface Car {
	car_id?: number; // Optional, as it might not be set until the car is created in the database
	car_name: string;
	carmodelnum: string;
	car_color: string;
	car_mileage: number;
	car_isflooding: boolean;
	car_issmoked: boolean;
	fuelEfficiency: number;
	image: string;
	created_at?: string;
	updated_at?: string;
}
