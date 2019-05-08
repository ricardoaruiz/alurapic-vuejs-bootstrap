<template>
    <div aria-live="polite" aria-atomic="true" style="position: relative">
        <div :id="id" 
             :data-autohide="autoHide" 
             :data-delay="delay"
             class="toast">

            <div class="toast-header">
                <div :class="this.classType"></div>
                <strong class="mr-auto">{{headerMessage}}</strong>
                
                <button v-show="!autoHide" type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                {{message}}
            </div>
        </div>
    </div>
</template>

<script>
    import ToastService from './ToastService';
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            autoHide: {
                type: String,
                required: false,
                default: 'true'
            },
            delay: {
                type: String,
                required: false,
                default: '1500'
            }
        },
        computed: {
            classType() {
                return `toast-type ${this.type}`
            }
        },
        data() {
            return {
                headerMessage: '',
                message: '',
                type: 'success'
            }
        },
        created() {
            this.toastSubscription = 
                ToastService.getToast()
                    .subscribe(object => {
                        this.headerMessage = object.header;
                        this.message = object.message;
                        this.type = object.type;
                        $('#' + object.id).toast('show')
                    });
        },
        destroyed() {
            this.toastSubscription.unsubscribe();
        }
    }
</script>

<style lang="sass" scoped>
    @import './Toast.scss'
</style>

