<template>
  <div>
    <p>{{ askItem.title }}</p>
    <div>
      {{ askItem.content }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    askItem() {
      return this.$store.state.askItem;
    }
  },
  created() {
    const itemId = this.$route.params.id;
    this.$store.dispatch('FETCH_ASK_ITEM', itemId);
  }
}
</script>

<style>

</style>