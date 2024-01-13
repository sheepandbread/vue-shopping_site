<template>
  <div class="pagination">
    <h1>{{ startNumAndEndNum }}---当前页码{{ pageNo }}</h1>

    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)"
      :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start > 1">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}">
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage">···</button>
    <button  v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)"
    :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算页数(ceil向上取整)
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //连续页码 起始数字 结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 定义起始/结束变量
      let start = 0,
        end = 0;
      // 连续页码的特殊情况
      if (continues > totalPage) {
        //数据量不足,连续页码数大于总页数
        start = 1;
        end = totalPage;
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //start 页小于1
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //end 页大于总页数
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>