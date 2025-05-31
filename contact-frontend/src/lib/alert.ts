import Swal from "sweetalert2";

export const alert_success = async (message:string) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    })
}
export const alert_error = async (message:string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: message,
    })
}