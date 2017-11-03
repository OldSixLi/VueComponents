<template>
  <div id="app">
    <img src="./assets/img/logo.png">
    <h1>{{ msg }}</h1>
    <h2>热更新</h2>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '嫩这是弄啥嘞'
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
