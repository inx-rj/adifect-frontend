import { WarningAmberRounded } from "@mui/icons-material";
import { useState } from "react";
import { useSingleEffect } from "react-haiku";
import { TRIGGER_PROFILE_COMMUN_LIST } from "redux/actions/profile/profile.actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import AccountAccordion from "./accountAccordion/AccountAccordion";
import EmailContent from "./accountAccordion/EmailContent";
import PasswordContent from "./accountAccordion/PasswordContent";
import PaymentContent from "./accountAccordion/PaymentContent";
import CloseAccountContent from "./accountAccordion/CloseAccountContent";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { Roles } from "helper/config";

const UserAccount = () => {
  const dispatch = useAppDispatch();

  //React state
  const [expanded, setExpanded] = useState(false);

  //Redux
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  useSingleEffect(() => {
    dispatch(TRIGGER_PROFILE_COMMUN_LIST());
  })

  return (
    <div className="card drop-shadow-none border p-0" >
      <h5 className="card-page-title flex-center items-start gap-2 bg-[#FFE2AD]/40 text-disable text-base mb-4 px-4 py-3 font-normal" >
        <WarningAmberRounded className="text-[#E77B0D]" />
        You need to set up your payment profile before you can get paid for jobs  Set up Payments
      </h5>
      <div className="p-4" >
        <AccountAccordion
          expanded={expanded}
          setExpanded={setExpanded}
          accountId='email'
          accordionContent={<EmailContent setExpanded={setExpanded} />}
          title='Email Address'
          info={userProfile?.data?.email}
        />
        <AccountAccordion
          expanded={expanded}
          setExpanded={setExpanded}
          accountId='passowrd'
          accordionContent={<PasswordContent setExpanded={setExpanded} />}
          title='Password'
          info='Password must be at least 8 characters long'
        />
        {userProfile?.data?.role === (Roles.ADMIN || Roles.CREATOR) && <>
          <AccountAccordion
            expanded={expanded}
            setExpanded={setExpanded}
            accountId='payment'
            accordionContent={<PaymentContent />}
            title='Payment'
            info='This still needs to be set up before you can get paid for jobs'
          />
          <AccountAccordion
            expanded={expanded}
            setExpanded={setExpanded}
            accountId='close-account'
            accordionContent={<CloseAccountContent setExpanded={setExpanded} />}
            title='Close Account'
            info='Closing your Adifect account is irreversable'
          />
        </>
        }
      </div>
    </div>
  )
}

export default UserAccount;