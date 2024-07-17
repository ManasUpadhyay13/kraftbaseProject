import toast from "react-hot-toast";

export function successMessage(message: string): void {
    toast.success(message)
}

export function errorMessage(message: string): void {
    toast.error(message)
}