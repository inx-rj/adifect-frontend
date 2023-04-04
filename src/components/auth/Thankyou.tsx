import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Images } from "../../helper/images";

const Thankyou = () => {
  const { successPage } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <>
      {isLoading ? (
        // <LoadingSpinner />
        <></>
      ) : (
        <div className="flex my-0 mx-auto max-w-[380px] items-center justify-center w-[90%] h-screen">
          <div className="card">
            <div className="mt-2.5 mb-4 inline-flex items-center justify-center w-full h-full">
              <img src={Images.Logo} className="h-auto max-w-[200px]" alt="" />
            </div>
            <div className="thankyoupage">
              <div className="login-content-registering">
                <div className="thanktext">
                  <div className="logo-content">
                    <a href="/">
                      <img
                        src="/img/logonew.svg"
                        className="login-logo"
                        alt=""
                      />
                    </a>
                  </div>

                  <p className="text-center">
                    Thank you for registering yourself at Adifect.
                    {!successPage && (
                      <>
                        <br /> An email has been sent to your registered email
                        Id.
                        <br /> Kindly verify the email to login and start using
                        our services
                      </>
                    )}
                    {successPage && (
                      <>
                        <br /> Please login to continue
                      </>
                    )}
                  </p>
                  <div className="center mt-4 thankyoudiv flex">
                    <Link
                      to="/"
                      type="button"
                      className="btn btn-primary p-2 w-full my-0 mx-auto max-w-[120px] bg-theme border-solid border-theme text-white disabled:bg-dark-100 disabled:text-title-color Large thankbutton border-radius"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Thankyou;
