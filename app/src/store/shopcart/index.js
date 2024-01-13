import { reqCartList, reqDeleteCartById, reqCheckCartById } from '@/api'
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车列表
    async deleteCartBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的
    deleteAllCheckedCart({ dispatch, getters }) {
        //context：小仓库，commit，getters，dispatch，state
        //获取购物车中全部的产品（数组）
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('deleteCartBySkuId', element.skuId) : '';
            PromiseAll.push(promise)
        });
        //所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现
        return Promise.all(PromiseAll)
    },
    // 修改购物车某个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCartById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(element => {
            //（ischecked 0 为非全选，1位全选）
            let promise = dispatch('updateCheckedById', { skuId: element.skuId, isChecked })
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    },

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}