<template>
  <div>
    <ul class="item-list">
      <li v-for="item in this.$store.state.news" class="item">
        <div class="points">
          {{ item.points }}
        </div>
        <div>
          <p class="item-title">
            <a v-bind:href="item.url">{{ item.title }}</a>
          </p>
          <small class="link-text">
            by
            <router-link class="link-text" v-bind:to="`/user/${item.user}`">{{ item.user }}</router-link> {{ item.time_ago }}
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
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