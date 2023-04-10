import { LanguageOutlined } from "@mui/icons-material";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppSelector } from "redux/store";

const UserAbout = () => {
    const UserProfile = useAppSelector(GET_USER_PROFILE_DATA);
    return (
        <>
            <h5 className="card-page-title text-base mb-4" >{UserProfile?.data?.[0]?.sub_title ?? "My Info"}</h5>
            <p className="card-page-info text-sm" >{UserProfile?.data?.[0]?.profile_description ?? "This is agency description."}</p>
            <ul className="text-sm flex gap-3" >
                <li className="flex items-center gap-2" >
                    <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white" ><LanguageOutlined /></i>
                    <div className="w-[calc(100%-35px)]" >
                        <label className="block text-[#71757B]" >Website</label>
                        <p>{UserProfile?.data?.[0]?.website ?? "adifect.com"}</p>
                    </div>
                </li>
                <li className="flex items-center gap-2" >
                    <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white" ><LanguageOutlined /></i>
                    <div className="w-[calc(100%-35px)]" >
                        <label className="block text-[#71757B]" >Language</label>
                        <p>{UserProfile?.data?.[0]?.Language ?? "English (US)"}</p>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default UserAbout;