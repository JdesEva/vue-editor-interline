<template>
  <div id="app">
    <div class="w-e-text-container">
      <div class="w-e-text no-scroll" v-html="data"></div>
    </div>
    <div>
      <vueEditor
        debug
        v-model="data"
        baseUrl="http://192.168.10.11:8082"
        action="http://192.168.10.11:8082/image/batch/upload.html"
        :option="{
          fontNames: ['宋体', '隶书', '微软雅黑', 'Arial', 'Tahoma', 'Verdana']
        }"
      />
    </div>
    <div>{{ data }}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data:
        '<h1><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591092508544&di=aca97936da2e340002d3347f9901c94b&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F30e612de987990df871552237a35d904656d8e2e.jpg" style="max-width:30%;"></h1>'
    }
  }
}
</script>

<style>
</style>
