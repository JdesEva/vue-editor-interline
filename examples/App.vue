<template>
  <div id="app">
    <div v-html="data"></div>
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data:
        '<h1><img src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1575347790997&amp;di=d816bff523e10ad7bae7c68157fca9c1&amp;imgtype=0&amp;src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F21%2F20181221074141_PSkAY.jpeg" style="max-width:30%;"></h1>'
    }
  }
}
</script>

<style></style>
