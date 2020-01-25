import ListView from './ListView.vue';
import bus from '../utils/bus.js';

export default function createListView(name) {
  return {
    // 재사용할 컴포넌트(인스턴스) 옵션
    naem: name,
    created() {
      bus.$emit('start:spinner');
      setTimeout(() => {
        this.$store.dispatch('FETCH_LIST', this.$route.name)
          .then(() => {
            bus.$emit('end:spinner');
          })
          .catch();
      }, 2000);
    },
    render(createElement) {
      //내부적으로 컴포넌트 템플릿을 컴파일, 로딩
      return createElement(ListView);
    }
  };
}
