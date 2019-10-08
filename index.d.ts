import Vue from 'vue'

declare class ElementUIComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
}

export declare class VueEditor extends ElementUIComponent {
  toolBar: Array<String>
  action: String
  fileName: String
  baseUrl: String
  size: Number
  limit: Number
  data: Object
  merge: Boolean
  debug: Boolean
  hook: Object
  option: Object
}
