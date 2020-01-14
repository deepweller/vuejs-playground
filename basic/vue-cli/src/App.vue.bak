<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <!-- 컴포넌트 등록방법 -->
    <hello-world></hello-world> <!-- 이 표기법만 vscode 에서 해당 컴포넌트 vue 파일로 바로가기 지원 -->
    <HelloWorld></HelloWorld>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

// new Vue() 와 동일
export default {
  //인스턴스 옵션 속성 or 컴포넌트 옵션 속성
  name: 'app',
  components: {
    HelloWorld,
    //위와 동일한 의미
    'hello-world': HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
