import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
	return (
		<div className="text-richblack-5 flex flex-col justify-center p-6 gap-y-6">
			<h1 className="text-3xl font-medium text-richblack-5">
				Edit Profile
			</h1>

			<div className="w-[70%] flex flex-col gap-y-4 pl-32">
				<ChangeProfilePicture />
				<EditProfile />
				<UpdatePassword />
				<DeleteAccount />
			</div>
		</div>
	);
};

export default Settings;
