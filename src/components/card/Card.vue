<template>
    <div class="card meu-card">

        <img :src="this.foto.url" class="card-img-top">

        <div class="card-body">
            <h5 class="card-title">{{ this.foto.titulo }}</h5>
            <p class="card-text">{{ this.foto.descricao }}</p>
        </div>

        <div class="card-footer" v-show="this.showFooter">
            <slot name="footer"/>
        </div>
    </div>    
</template>

<script>
    export default {
        props: {
            foto: {
                type: Object
            },
            showFooter: {
                type: Boolean,
                default: false
            }            
        }
    }
</script>

<style lang="sass" scoped>
    @import './Card.scss'
</style>


