import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (errmsg, success) =>
  toast(errmsg, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: success ? "success" : "error",
    theme: "colored",
  });
