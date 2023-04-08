import { Suspense } from "react";
import TabbingLayout from "layouts/TabbingLayout";

const Profile = () => {
    return (
        <Suspense>
            <TabbingLayout>
                <p>pro</p>
            </TabbingLayout>
        </Suspense>
    )
}


export default Profile;