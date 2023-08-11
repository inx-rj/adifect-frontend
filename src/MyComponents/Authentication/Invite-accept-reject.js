import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inviteAcceptReject } from "../../redux/actions/invite-actions";

export default function Invite_accept_reject() {
  const { decodeId, accept_invite_encode, exclusive_decode } = useParams();
  const dispatch = useDispatch();

  const {
    inviteMessage,
    success: successInvite,
    loading: loadingInvite,
    error: errorInvite,
  } = useSelector((state) => state.inviteAcceptRejectReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      inviteAcceptReject(decodeId, accept_invite_encode, exclusive_decode)
    );
  }, []);

  return (
    <>
      {loadingInvite ? (
        <LoadingSpinner />
      ) : (
        <div className="thankyoupage">
          <div className="login-content-registering">
            <div className="thanktext">
              <div className="logo-content">
                <Link to="/">
                  <img src="/img/logonew.svg" className="login-logo" alt="" />
                </Link>
              </div>

              <p>
                {successInvite && <>{inviteMessage}</>}
                {errorInvite && <>{errorInvite}</>}
                <br /> Please login to continue
              </p>
              <div className="center mt-2 thankyoudiv">
                <Link
                  to="/"
                  className="btn btn-primary Large thankbutton border-radius"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
