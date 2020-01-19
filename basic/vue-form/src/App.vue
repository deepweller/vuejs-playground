<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <!-- 2-way data binding -->
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="password">password: </label>
      <input type="text" id="password" v-model="password" />
    </div>
    <!-- event 버블링, 캡쳐링 -->
    <button type="submit">login</button>
    <Test></Test>
  </form>
</template>

<script>
import axios from "axios";
import Test from './Test.vue';

export default {
  //컴포넌트간 데이터가 공유되지 않도록 function return 으로 새 객체를 리턴해주도록 한다.
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    Test
  },
  methods: {
    submitForm: function() {
      //vue.config.js 파일 린트 에러를 화면에 표시하지 않도록 설정
      // console.log(this.username, this.password);

      // form submit 시 디폴트로 페이지 새로고침 하지 않도록 설정
      // event.preventDefault(); == v-on:submit.prevent

      var url = "https://jsonplaceholder.typicode.com/users";
      var data = {
        username: this.username,
        password: this.password
      };
      axios
        .post(url, data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
