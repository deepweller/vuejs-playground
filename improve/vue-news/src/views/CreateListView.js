import ListView from './ListView.vue';
import bus from '../utils/bus.js';

//hoc
export default function createListView(name) {
  return {
    // 재사용할 컴포넌트(인스턴스) 옵션
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
      //내부적으로 컴포넌트 템플릿을 컴파일, 로딩
      return createElement(ListView);
    }
  };
}
