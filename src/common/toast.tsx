import { toast, ToastOptions } from "react-toastify";

export const toastTemplate = (props: { message: string; type: string }) => {
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch (props.type) {
        case "success":
            toast.success(props.message, options);
            break;
        case "error":
            toast.error(props.message, options);
            break;

        default:
            break;
    }
};
