<template>
  <div id="app">
    <div class="w-e-text-container">
      <div class="w-e-text no-scroll" v-html="data"></div>
    </div>
    <div>
      <vueEditor
        ref="vRef"
        debug
        v-model="data"
        :option="{
          fontNames: ['宋体', '隶书', '微软雅黑', 'Arial', 'Tahoma', 'Verdana']
        }"
      />
    </div>
    <div>{{ data }}</div>
    <button @click="clear">清空</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data:
        '<h1><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2128793678,3531069644&fm=26&gp=0.jpg" style="max-width:30%;"></h1>'
    }
  },
  methods: {
    clear() {
      this.$refs.vRef.clear()
    }
  }
}
</script>

<style>
</style>
