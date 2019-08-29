import vueEditor from './src/vueEditor'

vueEditor.install = function (Vue) {
  Vue.component(vueEditor.name, vueEditor)
}

export default vueEditor
