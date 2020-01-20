<template>
  <div id="app">
    <!-- 대문자로 시작하기 때문에 명시적으로 컴포넌트로 알 수 있음 -->
    <!-- <ToolBar></ToolBar> -->
    <!-- 자동완성은 케밥케이스로 자동완성이 되서 생산성에 좋음, cmd + click으로 파일도 찾아가기 원활함 -->
    <tool-bar></tool-bar>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
export default {
  components: {
    ToolBar
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
a {
  color: #34495e;
  text-decoration: none;
}
a:hover {
  color: #42b883;
  text-decoration: underline;
}
a.router-link-exact-active {
  text-decoration: underline;
}
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
