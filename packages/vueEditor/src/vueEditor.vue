<!-- vueEditor -->
<template>
  <div class="vueEditor">vueEditor</div>
</template>

<script>
// eslint-disable-next-line semi
import Editor from 'wangeditor';

export default {
  name: 'vueEditor',
  props: {
    value: [String, Number],
    option: Array
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {},
  data () {
    // 这里存放数据
    return {
      editor: null,
      content: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
