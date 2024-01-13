// API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"

// 三级联动接口
export const reqCategoryList = () =>{
    //发请求：axios发请求返回结果Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'});
}

// 获取banner（轮播图）
export const reqGetbannerList = () => mockRequests.get('/banner');

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据 请求地址：/api/list 方式post
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } 
*/
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

//产品详情页 /api/item/{ skuId }  get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${ skuId }`,method:"get"})

// 添加购物车 /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})

// 获取购物车列表数据接口 /api/cart/cartList get
export const reqCartList = ()=>requests({url:'/cart/cartList',method:"get"})

// 删除购物车产品列表 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) =>requests({url:`/cart/deleteCart/${skuId}`,method: "delete"})

// 切换物品的选中状态 /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqCheckCartById = (skuId,isChecked) =>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

//验证码  /api/user/passport/sendCode/{phone} 
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户 /api/user/passport/register post  phone code password
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:"post"})

//登录 /api/user/passport/login post phone,password
export const reqUserLogin = (data) =>requests({url:'/user/passport/login',data,method:"post"})

//获取用户信息 【需要带着用户的token向服务器要用户信息】
//http://182.92.128.115/api/user/passport/auth/getUserInfo method:get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})

// 退出登录 /api/user/passport/logout get
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"})

// 用户交易页面信息 /api/order/auth/trade get
export const reqOrderInfo = () =>requests({url:"/order/auth/trade",method:"get"})

//提交订单的界面 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})

// 获取支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})

// 获取订单列表（个人中心数据） /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})
