# vuejs-playground

**vuejs playground ! ! !**

## 강의

[inflearn vuejs 시작하기](https://www.inflearn.com/course/Age-of-Vuejs)

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

## 라우터

- spa, 페이지 이동을 위한 라이브러리
- routes : 페이지의 라우팅 정보
- path : 페이지 url
- component : url 로 갔을 때 보여질 컴포넌트

```html
<div id="app">
  <router-view></router-view>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

```

```javascript
new Vue({
  el: '#app',
  router: myRouter
});
```

## tip

### vscode

- ! : auto write html format
- div#app : auto write tag and id (tag + css selector + attr)

### etc

- javascript -> mdn 주로 검색
