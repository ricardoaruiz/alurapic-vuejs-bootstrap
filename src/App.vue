<template>
  <div id="app">    
    <Menu :routes="this.routes"/>

    <div class="main container-fluid">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
  import { routes } from '@/router';
  import Menu from '@/components/menu/Menu.vue';

  export default {
    data() {
      return {
        routes
      }
    },
    components: {
      Menu
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.main {
  margin-top: 70px;
}
</style>
