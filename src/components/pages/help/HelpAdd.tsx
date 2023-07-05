import { API_URL } from "helper/env";
import { errorType, helpFormData } from "helper/types/help/helpTypes";
import {  useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADD_HELP_USER } from "redux/actions/help/help.action";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const HelpAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { helpId } = useParams();
  
  const [helpForm, setHelpForm] = useState<helpFormData>({
    subject: "",
    description: "",
  });
  const [filesDrop, setFilesDrop] = useState([]);
  const [errors, setErrors] = useState<errorType>({
    subject: null,
    description: null,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setHelpForm({ ...helpForm, [name]: value });
  };

  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFilesDrop([
        ...filesDrop,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
    },
    [filesDrop]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }, index) => (
    <li className="mapDataDiv" key={index}>
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  const removeFile = (file:File) => () => {
    const newFiles = [...filesDrop];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFilesDrop(newFiles);
  };

  const thumbs = filesDrop.map((file:File, index:number) => (
    <div className="" key={index}>
      <div className="">
        <img
          className="attachAssertspopImage attachdiv"
          src="/img/assertgallery.png"
          alt=""
        />
        {file?.['title']}
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <img
            className="attachAssertspopDeleteI1"
            src="/img/deleterc.png"
            alt=""
          />
        </button>
      </div>
    </div>
  ));
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      subject: !helpForm.subject && "This field is required",
      description: !helpForm.description && "This field is required",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("user", userData?.data?.id.toString());
    formData.append("subject", helpForm.subject);
    formData.append("message", helpForm.description);
    for (const key of Object.keys(filesDrop)) {
      formData.append("help_new_attachments", filesDrop[key]);
    }
    dispatch(ADD_HELP_USER(formData, API_URL.HELP.HELP_LIST, navigate));
  };

  return (
    <>
      <div className="page-container">
        <div className="flex-between mb-5">
          <div className="CategorylistName">
            <h4 className="font-bold text-xl">Adifect Help Page</h4>
          </div>
          <div className=" w-[160px]">
            <Link
              to="/help/"
              className="border border-theme rounded-md py-3 text-theme  flex content-center justify-center"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="bg-white p-10 rounded-sm">
          <div className="ContentDivTop Categorypage">
            <div className="addpage Industrypage">
              <form
                onSubmit={validateSubmit}
                id="websiteUserRegisterForm"
                className="grid lg:grid-cols-2 grid-cols-1"
              >
                <div className="input-fields-wrapper col-start-1 col-end-2">
                  <label>Subject :</label>
                  <input
                    className={"input-style"}
                    placeholder="Enter Title"
                    type="text"
                    name="subject"
                    id="subject"
                    value={helpForm.subject}
                    onChange={handleChange}
                  />
                  <span className="err-tag">{errors.subject ?? ""}</span>
                </div>
                <div className="input-fields-wrapper col-start-1 col-end-2">
                  <label>Message</label>
                  <textarea
                    className={"input-style h-[200px] bg-slate-100"}
                    name="description"
                    id="description"
                    placeholder=""
                    maxLength={2000}
                    value={helpForm.description}
                    onChange={handleChange}
                  />
                  <p className="deslimtsec_4 text-sm font-normal text-black text-right mt-[-5px] mx-[3px] m-0">
                    <span
                      style={{
                        color:
                          helpForm.description?.length === 2000 && "#D14F4F",
                      }}
                    >
                      {helpForm.description?.length ?? 0}
                      /2000
                    </span>
                  </p>
                  <span className="err-tag">{errors.description ?? ""}</span>
                </div>
                {!helpId && (
                  <div className="helppage col-start-1 col-end-2">
                    <div
                      className="helpbtnattact addhelpbtn"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <p className="w-40 h-[45px] flex items-center text-white justify-center cursor-pointer rounded-lg; bg-theme rounded-lg">
                        Attach file
                      </p>
                    </div>
                    <aside> {thumbs}</aside>
                    {fileRejectionItems.length > 0 && (
                      <ul className="errorData">{fileRejectionItems}</ul>
                    )}
                  </div>
                )}

                {!helpId && (
                  <div className="col-start-1 col-end-2">
                    <input
                      className="w-40 h-[45px] flex items-center text-white justify-center cursor-pointer rounded-lg bg-theme mt-4"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpAdd;
