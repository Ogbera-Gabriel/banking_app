import toast from "react-hot-toast";

const useErrorHandler = () => {
    const handleError = (error: any) => {
        if (error.response && error.response.message) {
            toast.error(error.response.message);
        } else {
            toast.error("An unknown error occurred. Please try again later.");
        }
    }

    return handleError;
}