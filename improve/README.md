# vuejs-playground

[강의 : inflearn vuejs 완벽가이드](https://www.inflearn.com/course/vue-js)  
강의 듣고 정리하기  
강의 듣고 따라하기  

## 개발환경

- chrome
- npm
- vscode
  - 기본과 동일
  - tslint
- vue, vue-router, vuex
- github
- [스타일가이드](https://vuejs.org/v2/style-guide/)

## application 제작

### project setting

- [hacker news](https://news.ycombinator.com/)
  - show, ask, jobs 페이지 사용
- api: [hacker news api](https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md)
  - show, ask, jobs api 사용
- router design
  - news, ask, jobs 각각 페이지
  - 질문페이지
  - 사용자 상세정보
- vue cli
  - 명령어
    - 2.x -> `vue init webpack-simple vue-news`
    - 3.x -> `vue create vue-cli3`
  - 웹팩 설정 파일 (webpack.config.js 파일의 여부)
    - 2.x -> 노출
    - 3.x -> 미노출
  - 프로젝트 구성
    - 2.x: 깃헙의 템플릿 다운로드
    - 3.x: 플러그인 기반 기능 추가
  - es6
    - 2.x: 필요없음
    - 3.x: 필요
- `vue create vue-news` 프로젝트 생성
  - preset : 프로젝트 시작을 위한 기본 플러그인 구성
  - babel : es6 변환, eslint: 문법체크
- `npm run serve` 로컬 웹서버 실행
- eslint
  - javascript syntax helper
  - ignore error
    - `/* eslint-disable */` 컴포넌트 스크립트마다 입력
    - `vue-news/vue.config.js` 생성 후 아래 코드 입력
    - [lintOnSave](https://cli.vuejs.org/config/#pages)

### router 추가

- `npm i vue-router --save`
- package.json 내에 dependencies에 추가
  - 배포할때도 필요한 라이브러리가 위치해야함.
- main.js
  - main.js는 어플리케이션의 설정, 플러그인, 라이브러리 등을 표현할 수 있는 청사진 구조여야함
  - 라우터는 분리하는 것이 좋음
  - `src/router/index.js`
- src/views 폴더
  - 라우터에 들어가는 컴포넌트(화면) 이 들어갈 dir
  - .vue 파일들
- `<router-link></router-link>` : a tag 치환
- `import { router } from './router/index.js';` 와 `import router from './router/index.js';` 의 차이
  - export default를 {} 없이 받아올 수 있음
  - export default는 한개만 export할 수 있음
  - 나머지 export는 name 을 {}로 묶어서 사용

#### component

- `<ToolBar></ToolBar>` vs `<tool-bar></tool-bar>`
  - 카멜케이스 : 대문자로 시작하기 때문에 명시적으로 컴포넌트로 알 수 있음, vue에서 강력하게 권장함.
  - 케밥케이스 : 타이핑 시 자동완성이 되서 생산성에 좋음, cmd + click으로 파일도 찾아가기 원활함.
- test
- `<style scoped>` : 해당 컴포넌트에만 스타일이 적용되도록 하는 옵션
  - `display: flex;` : https://heropy.blog/2018/11/24/css-flexible-box/ | https://webdir.tistory.com/349
  
### api

#### dir 구조

- views : routing 정보만 담은 화면 컴포넌트, axios나 로직이 들어가면 안됨. 페이지 역할을 하는 컴포넌트는 데이터를 fetch 하는 로직이 들어가면 좋지 않음
  - views 컴포넌트는 유연하게 대응할 수 있어야함
  
#### lifecycle

- component가 생성되자마자 실행되는 로직

```javascript
created: function() {
}
created() {
}
```

- beforMount: created와 같이 data를 받아올 때 주로 사용
- mounted
  - 마운트 후에 data 속성에 할당하게 되면, 뷰의 reactivity에 의하여 화면이 다시 그려지게 된다.
  - https://vuejs.org/v2/guide/reactivity.html#ad

### vuex

![vuex](./imgs/vuex.png)
- 상태관리도구
  - 여러 컴포넌트에서 공유되는 속성
  - 컴포넌트 레벨이 복잡해 졌을 때 컴포넌트간 데이터 공유가 용이해짐
- 컴포넌트마다 api를 불러오지 않도록 변경
  - api -> newsView >>> api -> vuex -> newsView
  - vuex의 state에 값을 담아서 화면에 표시
- 설치: `npm i vuex`
- store 패키지 하위에 생성

#### action

- 비동기 호출
- context 인자로 mutation을 호출

#### mutation

- 액션에서 받아온 api 결과 데이터를 state로 전달.

#### state

- 컴포넌트에서 공유가능

#### getters

- vuex에 있는 computed와 동일한 속성
- {{ }} 사용

```html
<div v-for="item in this.$store.state.news">{{ item.title }}</div>
```

- mapstate or computed 사용
- ...: https://joshua1988.github.io/es6-online-book/spread-operator.html 참고

```javascript
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      asks: state => state.asks
    })
    // ask() {
    //   return this.$store.state.asks;
    // }
  },
  created() {
    this.$store.dispatch("FETCH_ASK");
  }
};
```
- vuex getter 사용

```javascript
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      asks: 'fetchedAsk'
    })
  },
  created() {
    this.$store.dispatch("FETCH_ASK");
  }
};

//store
getters: {
  fetchedAsk(state) {
    return state.asks;
  }
}
```

#### 정리

- component >> api >> actions >> mutation >> state >> component
  - component >> api : this.$store.dispatch('액션명');
  - api >> actions : api/index.js 사용(axios)
  - actions >> mutation : context.commit('mutation명', 전달데이터)
  - mutation >> state : state.스테이트명 = 전달데이터;
  - state >> component : this.$store.state.스테이트명

### 다이나믹 라우터 매칭

- https://router.vuejs.org/guide/essentials/dynamic-matching.html
- route
  - `path: /user/:id`
- view
  - `<router-link v-bind:to="`/user/${item.user}`">{{ item.user }}</router-link>`

### 스타일링

- 아이콘 : https://fontawesome.com/
- rem vs em vs px
  - https://webdesign.tutsplus.com/ko/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984
- `display: flex;`
  - https://heropy.blog/2018/11/24/css-flexible-box/
- 공용 태그 스타일링 : App.vue
- 각각 컴포넌트 스타일링 : <style scoped>

#### v-html
- html 태그 변환
- https://vuejs.org/v2/guide/syntax.html#Raw-HTML
- https://vuejs.org/v2/api/#v-html

### router transitions

- 라우터 뷰를 트랜지션으로 감싸서 사용하면 뷰 내부적으로 트랜지션 이펙트를 사용할 수 있음
- https://router.vuejs.org/guide/advanced/transitions.html#per-route-transition
- https://vuejs.org/v2/guide/transitions.html

```html
<transition name="page">
  <router-view></router-view>
</transition>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
```

### 컴포넌트 설계

- view에서 component를 사용

![vuex](./imgs/component-design.png)

1. view에서 props로 component에 데이터를 넘겨줌
2. view에서 조회한 store.state를 component에서 그대로 사용

- props로 받은 데이터 형식이 약간씩 다를 때
  - slot 태그 사용
  - `v-if`로 구분하지 않고, 컴포넌트 등록할 때 필요한 내용을 채움
- component (userProfile)

```html
<slot name="username"></slot>
  <div class="time">
    <slot name="time"></slot>
  </div>
<slot name="karma"></slot>
```

- view 1

```html
<user-profile :info="userInfo">
  <div slot="username">{{ userInfo.id }}</div>
  <template slot="time">{{ userInfo.created }}</template>
  <div slot="karma">{{ userInfo.karma }}</div>
</user-profile>
```

- view 2

```html
<user-profile :info="fetchedItem">
  <div slot="username">{{ fetchedItem.user }}</div>
  <template slot="time">{{ fetchedItem.time_ago }}</template>
</user-profile>
```

#### hoc 하이오더컴포넌트

- 컴포넌트의 로직을 재사용하기 위한 기술
- 뷰 믹스인 vs 리엑트의 훅
- 라우터에서 컴포넌트를 기존 사용하던 중복 컴포넌트가 아닌, hoc를 등록

```javascript
export const router = new VueRouter({
    routes: [
      {
        path: '/news',
        name: 'news',
        component: createListView('NewsView')
      },
      {
        path: '/ask',
        name: 'ask',
        component: createListView('AskView')
      },
      {
        path: '/jobs',
        name: 'jobs',
        component: createListView('JobsView')
      }
});
```

```javascript
export default function createListView(name) {
  return {
    name,
    created() {
      bus.$emit('start:spinner');
      this.$store
        .dispatch('FETCH_LIST', this.$route.name)
        .then(() => {
          bus.$emit('end:spinner');
        })
        .catch();
    },
    render(createElement) {
      return createElement(ListView);
    }
  };
}
```

#### mixins

- 컴포넌트간 공통으로 사용하고 있는 로직을 재사용하는 방법

```javascript
import bus from '../utils/bus.js';

export default {
  //재사용할 컴포넌트 옵션
  created() {
    bus.$emit('start:spinner');
    this.$store
      .dispatch('FETCH_LIST', this.$route.name)
      .then(() => {
        bus.$emit('end:spinner');
      })
      .catch();
  }
}
```

```html
<template>
  <div>
    <list-item></list-item>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';
import ListMixin from '../mixins/ListMixin.js';

export default {
  components: {
    ListItem
  },
  mixins: [ListMixin]
}
</script>

<style></style>
```

#### hoc vs mixins

- hoc는 컴포넌트 레벨이 깊어진다. 컴포넌트 통신이 불편해짐.

```javascript
//mixin
export default {
  //재사용할 컴포넌트 옵션
}

//hoc
export default function createItem() {
  //재사용할 컴포넌트 옵션
}
```

### 라우터 개선

#### 데이터 호출 시점

1. 컴포넌트 라이프 사이클 훅을 이용 (created)
1. 컴포넌트에 진입하기 전 라우터 네비게이션 가드를 이용

- created
  - 컴포넌트 인스턴스가 생성되자마자 호출
  - 뷰의 동작, 데이터 동작, 컴퓨티드, 메서드, 와치, 콜백 등에 접근 가능
  - 화면에 보여지는 상태는 아님
- router navigation guard
  - https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/
  - 특정 url로 접근하기 전의 동작을 정의하는 속성, 로직
  - **created 보다 먼저 호출됨**
  - store의 한 상태를 여러 화면에서 공유하고 있을 때, 화면내용이 겹치는 부분을 해결하는 방법

```javascript
{
  path: '/news',
  name: 'news',
  component: createListView('NewsView'),
  beforeEnter: (to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    next();
  }
},
```

- `next()` 를 호출해야마나 `to` 로 이동할 수 있음.
- `this.$route` 나 `this.$store` 의 this는 뷰 컴포넌트 내에서만 사용할 수 있음. 외부에서 사용하기 위해서는 import 해야함
- `this.$route.name` == beforeEnter의 `to.name`

```javascript
import { store } from '../store/index.js';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', //# 해시 제거
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'news',
      component: createListView('NewsView'),
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_LIST', to.name)
          .then(() => {
//... 생략
```

## 컴포넌트 디자인패턴

### Common - 기본적인 컴포넌트 등록과 컴포넌트 통신

- 일반적인 컴포넌트 등록과 통신
- App.vue

```html
<template>
  <div>
    <app-header :title="appTitle"></app-header>
    <app-content :items="items" @renew="renewItems"></app-content>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppContent from './components/AppContent.vue';
export default {
  components: {
    AppHeader,
    AppContent,
  },
  data() {
    return {
      appTitle: 'Common Approach',
      items: [10, 20, 30],
    }
  },
  methods: {
    renewItems() {
      this.items = [40, 50, 60];
    },
  },
}
</script>
```

- content.vue

```html
<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
    <!-- 별도 메서드 구현하지 않고 태그 내에서 바로 이벤트 발생 시킬 수 있음. -->
    <button @click="$emit('renew')">renew items</button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array, //type 정의
      required: true,
    },
  },
}
</script>
```

- header.vue

```html
<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    title: String, //type 정의
  }
}
</script>
```

### Slot - 마크업 확장이 가능한 컴포넌트

- 정의하는 곳에서 dom 구조 및 스타일 등을 자유롭게 정의할 수 있음
- props
  - 유연하지 않음. 요구사항이 변경되면 컴포넌트를 못쓰게 됨.
- slot
  - 컴포넌트를 유연하게 사용할 수 있음.
  - slot만 추가해서 해당 부분에 추가적인 내용을 넣으면 되기 때문
- app.vue

```html
<template>
  <div>
    <ul>
      <!-- <item></item> : 일반적인 컴포넌트 사용, slot은 컴포넌트 태그 내에 내용이 있음. -->
      <item>아이템 1</item>
      <item>아이템 2 <button>click me</button></item>
      <item>아이템 3 <div><img src"./test.png"></div></item>
      <item>아이템 4 <div style="color: blue;">text</div></item>
      <item>아이템 5</item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';
export default {
  components: {
    Item,
  }
}
</script>
```

- item.vue

```html
<template>
  <li>
    <slot>
      <!-- 컴포넌트 태그 내에 들어가있는 내용이 표시되는 영역  -->
      <!-- NOTE: 등록하는 곳에서 정의할 화면 영역 -->
    </slot>
  </li>
</template>
```

### Controlled - 결합력이 높은 컴포넌트

- 컴포넌트를 아주 세부적으로 나누는 경우 사용
- props로 내린 값을 하위 컴포넌트에서 v-model로 사용할 수 없음 > props 값을 하위컴포넌트에서 변경하면 안되기 때문(하위 컴포넌트는 emit을 사용해야함)
- v-model로 값을 내리면 value로 하위컴포넌트로 전달되고 해당 값으로 변경하는 방법
- app.vue

```html
<template>
  <check-box v-model="checked"></check-box>
</template>

<script>
import CheckBox from './components/CheckBox.vue';
export default {
  components: {
    CheckBox
  },
  data(){
    return{
       checked: false
    }
  },
  
}
</script>
```

- checkbox.vue

```html
<template>
  <input type="checkbox" :value="value" @click="toggleCheckBox"/>
</template>

<script>
export default {
  //v-model
  //@input 이벤트
  //:value 값 
  props: ['value'], //false
  methods:{
    toggleCheckBox(){
      this.$emit('input',!this.value)
    }
  }
}
</script>
```

### Renderless - 데이터 처리 컴포넌트

- render() : 컴포넌트를 그리는 역할
  - `this.$scopedSlots` : 컴포넌트의 표현식
  - 아래 3개가 동일한 내용

```javascript
{{ message }}

data: {
  message: 'hello'
}
```

```javascript
...
template: '<p>{{ message }}</p>'
```

```javascript
render: function(createElement) {
  //return createElement('태그이름', '태그속성', '하위태그내용');
  return createElement('p', this.message);
}
```

```javascript
new Vue({
  render: h => h(App), // vitual dom의 약자가 h = createElement
  //동일한 내용
  render: function(createElement) {
    return createElement(App);
  }
}).$mound('#app');
```

- 표현을 하지 않는 컴포넌트
- 데이터만 제공(data provider)
- App.vue

```html
<template>
  <div>
    <fetch-data url="https://jsonplaceholder.typicode.com/users/1">
      <!-- ... -->
      <div slot-scope="{response, loading}">
        <div v-if="!loading">
          <p>name : {{response.name}}</p>
          <p>email : {{response.email}}</p>
        </div>
        <div v-if="loading">loading...</div>
      </div>
      
    </fetch-data>
  </div>
</template>

<script>
import FetchData from './components/FetchData.vue'
export default {
  components: {
    FetchData
  },
}
</script>
```

- FetchData.vue

```html
  
<script>
import axios from 'axios';
export default {
  props: ['url'],
  data() {
    return {
      response: null,
      loading: true,
    }
  },
  created() {
    axios.get(this.url)
      .then(response => {
        this.response = response.data;
        this.loading = false;
      })
      .catch(error => {
        alert('[ERROR] fetching the data', error);
        console.log(error);
      });
  },
  render() {
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
    });
  },
}
</script>
```

## 배포

### command

**`npm run build`**

- index.html, favicon
- css, fonts, img, js
- package.json 내에 scripts 부분에 npm run 명령어가 정의되어 있음

### test deploy

- https://www.netlify.com/ : 호스팅 사이트
- github repos 와 연동하여 배포 가능
- jenkins와 비슷하게 설정 가능
  - target branch
  - build command
  - target dir
  - build, deploy log

### router 관련 설정

- vue-cli deploy guide : https://cli.vuejs.org/guide/deployment.html#netlify
- `/public/_redirects`
  - spa는 클라이언트사이드랜더링이기 때문에 라우팅경로에 대한 정보는 클라이언트에 있으며, 서버에서 알 수 없음
  - 브라우저만 알고 있는 정보들을 서버에 설정해줘야함
    - netlify: `/* /index.html 200` : 모든 요청을 index.html로 전달

### env config

- 환경변수
- `.env` 파일 생성
  - webpack : DefinePlugin 사용
  - vue-cli 3 : 환경변수 name에 `VUE_` prefix 추가

```env
# Test env
APP_TITLE=TITLE
VUE_APP_TITLE=TITLE
```

```javascript
console.log(process.env.APP_TITLE); //undefined
console.log(process.env.VUE_APP_TITLE); //TITLE
```

## es6

### template string

```javascript
const config = {
  baseUrl: 'https://api.hnpwa.com/v0'
};

return axios.get(config.baseUrl + '/news/1.json');
return axios.get(`${config.baseUrl}/news/1.json`);
```

### =>

```javascript
var vm = this;
fetchJobsList()
  .then(function(response) {
    vm.jobs = response.data;
  })
  .catch(function(error) {});
}
//위 아래 동일
fetchJobsList()
  .then(response => this.jobs = response.data)
  .catch(error => console.log(error));
```

### this

- 가장 최상단 객체 window
- 전역범위. (다른 언어에서의 this는 지역범위에서 확장되는것과 반대)

```javascript
console.log(this); //window
```

```javascript
function sum(a, b) {
  console.log(this); //window
  return a + b;
}
```

```javascript
'use strict'
function sum(a, b) {
  console.log(this); //undefined
  return a + b;
}
```

```javascript
function Vue(el) {
  console.log(this); //Vue {}, 함수 객체 자체
  this.el = el;
}
```

```javascript
console.log(this); //VueComponent
fetchAskList()
.then(function(response) {
  console.log(this); //undefined
})
.catch(function(error) {});
```

- 비동기 호출 : 기존 this를 벗어난 this가 생성됨.
- => 함수 : this가 비동기 함수 내 this가 아닌 원래의 객체 this를 가리킴.
  - => 함수 추천!

### 비동기처리

#### callback

- 함수 종료시에 실행되는 함수
- 함수를 파라미터로 전달하고 그 함수가 콜백함수

```javascript
var result = [];
//jquery
$.ajax({
  url: 'https://www.naver.com/api/',
  succcess: function(data) {
    result = data;
  }
});
console.log(result); //[]
```

#### promise

- then, cathc 체이닝을 위해서는 상위 함수가 promise 객체를 리턴해줘야함
- promise는 resolve, reject를 파라미터로 가짐

```javascript
function callAjax() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: 'https://www.naver.com/api/',
      succcess: function(data) {
        resolve(data); //resolve -> then() 으로 연결
      }
    });
  });
}

function fetchData() {
  callAjax()
    .then(function(data) {
      console.log(data);
    })
}
```

#### async & await

- callback

```javascript
$.get('domain.com/id', function(id) {
  if(id === 'test') {
  $.get('domain.com/products', function(products) {
    console.log(products);
  });
}  
});
```

- promise

```javascript
function getId() {
  return new Promise(function(resolve, reject){
    $.get('domain.com/id', function(id) {
      resolve(id);
    })
  })
}

getId().then(function(id) {
  if(id === 'test') {
  $.get('domain.com/products', function(products) {
    return new Promise(...)
  });
})
.then(function(products) {
  console.log(products);
})
.catch();
```

- async & await : https://joshua1988.github.io/web-development/javascript/js-async-await/
- async 함수 내에는 await가 반드시 있어야함.

```javascript
asycn function fetchData() {
  await getUserList(); //이 함수는 반드시 promise를 리턴해야함
}
```

```javascript
function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1, 2, 3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems);
}
```

- callback, async 비교

```javascript
methods: {
  //callback
  loginUser1() {
    axios.get('https://jsonplaceholder.typicode.com/user/1')
      .then(response => {
        if(response.data.id === 1) {
          console.log('사용자가 인증되었습니다.');
          axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
              this.items = response.data;
            });
        }
    });
    .catch(error => console.log(error));
  },
  //async await
  async loginUser2() {
    try {
      var response = await axios.get('https://jsonplaceholder.typicode.com/user/1');
      if(response.data.id === 1) {
        console.log('사용자가 인증되었습니다.');
        var list = await axios.get('https://jsonplaceholder.typicode.com/todos');
        this.items = list.data;
      }
    } catch(error) {
      console.log(error);
    }
  }
}
```

### Destructuring

- 구조 분해 문법
- https://joshua1988.github.io/es6-online-book/destructuring.html

```javascript
FETCH_ASK(context) {
      fetchAskList()
        .then(res => {
          context.commit('SET_ASK', res.data);
        })
        .catch();
    },
//위와 동일    
FETCH_JOBS({ commit }) {
  fetchJobsList()
    .then(({ data }) => {
      commit('SET_JOBS', data);
    })
    .catch();
}
```

## tip

- chrome network tap 에서 `Online` > `slow 3g` 로 하면 데이터를 느리게 받아올 수 있음
