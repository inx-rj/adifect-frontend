import { CREATE_JOB_TYPES } from "../helper/utility/constants";

export const firstName = (value) => {
  if (!value) return "First name is required";

  if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
    return "First Name can only contain characters ";

  return null;
};

export const username = (value) => {
  if (!value) return "Username is required";
  // if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
  //   return "First Name can only contain characters ";
  // if (value > 20) return "You can enter only 20 characters";
  return null;
};

export const number = (value) => {
  if (!value) return "Bid Price is required";
  if (value < 5 && value > 0) return "Price should be greater than $5";
  return null;
};

export const message = (value) => {
  if (!value) return "Message is required";
  return null;
};

export const name = (value) => {
  if (!value) return "user name is required";
  return null;
};

export const stages = (value) => {
  if (!value) return "stage is required";
  return null;
};

export const selects = (value) => {
  if (!value) return "Level is required";
  return null;
};

export const Email = (value) => {
  if (!value) return "Email is required";

  // if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
  //   return "First Name can only contain characters ";

  return null;
};

export const status = (value) => {
  if (!value) return "Status is required";
  return null;
};

export const company_type = (value) => {
  if (!value) return "Company type is required";
  return null;
};

export const level = (value) => {
  if (!value) return "Please select a skill level";
  return null;
};

export const skills = (value) => {
  if (!value) return "Atleast one skill is required";
  return null;
};

export const industry_name = (value) => {
  if (!value) return "Industry Name is required";
  return null;
};

export const company_name = (value) => {
  if (!value) return "Company Name is required";
  return null;
};

export const level_name = (value) => {
  if (!value) return "Level Name is required";
  return null;
};

export const role = (value) => {
  if (!value) return "Role is required";

  // if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
  //   return "First Name can only contain characters ";

  return null;
};

export const category_name = (value) => {
  if (!value) return "Category name is required";
  return null;
};

export const passwordRequired = (value) => {
  if (!value) return "Password is required";

  // if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
  //   return "First Name can only contain characters ";

  return null;
};

export const lastName = (value) => {
  if (!value) return "Last name is required";

  if (!value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g))
    return "Last Name can only contain characters ";

  return null;
};

export const email = (value) => {
  if (!value) return "Email is required";

  if (
    !value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return "Email is not valid";

  return null;
};

export const price = (value) => {
  if (!value) return "Please input a price";

  if (value < 5) return "Greater than $5";

  return null;
};

export const tags = (value) => {
  if (!value) return "Please input atleast one tag";
  return null;
};

export const jobImages = (value) => {
  if (!value) return "Please select atleast one image";
  return null;
};

export const emailRequired = (value) => {
  if (!value) return "Username/Email is required";
  return null;
};

export const category = (value) => {
  if (!value) return "Category is required";
  return null;
};

export const skill_name = (value) => {
  if (!value) return "Name is required";
  return null;
};
export const stage_name = (value) => {
  if (!value) return "Name is required";
  return null;
};
export const workflow_level_name = (value) => {
  if (!value) return "Level Name is required";
  return null;
};

export const deliveryDate = (value) => {
  if (!value) return "Delivery date is required";
  return null;
};

export const title = (value) => {
  if (!value) return "Title is required";
  return null;
};

export const description = (value) => {
  if (!value) return "Description is required";
  return null;
};

//   export const phoneNumber = (value) => {
//     if (!value) return "Phone Number is required";

//     if (!String(value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
//       return "Phone Number is not valid";

//     return null;
//   };

export const password = (value) => {
  if (!value) return "Password is required";

  if (value.length < 7) return "Atleast 7 characters required";

  return null;
};

export const confirmPassword = (password, confirmPassword) => {
  if (!password) return "Confirm Password is required";

  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};

//   export const dateOfBirth = (value) => {
//     if (!value) return "Date of birth is required";
//     return null;
//   };

export const emailPassword = (value) => {
  if (!value) return "Password is required";

  if (value.length < 7) return "Atleast 7 characters required";

  return null;
};
export const currPassword = (value) => {
  if (!value) return "Password is required";

  if (value.length < 7) return "Atleast 7 characters required";

  return null;
};
export const phoneNumber1 = (value) => {
  if (!value) return "Phone Number is required";

  if (!String(value).match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
    return "Phone Number is not valid";

  return null;
};

// To Formate ISO date into Locale string
export const formateISODateToLocaleString = (value) => {
  return new Date(value ?? "").toLocaleString();
};

/**
 * to verify the argument value/string is null, undefined, empty or length is 0 then true else false.
 * @param {any} checkValue multiple parameters which are string variables.
 * @returns boolean value.
 */
export const isEmpty = (checkValue, customMsg) => {
  // if (checkValue === false) return !checkValue;
  // if (checkValue === true) return !checkValue;
  return (
    (checkValue === null ||
      checkValue === "undefined" ||
      checkValue === "null" ||
      checkValue === undefined ||
      checkValue === "" ||
      checkValue.length === 0 ||
      // Object.keys(checkValue).length === 0 || (Please uncomment while needed)
      checkValue === 0) &&
    (customMsg ?? "")
  );
};

// To handle multiple errors object
export const handleErrors = (errObj, setErr) => {
  for (const [key, values] of Object.entries(errObj)) {
    setErr((prevState) => ({ ...prevState, [`${key}`]: `${values}` }));
  }
};

export const jobDetailsTitle = (selectedJobType) => {
  return selectedJobType === CREATE_JOB_TYPES.MEDIA
    ? "Media"
    : selectedJobType === CREATE_JOB_TYPES.SMS
    ? "SMS"
    : selectedJobType === CREATE_JOB_TYPES.TEXT_COPY
    ? "Text Copy"
    : "Media";
};

// export const convertCurrentTimeToEST = () => {
//   const currentTime = moment(); // Get the current time in local time zone
//   const estTime = currentTime.utc(new Date()).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss'); // Convert to EST

//   console.log(estTime);
// }
