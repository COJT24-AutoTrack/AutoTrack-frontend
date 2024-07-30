import MaintenancePage from "@/components/maintenance/MaintenancePage";

const Maintenance = ({ userCars, token, userId }) => {
	return <MaintenancePage userCars={userCars} token={token} userId={userId} />;
};

export default Maintenance;
