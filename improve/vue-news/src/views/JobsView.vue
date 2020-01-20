<template>
  <div>
    <ul class="jobs-list">
      <li v-for="job in this.$store.state.jobs">
        <div class="job">
          <p class="jobs-title">
            <a v-bind:href="job.url">
              {{ job.title }}
            </a>
          </p>
          <small class="link-text">{{ job.time_ago }}, <a v-bind:href="job.url">{{ job.domain }}</a></small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('FETCH_JOBS');
  }
};
</script>

<style scoped>
.jobs-list {
  margin: 0;
  padding: 0;
}
.job {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 8px;
}
.jobs-title {
  margin: 0;
}
.link-text {
  margin-left: 4px;
  color: #828282;
}
</style>
