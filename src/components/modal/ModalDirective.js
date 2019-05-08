import Vue from 'vue';
import ModalService from './ModalService';

/**
 * Diretiva para ser usada no elemento que acionará o modal
 */
Vue.directive('modal-handler', {

    bind(el, binding, vnode) {
        $(el).click(() => {
            ModalService.toggle(binding.value);
        });
    }

});