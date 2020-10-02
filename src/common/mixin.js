import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener:null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 2000)

    //对监听事件进行保存
    this.itemImageListener = () => {
      this.refresh()
      //无防抖函数的写法
      // this.$refs.scroll.refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImageListener)
    // console.log('我是混入的内容');
  },
}

export const backTop = {

  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // console.log('回到上面');
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 200)
    },
  }
}
