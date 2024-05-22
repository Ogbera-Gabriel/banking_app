import toast from "react-hot-toast";

export const useErrorHandler = () => {
    const handleError = (error: any) => {
        const errorMessage = error.response?.message || error.message || 'An unexpected error occurred.';
        toast.error(errorMessage);
    }

    return handleError;
}