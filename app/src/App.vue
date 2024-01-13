<template>
  <div id="app">
    <!-- <h1 v-upper="msg"></h1> -->
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  data() {
    return {
      msg:'ABC'
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action||获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");
    // //获取用户信息在首页展示
    // this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
</style>