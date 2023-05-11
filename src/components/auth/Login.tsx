import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "helper/images";
import { TRIGGER_LOGIN } from "redux/actions/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import { emailRequired, passwordRequired } from "helper/validations";
import {
  GET_USER_PROFILE_DATA,
  USER_DATA_LOADER,
} from "redux/reducers/auth/auth.slice";
import swal from "sweetalert";
import { AUTH_ROUTE, PAGE_ROUTE } from "routes/baseRoute";
import Logo from "components/common/logo/Logo";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Helmet } from "react-helmet-async";
import { useSingleEffect } from "react-haiku";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLoader = useAppSelector(USER_DATA_LOADER);

  const [email, setEmail] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const userData = useAppSelector(GET_USER_PROFILE_DATA);

  const redirect =
    window.location.search && window.location.search?.split("=")[1];

  const validateSubmit = (e: any) => {
    e.preventDefault();
    const tempErrors: any = {
      email: emailRequired(email),
      password: passwordRequired(password),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(TRIGGER_LOGIN({ email: email, password }));
  };

  useEffect(() => {
    if (userData.hasData) {
      swal({
        title: "Successfully Complete",
        text: "Login Success",
        className: "successAlert-login",
        icon: Images.Logo,
        buttons: { visible: false },
        timer: 1500,
      });

      setTimeout(() => {
        //     // navigate(redirect ? redirect : "/home");
        navigate(PAGE_ROUTE.HOME, { replace: true, state: true });
        //     // navigate("/home");
      }, 1500);
    }
  }, [dispatch, userData]);

  const fetchFakeData = async (url: string) => {
    
    (function (d, s) {
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s);
      js.setAttribute('property', 'og:url');
      js.content = "https://fakestoreapi.com/products ";
      console.log({ fjs, js });
      fjs.parentNode.appendChild(js);
    })(document, "meta");

    await fetch(url)
      .then((res) => { return res.json(); })
      .then((data) => {
        // Load the SDK asynchronously
        (function (d, s) {
          var js, fjs = d.getElementsByTagName(s)[0];
          js = d.createElement(s);
          // js.id = "og:image";
          // js.name = "og:image";
          js.setAttribute('property', 'og:image');

          console.log(data[2].image);
          js.content = data?.[2].image || "https://s3.amazonaws.com/jnswire/jns-media/52/10/12898470/large_living-room.jpeg";

          console.log({ fjs, js });

          fjs.parentNode.prepend(js);
        })(document, "meta");
        
        (function (d, s) {
          var js, fjs = d.getElementsByTagName(s)[0];
          js = d.createElement(s);
          js.setAttribute('property', 'og:image:secure_url');

          console.log(data[2].image);
          js.content = data?.[2].image || "https://s3.amazonaws.com/jnswire/jns-media/52/10/12898470/large_living-room.jpeg";

          console.log({ fjs, js });

          fjs.parentNode.appendChild(js);
        })(document, "meta");
      })
  }

  useSingleEffect(() => {
    fetchFakeData('https://fakestoreapi.com/products');
  })


  return (
    <>
      {/* <Helmet>
        <meta property="og:locale" content="en_US" />
        <link rel="canonical" href="https://blog.bit.ai/" />
        <meta name="description" content="Description Adifect-Job portal" />
        <meta property="og:title" content="Adifect Frontend title" />
        <meta
          property="og:description"
          content="Are you looking for a move-in ready home with new windows, a recently-installed roof, and a fully updated kitchen?"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Job Portal" />
        <meta
          property="og:url"
          content="https://adifect-frontend.vercel.app/company-projects/507598"
        />
        <meta
          property="og:image"
          content="https://s3.amazonaws.com/jnswire/jns-media/52/10/12898470/large_living-room.jpeg"
        />

        <meta name="twitter:creator" content="Adifect Frontend team" />
        <meta name="twitter:card" content="Card Title" />
        <meta name="twitter:title" content="Adifect Frontend title" />
        <meta
          name="twitter:description"
          content="Are you looking for a move-in ready home with new windows, a recently-installed roof, and a fully updated kitchen?"
        />
      </Helmet> */}


      {userLoader && <LoadingSpinner />}
      <div className="login-signup-wrapper">
        <div className="card max-w-[380px] w-full">
          <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
            <Logo />
          </div>
          <div className="text-center">
            <h2 className="card-page-title">Welcome to Adifect</h2>
            <p className="card-page-info">
              Log into your account by entering your username, email and
              password.
            </p>
          </div>
          <form
            id="websiteUserLoginForm"
            onSubmit={validateSubmit}
            className="group grid grid-cols-1"
          >
            <div className="input-fields-wrapper">
              <label>Username or Email</label>
              <input
                className={
                  errors.email ? "input-style input-err-style" : "input-style"
                }
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: null });
                  setEmail(e.target.value);
                }}
              />
              <span className="err-tag">{errors.email ?? " "}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>Password</label>
              <input
                className={
                  errors.password
                    ? "input-style input-err-style"
                    : "input-style"
                }
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setErrors({ ...errors, password: null });
                  setPassword(e.target.value);
                }}
              />
              <span className="err-tag">{errors.password ?? ""}</span>
            </div>
            <div className="mt-uni-gap">
              <button
                type="submit"
                className="btn btn-primary w-full text-base"
              >
                Log In
              </button>
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                className="btn btn-outline block w-full mt-uni-gap text-base"
              >
                Create Account
              </Link>
            </div>
            <Link
              to={AUTH_ROUTE.FORGOT_PASSWORD}
              className="btn-link mt-uni-gap"
            >
              Forgot Password ?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
