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
- vue
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
  - babel : es6 변환, eslint: 스타일체크
