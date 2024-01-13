import {reqCategoryList} from '@/api'
const actions = {
    async getCategoryList(){
        var a;
        let result = await reqCategoryList().then(
            res=>{
                console.log("1")
                console.log(res)
                a = res
                return res
            }
        );
        console.log(a)
        console.log("2")
        console.log(result);
    }
}
const mutations = {}
const getters ={}
const state = {}

export default{
    actions,
    mutations,
    getters,
    state
}