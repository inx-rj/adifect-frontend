import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleEffect } from "react-haiku";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_INVITE_STATUS } from "redux/actions/inviteUser/inviteUser.actions";
import { INVITE_USER_LIST } from "redux/reducers/inviteUser/inviteUser.slice";
import EmailConfirmation from "common/EmailConfirmation";

const InviteStatus = () => {
  const { decodeId, accept_invite_encode, exclusive_decode } = useParams();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(INVITE_USER_LIST);
  const [inviteStatusMsg, setInviteStatusMsg] = useState("");

  //fetch invite status
  useSingleEffect(async () => {
    window.scrollTo(0, 0);
    const inviteStatus = await dispatch(
      GET_INVITE_STATUS(decodeId, accept_invite_encode, exclusive_decode)
    );
    setInviteStatusMsg(inviteStatus);
  });

  console.log("inviteStatusMsg", inviteStatusMsg);
  return (
    <EmailConfirmation
      isLoading={loading}
      confirmationMsg={
        <p className="text-center">
          {inviteStatusMsg && <>{inviteStatusMsg}</>}
          <br /> Please login to continue
        </p>
      }
    />
  );
};

export default InviteStatus;