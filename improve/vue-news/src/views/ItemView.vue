<template>
  <div>
    <section>
      <user-profile :info="fetchedItem">
        <div slot="username">{{ fetchedItem.user }}</div>
        <template slot="time">{{ fetchedItem.time_ago }}</template>
      </user-profile>
    </section>
    <section>
      <h2>{{ fetchedItem.title }}</h2>
    </section>
    <section>
      <div v-html="fetchedItem.content"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserProfile from '../components/UserProfile.vue';
export default {
  components: {
    UserProfile
  },
  computed: {
    ...mapGetters(['fetchedItem'])
  },
  created() {
    const itemId = this.$route.params.id;
    this.$store.dispatch('FETCH_ASK_ITEM', itemId);
  }
};
</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.fa-user {
  font-size: 2.5rem;
}
.user-description {
  padding-left: 8px;
}
.time {
  font-size: 0.7rem;
}
</style>
