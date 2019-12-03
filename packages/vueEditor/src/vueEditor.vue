<!-- vueEditor -->
<template>
  <div class="vueEditor">
    <div ref="editor" />
  </div>
</template>

<script>
import Editor from 'jsy-editor'
import 'jsy-editor/lib/index.min.css'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'vueEditor',
  components: {},
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    },
    toolBar: {
      type: Array,
      default: () => [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
    },
    action: {
      type: String,
      default: () => ''
    },
    fileName: {
      type: String,
      default: () => 'files'
    },
    baseUrl: {
      type: String,
      default: () => ''
    },
    size: {
      type: Number,
      default: () => 2
    },
    limit: {
      type: Number,
      default: () => 10000
    },
    data: {
      type: Object,
      default: () => {}
    },
    merge: {
      type: Boolean,
      default: () => false
    },
    debug: {
      type: Boolean,
      default: () => false
    },
    hook: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    // 这里存放数据
    return {
      editor: null,
      content: '',
      reg: /<\/?.+?\/?>/g // 截取标签内容
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    /**
     * 原理
     * 1. 首先监听props中v-model绑定的值的变化
     *    如果值改变了，存在以下几种情况
     *    · 富文本内容为空，证明这是第一次打开，将v-model的值绑定到富文本框即可
     *    · 富文本存在内容，证明这是在编辑，跳过即可
     * 2. 重点在于每次监听props，如果v-model的值变为空（''），证明这是关闭了富文本，将富文本框内容清空即可
     *    ** 这一步的操作主要在业务组件内完成，因此推荐使用富文本框提交表单之后，必须进行重置表单操作。
     */
    value (val) {
      var content = this.editor.txt.html().replace(this.reg, '')
      if (!content && this.editor.txt.html().indexOf('img') === -1) {
        this.editor.txt.html(this.value)
        this.content = this.value
      }
      if (!this.value) {
        this.editor.txt.clear()
        this.content = this.value
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$nextTick(() => {
      this._initEditor()
    })
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {},
  // 方法集合
  methods: {
    /**
     * 初始化富文本框
     */
    _initEditor () {
      this.editor = new Editor(this.$refs.editor)
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.content = html
        this.$emit('change', this.content)
        // eslint-disable-next-line semi
      }
      this.editor.customConfig.debug = this.debug // debug 模式
      this.editor.customConfig.menus = this.toolBar // 工具栏
      this.editor.customConfig.pasteFilterStyle = false // 关闭样式过滤
      this.editor.customConfig.withCredentials = true // 图片上传携带凭证
      /**
       * 图片上传操作
       */
      if (this.action) {
        this.editor.customConfig.uploadImgServer = this.action // 上传图片到服务器
        this.editor.customConfig.uploadFileName = this.fileName // 文件键名
        /**
         * 如果自定义了上传操作，请务必覆写customInsert事件
         */
        if (this.hook && Object.keys(this.hook).length && this.action) {
          this.editor.customConfig.uploadImgHooks = this.hook // 自定义上传操作
        } else {
          this.editor.customConfig.uploadImgHooks = {
            customInsert: this._upLoadSuccess
          }
        }
      } else {
        this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      }
      this.editor.customConfig.uploadImgMaxSize = this.size * 1024 * 1024 // 图片大小
      this.editor.customConfig.uploadImgMaxLength = this.limit // 图片数量限制
      this.editor.customConfig.uploadImgParams = this.data // 附加参数
      if (this.data && Object.keys(this.data).length) {
        this.editor.customConfig.uploadImgParamsWithUrl = this.merge // 参数合并url
      }
      /**
       * 合并富文本参数
       */
      if (this.option && Object.keys(this.option).length) {
        this.editor.customConfig = {
          ...this.editor.customConfig,
          ...this.option
        }
      }
      this.editor.create() // 创建富文本实例
      this._initValue()
    },
    /**
     * upLoad
     */
    _upLoadSuccess (insertImg, result, editor) {
      if (result.url.length) {
        result.url.forEach(row => {
          var url = `${this.baseUrl}${row}`
          insertImg(url)
        })
      }
    },
    /**
     * 初始化内容
     */
    _initValue () {
      this.editor.txt.html(this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
