import { reqCategoryList, reqGetbannerList, reqGetFloorList } from '@/api'
// 准备action，用于响应组件中的工作
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result)
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图
    async getBannerList({ commit }) {
        let result = await reqGetbannerList();
        commit("GETBANNERLIST", result.data);
    },
    // 获取floor轮播图
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
}
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const getters = {
}


export default {
    actions,
    mutations,
    state,
    getters
}