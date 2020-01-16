<template>
  <div>
    <div v-for="user in users">{{ user.title }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    var vm = this;
    // => syntax 사용 전
    axios
      .get("https://api.hnpwa.com/v0/news/1.json")
      .then(function(response) {
        vm.users = response.data;
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
        
      });
  }
};
</script>

<style></style>
