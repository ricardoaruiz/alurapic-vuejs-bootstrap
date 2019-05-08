export default class ModalService {

    static open(id) {
        $('#' + id).modal('show');
    }

    static close(id) {
        $('#' + id).modal('hide');
    }

}