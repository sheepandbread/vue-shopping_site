import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID(),
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            //表示服务器加入购物车成功
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //简化数据
    // 路径导航
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}