import { reqGetSearchInfo } from "@/api"
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const state = {
    searchList:{}
}
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if (result.code==200) {
            commit("GETSEARCHLIST",result.data)
        }
    }
}
//getter用于简化数据
const getters ={
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }


}


export default {
    actions,
    mutations,
    state,
    getters
}