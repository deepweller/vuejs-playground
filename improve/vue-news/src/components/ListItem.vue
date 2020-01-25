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
            <template v-if="item.user">
              {{ item.time_ago }} by
              <router-link class="link-text" v-bind:to="`/user/${item.user}`">{{
                item.user
              }}</router-link>
            </template>
            <template v-else>
              {{ item.time_ago }} in
              <a :href="item.url">
                {{ item.domain }}
              </a>
            </template>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.list;
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
