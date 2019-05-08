/**
 * Serviço que pode ser usado sem a diretiva para 
 * acionar o modal. Em alguns casos é necessário
 * pois o acionamento do modal não estará em um simples botão
 * e sim após o processamento de um método.
 */
export default class ModalService {

    static open(id) {
        $('#' + id).modal('show');
    }

    static close(id) {
        $('#' + id).modal('hide');
    }

    static toggle(id) {
        $('#' + id).modal('toggle');
    }

}