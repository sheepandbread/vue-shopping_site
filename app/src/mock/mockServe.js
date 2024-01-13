import Mock from 'mockjs'
//引入json数据（webpack默认对外暴露：图片，JSON数据格式）
import banner from './banner.json'
import floors from './floors.json'

Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floors})

