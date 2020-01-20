<template>
  <div>
    <!-- this.$store.state.jobs : 속성에 접근횟수가 많아짐 >> mapGetters 사용 -->
    <!-- <div v-for="ask in asks">{{ ask.title }}</div> -->
    <ul class="ask-list">
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
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    this.$store.dispatch('FETCH_ASK');
  }
};
</script>

<style>
.ask-list {
  margin: 0;
  padding: 0;
}
.ask {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}
.ask-title {
  margin: 0;
}
.link-text {
  color: #828282;
}
</style>
