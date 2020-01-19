<template>
  <div>{{ askItem }}</div>
</template>

<script>
export default {
  computed: {
    askItem() {
      return this.$store.state.askItem;
    }
  },
  created() {
    const itemId = this.$route.query.id;
    this.$store.dispatch('FETCH_ASK_ITEM', itemId);
  }
}
</script>

<style>

</style>