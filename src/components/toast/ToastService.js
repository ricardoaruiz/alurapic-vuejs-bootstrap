import { Subject } from 'rxjs';

const toast = new Subject();

export default class ToastService {

    static getToast() {
        return toast;
    }

    static success(id, message, header='') {
        toast.next({
            id, 
            message,
            header,
            type: 'success'
        });
    }

    static error(id, message, header='') {
        toast.next({
            id, 
            message,
            header,
            type: 'error'
        });
    }

    static warning(id, message, header='') {
        toast.next({
            id, 
            message,
            header,
            type: 'warning'
        });
    }

}