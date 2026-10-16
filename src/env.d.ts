import 'vue';

// uni-app 内置组件类型未在 @dcloudio/types 中声明，这里做轻量类型声明：
// 1. 覆盖被 uni-app 复用的 HTML 原生标签（button/input 等）。Vue 3.4 将原生元素属性接口命名为
//    IntrinsicElementAttributes（声明于 @vue/runtime-core，由 @vue/runtime-dom 注入 HTML 映射），
//    因此需在此模块中覆盖，避免原生属性类型限制（如 button 的 type="primary"）。
// 2. 声明 uni-app 专有组件（view/text 等），使其成为合法模板元素。
// 运行时由 uni-app 框架解析，类型声明不影响实际渲染。
declare module '@vue/runtime-core' {
  interface IntrinsicElementAttributes {
    button: any;
    input: any;
    form: any;
    textarea: any;
    video: any;
    audio: any;
    canvas: any;
    map: any;
    iframe: any;
    progress: any;
    label: any;
    slot: any;
  }

  interface GlobalComponents {
    view: any;
    text: any;
    button: any;
    input: any;
    textarea: any;
    image: any;
    navigator: any;
    scrollView: any;
    swiper: any;
    swiperItem: any;
    picker: any;
    pickerView: any;
    'switch': any;
    slider: any;
    radio: any;
    checkbox: any;
    form: any;
    richText: any;
    webView: any;
  }
}

export {};
