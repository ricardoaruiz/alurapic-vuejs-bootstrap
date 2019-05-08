<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="titleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                
                    <div class="modal-header">
                        <h5 class="modal-title" :id="titleId">{{title}}</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-if="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        {{message}}
                        <slot />
                    </div>

                    <div class="modal-footer">
                        <button type="button" 
                                class="btn btn-secondary" 
                                data-dismiss="modal" 
                                v-if="cancel" 
                                @click="onCancel()">
                            {{cancel}}
                        </button>
                        
                        <button type="button" 
                                class="btn btn-primary" 
                                @click="onConfirm()" 
                                data-dismiss="modal">
                            {{confirm}}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            cancel: {
                type: String,
                required: false
            },
            confirm: {
                type: String,
                required: true
            },
            close: {
                type: Boolean,
                required: false,
                default: false
            },
            message: {
                type: String,
                required: false
            }
        },
        computed: {
           titleId() {
               return this.id + 'Title';
           } 
        },
        methods: {
            onConfirm() {
                this.$emit('confirmed');
            },
            onCancel() {
                this.$emit('canceled');
            }
        }
    }
</script>
