<template>
<el-container>
    <el-header class="search-box clearfix">
        <div class="img-wrapper2"></div>
        <i class="el-icon-search"></i>
        <el-input v-model="searchinfo" placeholder="请输入相关内容" class="search-input">
            <el-button slot="append" type="primary" class="btn-search" @click="SearchResult">搜索</el-button>
        </el-input>
        <el-button @click="createIndex">创建索引</el-button>
        <el-button @click="createAttr">创建字段</el-button>
    </el-header>

    <el-tabs v-model="activeName">
        <el-tab-pane label="相关结果" name="first"></el-tab-pane>
    </el-tabs>

    <div class="result-box clearfix">
        <div class="result-wrapper clearfix">
            <el-card class="result-card" v-for="item in resultlist" :key="item">
                <div slot="header" class="clearfix">
                    <span class="result-title">{{item.title}}</span>
                </div>
                <div class="text item result-content">
                    {{item.content}}
                </div>
            </el-card>
        </div>
        <!-- <div class="img-wrapper1"></div> -->
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
      
      resultlist: []
    }
  },
  methods: {
    createIndex(){
      this.$axios.get('/elasticsearch/init')
            .then(res => {
                console.log("创建索引成功！")
            })
            .catch(function(error){
                console.log("创建索引发生错误！")
            })
    },
    createAttr(){
      this.$axios.get('/elasticsearch/bulkrequest')
      .then(res => {
          console.log("创建字段成功！")
      })
      .catch(function(error){
          console.log("创建字段发生错误！")
      })
    },
    // 处理搜索
    SearchResult () {
      this.resultlist.splice(0,this.resultlist.length)
      // eslint-disable-next-line no-unused-vars
      var keyword = this.searchinfo
      // 返回搜索结果
      this.$axios.get('/elasticsearch/search/'+keyword)
      .then(res => {
        console.log(res)
        if(res.data){
          this.formData(res.data)
        }
      })
      .catch(function(error){
        console.log("搜索失败！")
      })
    },

    formData(array){
      var length = array.length
      for(var i = 0; i < length; i++){
        var item = {
          title:'',
          content:''
        }
        //判断信息是否来自permission表
        if(array[i].url){
          item.title = '权限信息'
          item.content = "权限编码："+array[i].id+" 权限名："+array[i].name
              +" 映射："+array[i].code + " url："+array[i].url
        }

        //判断信息是否来自sendinfo表
        if(array[i].title){
          item.title = "通知信息"
          item.content ="通知编号："+array[i].snum + " 标题："+array[i].title
              + " 发布日期："+array[i].day + " 通知内容： "+array[i].content+" 通知对象："
          if(array[i].role_id == 1)
          {
            item.content = item.content + "学生"
          }else{
            item.content = item.content + "教师"
          }
        }

        //判断信息是否来自tc表
        if(array[i].time){
          item.title = "教师授课信息"
          item.content = "课程编号：" + array[i].cno+" 教师编号："+array[i].tno+" 授课班级："
            + array[i].classno+" 学期："+array[i].term+" 授课时长："+array[i].hour+" 授课地点："
            + array[i].place+" 授课年级："+array[i].grade
        }

        //判断信息是否来自role_perm表
        if(array[i].perm_id){
          item.title = "角色拥有的权限信息"
          item.content = "角色编号： "+array[i].role_id + " 权限编号："+array[i].perm_id
        }

        //判断信息是否来自optional表
        if(array[i].number){
          item.title = "选课信息"
          item.content = "课程编号："+array[i].cno+" 课程名："+array[i].cname + " 课程学分： "+array[i].credit
            + " 授课教师： "+array[i].tname + " 授课地点： "+array[i].place + " 选课人数： "+array[i].number
            + " 最大选课人数："+array[i].max+" 年级： "+array[i].grade + " 学期："+array[i].term
        }

        //判断信息是否来自manager表
        if(array[i].mno){
          item.title = '管理员档案信息'
          item.content = "编号： "+array[i].mno + " 姓名： "+array[i].mname 
            + " 性别： "
          if(array[i].msex == 1){
            item.content = item.content + "男"
          }else{
            item.content = item.content + "女"
          }
          item.content = item.content + " 职位： " + array[i].position + " 学历： "+array[i].edurecord
            + " 政治面貌： " + array[i].pol + " 联系方式： "+array[i].tel + " 工作时间： "+array[i].worktime
        }

        //判断信息是否来自role表
        if(array[i].intro){
          item.title = "角色信息"
          item.content = " 角色编号：" + array[i].id + " 角色名称："+array[i].name + " code: " + array[i].code
            + "  备注： "+array[i].intro
        }

        //判断信息是否来自major表
        if(array[i].college_id){
          item.title = "专业信息"
          item.content = " 编号： "+array[i].id + " 专业名： "+array[i].major+" 所属系别： "+array[i].college_id
        }

        //判断信息是否来自college表
        if(array[i].college){
          item.title = "学院信息"
          item.content = " 编号： "+array[i].id + " 学院： "+array[i].college
        }

        //判断信息是否来自student表
        if(array[i].birth){
          item.title = "学生档案信息"
          item.content = " 学号： "+array[i].sno + " 姓名： "+array[i].sname + " 性别： "
          if(array[i].sex == 1){
            item.content = item.content + "男 "
          }else{
            item.content = item.content + "女 "
          }
          item.content = item.content + " 出生日期： "+array[i].birth + " 毕业学校： "+array[i].gs
            + " 政治面貌： "+array[i].pol + " 班级编号： "+array[i].classno + " 专业： "+array[i].major
            + " 学院： "+array[i].dept + " 年级： "+array[i].grade
        }

        //判断信息是否来自user表
        if(array[i].account){
          item.title = "账号信息"
          item.content = " 账号： "+array[i].account+" 角色： "+array[i].role_id + " 状态： "+array[i].user_status
        }

        //判断信息是否来自teacher表
        if(array[i].tno && array[i].tname){
          item.title = "教师档案信息"
          item.content = " 编号： "+array[i].tno + " 姓名： "+array[i].tname + " 性别： "
          if(array[i].sex == 1){
            item.content = item.content + "男 "
          }else{
            item.content = item.content + "女 "
          }
          item.content = item.content + " 职位： " + array[i].position + " 学历： "+array[i].edurecord
            + " 学院： "+array[i].dept + " 政治面貌： " + array[i].pol + " 联系方式： "
            + array[i].tel + " 工作时间： "+array[i].worktime
        }

        //判断信息是否来自sc表
        if(array[i].tc_id && array[i].sno){
          item.title = "学生课程信息"
          item.content = " 学号： "+array[i].sno + " 班级编号：" +array[i].classno + " 课程编号： "+array[i].cno
            + " 课程类型： "+array[i].type + " 课程学分： "+array[i].credit + " 成绩： "+array[i].grade
            + " 学期： "+array[i].term
        }

        //判断信息是否来自course表
        if(array[i].max && array[i].type){
          item.title = "课程信息"
          item.content = " 编号： "+array[i].cno + " 课程名：" +array[i].cname + " 学分："+array[i].credit
            + " 学时：" + array[i].hour 
        }

        //判断信息是否来自logging表
        if(array[i].logger_name){
          item.title = "日志信息"
          item.content = " id: "+array[i].id + " 日志信息： "+array[i].message + " 日志等级: "+array[i].level_string
            + " 日志名： "+array[i].logger_name
        }

        this.resultlist.push(item)
      }
    }
  },
  created () {
  }

}
</script>
<style scoped>
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
