<template>
  <!-- div 가 가장 상위 레벨이여야함 -->
  <div>
    {{ str }}
    <app-header 
    v-bind:propsdata="str"
    v-on:renew="renewStr"></app-header>
  </div>
</template>

<script>
//상대경로
import AppHeader from './components/AppHeader.vue'

// new Vue({
//   data : {
//     str: 'hi'
//   }
// })
export default {
  //객체 리터럴이 아닌 function 으로 선언해야함
  data: function() {
    return {
      str: 'Header'
    }
  },
  //객체 리터럴
  components: {
    'app-header': AppHeader
  },
  methods: {
    renewStr: function() {
      this.str = "hi!!";
    }
  }
}
</script>

<style>

</style>