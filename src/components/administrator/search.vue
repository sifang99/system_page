<template>
<el-container>
    <el-header class="search-box clearfix">
        <div class="img-wrapper2"></div>
        <i class="el-icon-search"></i>
        <el-input v-model="searchinfo" placeholder="请输入相关内容" class="search-input">
            <el-button slot="append" type="primary" class="btn-search" @click="SearchResult()">搜索</el-button>
        </el-input>
    </el-header>

    <el-tabs v-model="activeName">
        <el-tab-pane label="相关结果" name="first"></el-tab-pane>
    </el-tabs>

    <div class="result-box clearfix">
        <div class="result-wrapper">
            <el-card class="result-card" v-for="item in resultlist.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item">
                <div slot="header" class="clearfix">
                    <span class="result-title">{{ JSON.stringify(item).slice(0,10) }}</span>
                </div>
                <div class="text item result-content">
                    {{item }}
                </div>
            </el-card>

            <!-- 分页条 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[4]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum"
                class="pagination">
            </el-pagination>
        </div>
        <div class="img-wrapper1"></div>
    </div>
</el-container>
</template>

<script>
export default {
  name: 'ES-Search',
  data () {
    return {
      searchinfo: '',
      activeName: 'first',
      currentPage: 1, // 默认显示第一页
      pageSize: 4, // 默认每页显示4条
      totalNum: 1000, // 总页数
      resultlist: []
    //   resultlist: [{
    //     name: 111
    //   },
    //   {name: 222},
    //   {name: 333},
    //   {name: 444}, {name: 444}, {name: 444}, {name: 444}, {name: 444}, {name: 444}]
    }
  },
  methods: {
    // 处理搜索
    SearchResult () {
      // eslint-disable-next-line no-unused-vars
      var keyword = this.searchinfo
      // 返回搜索结果
      this.$axios.get('search/' + keyword).then(res => {
        // console.log(res.data)
        this.resultlist = res.data
        this.totalNum = this.resultlist.length
      })
    },
    // 分页处理
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
    },

    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
    }
  },
  created () {
    this.totalNum = this.resultlist.length
  }

}
</script>
<style>
@import "../../assets/css/search.css";

.result-card{
    width: 90%;
    margin-bottom: 5px;
    opacity: 1;
}
.result-title{
  font-size: 120%;
  font: bold;
}
.result-content{
  font-size: 80%;
  margin-right: 20px;
  overflow: hidden;
}
</style>
