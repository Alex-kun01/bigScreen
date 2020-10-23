<template>
  <div id="app">
    <router-view />
    <!-- <Index /> -->
  </div>
</template>
<script>
import Index from './components/index.vue'
export default {
  components:{
      Index
  }
}
</script>
<style>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  height: 100%;
  background-color: #030B22;
}
</style>
