<template>
  <div>
    <ul class="item-list">
      <li v-for="item in items" class="item">
        <div class="points">
          {{ item.points || 0 }}
        </div>
        <div>
          <p class="item-title">
            <template v-if="item.domain">
              <a v-bind:href="item.url">{{ item.title }}</a>
            </template>
            <template v-else>
              <router-link v-bind:to="`item/${item.id}`">
                {{ item.title }}
              </router-link>
            </template>
          </p>
          <small class="link-text">
            <router-link
              v-if="item.user"
              class="link-text"
              v-bind:to="`/user/${item.user}`"
              >{{ item.time_ago }} by {{ item.user }}</router-link
            >
            <a v-else :href="item.url">
              {{ item.time_ago }} in {{ item.domain }}
            </a>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    const routeName = this.$route.name;
    let actionName = '';
    // if(this.$route.path === '/news') {
    if (routeName === 'news') {
      actionName = 'FETCH_NEWS';
    } else if (routeName === 'ask') {
      actionName = 'FETCH_ASK';
    } else if (routeName === 'jobs') {
      actionName = 'FETCH_JOBS';
    }
    this.$store.dispatch(actionName);
  },
  computed: {
    items() {
      const routeName = this.$route.name;
      if (routeName === 'news') {
        return this.$store.state.news;
      } else if (routeName === 'ask') {
        return this.$store.state.asks;
      } else if (routeName === 'jobs') {
        return this.$store.state.jobs;
      } else {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.item-list {
  margin: 0;
  padding: 0;
}
.item {
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
.item-title {
  margin: 0;
}
.link-text {
  color: #828282;
}
</style>
