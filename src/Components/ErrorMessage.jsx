
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
const ErrorMessage = ({ showToast, msg, type }) => {
    const notify = () => {
        (type === "success" ? toast.success : toast.error)(msg)
        // toast.success(msg)
    }
    useEffect(() => {
        if (showToast) {
            notify()
        }
    }, [showToast])
    return (
        <ToastContainer />
    )
}


export default ErrorMessage