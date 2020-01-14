<template>
  <!-- div 가 가장 상위 레벨이여야함 -->
  <div>
    {{ str }}
  </div>
</template>

<script>
// new Vue({
//   data : {
//     str: 'hi'
//   }
// })
export default {
  //객체 리터럴이 아닌 function 으로 선언해야함
  data: function() {
    return {
      str: 'hi'
    }
  }
}
</script>

<style>

</style>