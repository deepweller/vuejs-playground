# vuejs-playground

**vuejs playground ! ! !**

## 내용

[강의 : inflearn vuejs 시작하기](https://www.inflearn.com/course/Age-of-Vuejs)  
강의 듣고 정리하기  
강의 듣고 따라하기  

## 개발환경

- chrome
  - vuejs devtool extension
- node stable
- vscode
  - vetur
  - night owl
  - material icon theme
  - eslint
  - prettier
  - auto close tag
  - intellij keymap
  - live server
  - markdown preview

## vuejs

### mvvm

- view : 화면, hmlt(dom)
- dom listener : event -> change javascript data or run javascript logic
- 핵심 : 반응성 reactivity (Object.defineProperty())

### 인스턴스

```javascript
var vm = new Vue();
```

- 함수이름이 대문자 : 생성자 함수 -> Vue 도 생성자 함수로 생성하는 이유

```javascript
//생성자 함수
function Person(name, job) {
  this.name = name;
  this.job = job;
}
var p = new Person("test", "developer");

function Vue() {
  this.logText = function() {
    console.log("hello");
  };
}

var vm = new Vue();
vm.logText();
```

### 컴포넌트

- 화면을 영역별로 분리(헤더, 컨텐츠, 사이드 등등)
- Vue 인스턴스를 생성하면 root component 가 된다.
- 전역컴포넌트, 지역컴포넌트
  - 지역 : 일반적으로 사용, 하단에 등록된 컴포넌트를 알 수 있음
  - 전역 : 대부분 플러그인, 라이브러리 용

```javascript
//전역
Vue.component();

new Vue({
  //지역
  components: {
    //s 주의
  },
  methods: {
    //s 주의
  }
});
```

#### 통신

- 상위(부모)컴포넌트, 하위(자식)컴포넌트
- 컴포넌트는 각각 데이터를 갖는다. 컴포넌트간 데이터를 공유하기위해서는 이벤트 속성을 사용해야함. (props, emit)
  - 데이터의 흐름을 추적할 수 있다.
- props -> v-bind:프롭스 속성 이름="상위 컴포넌트의 데이터 이름"
  - reactivity

```html
<app-header v-bind:propsdata="message"></app-header>
```

```javascript
var appHeader = {
    template: '<h1>{{propsdata}}</h1>',
    props: ['propsdata']
}
new Vue({
    el: '#app',
    components: {
        'app-header': appHeader
    },
    data: {
        message: 'hi'
    }
});
```

- emit -> v-on:하위 컴포넌트에서 발생한 이벤트 이름="상위 컴포넌트의 메서드 이름"
  - reactivity

```html
<app-content v-on:increase="increaseNumber"></app-content>
```

```javascript
var appContent = {
  template: '<button v-on:click="addNumber">add</button>',
  methods: {
      addNumber: function() {
          this.$emit('increase');
      }
  }
};

var vm = new Vue({
  el: "#app",
  components: {
    'app-content': appContent
  },
  methods: {
    increaseNumber: function() {
      this.num += 1;
    }
  },
  data: {
    num: 10
  }
});
```

- 같은 레벨의 컴포넌트간 통신
  - 상위컴포넌트로 event $emit
  - 상위컴포넌트에서 data 로 받음
  - 상위컴포넌트에서 다른 컴포넌트로 props 전달

#### this

```javascript
var obj = {
  num: 10,
  getNumber: function() {
    console.log(this.num); //this = obj
  }
}

var Vue = {
  methods: {
    getNumber: function() {
      this.num //this = vue.data.*
      //vue 의 data 에 담긴 데이터는 vue 의 어떠한 동작에 의해서 vue 바로 하위에 들어감
      //console.log(Vue); 로 확인
    }
  },
  el: '',
  data: {
    num: 10
  }
}

```

### 라우터

- spa, 페이지 이동을 위한 라이브러리
- routes : 페이지의 라우팅 정보
- path : 페이지 url
- component : url 로 갔을 때 보여질 컴포넌트
- `mode: 'history'` : url 에 해시(#) 이 사라짐

```html
<div id="app">
  <router-view></router-view>
</div>
<!-- 선언순서 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

```

```javascript
new Vue({
  el: '#app',
  router: myRouter
});
```

#### 링크

- `<router-link></router-link>` : a 태그로 변환

```html
<!-- == <a href="/login">Login</a> -->
<router-link to="/login">Login</router-link>
<router-link to="/main">Main</router-link to="/main">
```

### axios

- 뷰에서 권고하는 http 통신 라이브러리
  - [https://github.com/pagekit/vue-resource](https://github.com/pagekit/vue-resource) : axios이전 사용하던 라이브러리(현재는 지원 X, 오래된 샘플에서 사용)
  - ajax : 전체를 서버에서 받아오지 않고 부분만 비동기로 통신하는 방법
- [axios github](https://github.com/axios/axios)
  - promise 기반 nodejs, browser 의 http 클라이언트
  - feature, browser 호환성 확인
  - readme에서 내용 확인
- this  
  - axios 호출 전 this : 호출 컴포넌트
  - axios 호출 후 this : window
  - [자바스크립트의 동작원리: 엔진, 런타임, 호출 스택](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)
- 브라우저(클라이언트) : http 요청
- 서버 : http 응답

### 템플릿 문법

#### 데이터 바인딩

- `{{ }}` : data 속성 안에 있는 내용을 바인딩
- computed : data 속성 내의 값에 따라 바뀌는 값을 정의할 때
- 단순 표현식뿐만 아니라 dom 속성도 실시간으로 바꿔준다.

```html
<p v-bind:id="uuid" v-bind:class="name">{{ num }}</p>
```

#### 디렉티브

- `v-xx`
  - `v-bind`
  - `v-if`, `v-else`
  - `v-show` : if와 차이점 > if는 dom을 아예 제거하고, show는 `display: none` 으로 설정함
  - `v-model`
  - `v-on` : `v-on:click`, `v-on:keyup`, `v-on:keyup.enter`

#### watch

- data 속성 내 값의 변화에 따라서 특정 로직을 실행시킬 수 있음

```javascript
new Vue({
  el: '#app',
  data: {
    num: 10
  },
  watch: {
    num: function() {
      this.logText();
    }
  },
  methods: {
    logText: function() {
      console.log('changed');
    }
  }
})
```

- computed와 차이점
  - computed
    - computed 는 data 속성에 의존성이 있다. 
    - 빠르게 계산
    - 캐싱
    - validation에 유용
  - watch
    - watch 는 특정 로직을 수행
    - 무거운 로직을 수행
  - computed가 대부분의 경우에 적합하다. computed를 추천함. watch는 조금 지저분한 코드가 될 수 있음.
  - [공식문서 참고](https://kr.vuejs.org/v2/guide/computed.html#computed-%EC%86%8D%EC%84%B1-vs-watch-%EC%86%8D%EC%84%B1)

## vue cli

### 설치

- vue command line interface 명령어 실행도구
- [vue-cli](https://cli.vuejs.org)
- nodejs version 10 이상
- npm version 6 이상
  - update : `npm i -g npm to update`

```bash
node -v
npm -v
npm install -g @vue/cli
```

- 설치 시 퍼미션 에러
  - 설치 폴더에 w 권한이 필요 (sudo 권한으로 설치 명령 실행)
- 설치경로 `/usr/local/lib/node_modules`, `npm list -g`

### vue cli 2.x, 3.x 차이

#### 2.x

- `vue init '프로젝트 템플릿 유형' '프로젝트 폴더 위치'`
  - `vue init webpack-simple '프로젝트 폴더 위치'`

#### 3.x

- `vue create '프로젝트 위치'`
  - `vue create vue-cli`

```bash
cd vue-cli
npm run serve
```

## tip

### javascript

#### 비동기 처리 패턴

- callback
- promise
- promise + generator
- async & await
- [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
- [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
- [자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)

### vscode

- ! : auto write html format
- div#app : auto write tag and id (tag + css selector + attr)
- router-link*2 = `<router-link></<router-link><router-link></<router-link>`

### etc

- javascript -> mdn 주로 검색
- 깃헙 오픈소스 사용 시
  - star 수 확인(인지도)
  - commits, contributors 수 확인
  - 최근 커밋 된 일시 확인
  - readme
- test api 있는 곳
  - [jsonplaceholder](https://jsonplaceholder.typicode.com/)
  - 여기서 테스트 데이터 샘플로 이것저것 받아볼 수 있음
- http
  - [프런트엔드 개발자가 알아야하는 HTTP 프로토콜](https://joshua1988.github.io/web-development/http-part1/)
- 필요정보 검색
  - [vuejs 공식 페이지](https://vuejs.org/)
  - 검색창에서 검색
