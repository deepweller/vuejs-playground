<template>
  <div>
    <!-- 속성에 접근횟수가 많아짐 -->
    <div v-for="ask in asks">{{ ask.title }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      asks: 'fetchedAsk'
    })
    // ...mapState({
    //   asks: state => state.asks
    // })
    // ask() {
    //   return this.$store.state.asks;
    // }
  },
  created() {
    this.$store.dispatch("FETCH_ASK");
  }
};
</script>

<style></style>
