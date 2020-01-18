<template>
  <div>
    <p v-for="job in this.$store.state.jobs">
      <a v-bind:href="job.url">
        {{ job.title }}
      </a>
      <small>{{ job.time_ago }}, {{ job.domain }}</small>
    </p>
  </div>
</template>

<script>
import { fetchJobsList } from "../api/index.js";

export default {
  created() {
    this.$store.dispatch('FETCH_JOBS');
  }
};
</script>

<style></style>
