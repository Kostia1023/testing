<template>
  <table-custom/>
</template>

<script>
import TableCustom from './components/TableCustom.vue'

export default {
  name: 'App',
  components: {
    TableCustom
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
