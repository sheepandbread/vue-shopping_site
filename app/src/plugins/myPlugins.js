// Vue插件一定是暴露一个对象
let myPlugins = {};
// Vue.js 的插件应该暴露一个 install 方法。
// 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
myPlugins.install = function (Vue, options) {
    Vue.directive(options.name,(element,params) => {
        element.innerHTML = params.value.toUpperCase();
    }
    )
}

export default myPlugins;