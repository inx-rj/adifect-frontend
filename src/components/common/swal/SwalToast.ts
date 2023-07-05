import { env } from "helper/env";
import { ButtonList } from "sweetalert/typings/modules/options/buttons";
import { ContentOptions } from "sweetalert/typings/modules/options/content";
import Swal, { SweetAlertIcon } from "sweetalert2";

export type AlertT = {
  icon?: SweetAlertIcon;
  title?: string;
  text: string;
  showDenyButton?: boolean;
  showCancelButton?: boolean;
  buttons?: ButtonList | Array<string | boolean>;
  content?: ContentOptions;
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  dangerMode?: boolean;
  timer?: number;
};

export const Notify = async (props: AlertT) => {
  const {
    text,
    title = "Showing Alert",
    showCancelButton = false,
    showDenyButton = false,
    timer = 3000,
  } = props;
  return await Swal.fire({
    imageUrl: "https://adifect.com/img/logonew.svg",
    imageHeight: 70,
    imageAlt: env.APP_NAME,
    title: title,
    text: text,
    showDenyButton: showDenyButton,
    showCancelButton: showCancelButton,
    confirmButtonText: "",
    showConfirmButton: false,
    timer: timer,
  });
};
