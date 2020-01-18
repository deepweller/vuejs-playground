<template>
  <div>
    <!-- this.$store.state.jobs : 속성에 접근횟수가 많아짐 >> mapGetters 사용 -->
    <!-- <div v-for="ask in asks">{{ ask.title }}</div> -->
    <p v-for="ask in asks">
      <a v-bind:href="ask.url">
        {{ ask.title }}
      </a>
      <small>{{ ask.time_ago }} by {{ ask.user }}</small>
    </p>
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
