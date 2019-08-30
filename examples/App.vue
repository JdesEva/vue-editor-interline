<template>
  <div id="app">
    <div v-html="data"></div>
    <div>
      <vueEditor
        debug
        v-model="data"
        baseUrl="http://121.43.198.71:8080"
        action="http://121.43.198.71:8080/image/upload.html"
        :option="{fontNames : [
            '宋体',
            '隶书',
            '微软雅黑',
            'Arial',
            'Tahoma',
            'Verdana'
        ]}"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data: '<h1>1234213123</h1>'
    }
  }
}
</script>

<style>
</style>
