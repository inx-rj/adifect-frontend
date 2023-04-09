import { Suspense } from "react";
import TabbingLayout from "layouts/TabbingLayout";
import { profileTabHeaders, profileTabTitle } from "helper/config/tabbing";
import { useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";

const Profile = () => {
    const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
    const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
    console.log("userProfile", profileTabHeaders[0].permission.includes(userProfile.data[0].role))
    return (
        <Suspense>
            <TabbingLayout tabHeadArr={profileTabHeaders} navType="user" tabBodyTitle={activeUserTab?.user_profile?.active} >
               {profileTabHeaders?.filter(item => item?.name === activeUserTab.user_profile.active && item?.permission.includes(userProfile.data[0].role))?.map((item)=> {

                if(activeUserTab?.user_profile?.active === profileTabTitle.COMMUNICATION) {
                    return (
                        <p>communication</p>
                    )
                }
                if(activeUserTab?.user_profile?.active === profileTabTitle.COMPANIES) {
                    return (
                        <p>Companies</p>
                    )
                }
                if(activeUserTab?.user_profile?.active === profileTabTitle.ACCOUNT_SETTINGS) {
                    return (
                        <p>Account</p>
                    )
                }
                return (
                    <p>About</p>
                )
               })}
            </TabbingLayout>
        </Suspense>
    )
}


export default Profile;