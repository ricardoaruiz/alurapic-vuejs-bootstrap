<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="#">Alurapic</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item" v-for="route of menuRoutes" :key="route.menuLabel">
                <router-link class="nav-link" :to="{ name: route.name }">{{ route.menuLabel }}</router-link>
            </li>        
        </ul>
    </div>
    </nav>    
</template>

<script>
    /**
     * Componente de menu, recebe uma lista de rotas e renderiza como menu
     * as rotas que foram marcadas com a propriedade "menuLabel"
     * O menu está considerando navegação por rota nomeada, porisso as rotas
     * devem ter também a propriedade "name"
     */
    export default {
        props: {
            routes: Array
        },
        computed: {
            menuRoutes() {
                return this.routes.filter(
                    route => route.menuLabel !== undefined && route.name !== undefined )
            }
        }
    }
</script>