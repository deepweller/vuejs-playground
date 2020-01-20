<template>
  <div>
    <list-item></list-item>
    <!-- this.$store.state.jobs : 속성에 접근횟수가 많아짐 >> mapGetters 사용
    <!-- <div v-for="ask in asks">{{ ask.title }}</div> -->
    <!-- <ul class="ask-list">
      <li v-for="ask in asks" class="ask">
        <div class="points">
          {{ ask.points }}
        </div>
        <div>
          <p class="ask-title">
            <router-link v-bind:to="`item/${ask.id}`">
              {{ ask.title }}
            </router-link>
          </p>

          <small class="link-text">
            by
            <router-link class="link-text" v-bind:to="`/user/${ask.user}`">{{ ask.user }}</router-link> {{ ask.time_ago }}
          </small>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'

export default {
  components: {
    ListItem
  }
}
// import { mapState, mapGetters } from 'vuex';
// export default {
  // computed: {
  //   ...mapGetters({
  //     asks: 'fetchedAsk'
  //   })
  //   // ...mapState({
  //   //   asks: state => state.asks
  //   // })
  //   // ask() {
  //   //   return this.$store.state.asks;
  //   // }
  // },
//   created() {
//     this.$store.dispatch('FETCH_ASK');
//   }
// };
</script>

<style></style>
