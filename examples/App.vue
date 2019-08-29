<template>
  <div id="app">
    <div v-html="data"></div>
    <Editor v-model="data" />
  </div>
</template>

<script>
// eslint-disable-next-line semi
import Editor from '../packages';

export default {
  name: 'app',
  data () {
    return {
      data: ''
    }
  },
  components: {
    Editor
  }
}
</script>

<style>
</style>
