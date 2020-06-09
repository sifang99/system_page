<template>
    <div>
        <div class="clearfix search-box">
            <el-input v-model="searchinfo" placeholder="搜索权限" class="search-input"></el-input>
            <el-button type="primary" icon="el-icon-search" class="btn-search" @click="findPermissionFilter($event)">确定</el-button>
        </div>

        <div id="permission-list">
        <div class="control-hint">权限列表：</div>

        <el-table :data="selectpermissionlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%" >
            <el-table-column type="index" :index="indexAutoincrease" label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="权限名称" align="center" width="200"></el-table-column>
            <el-table-column prop="code" label="权限映射" width="200" align="center"></el-table-column>
            <el-table-column prop="url" label="权限路径" align="center" width="260"></el-table-column>
            <el-table-column label="修改" align="center" width="150">
              <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-edit-outline" round id="btn-edit" @click="showEdit(scope.$index)">修改</el-button>
              </template>
            </el-table-column>
              <el-table-column label="删除" align="center" width="150">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" round id="btn-del" @click="showDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑权限" :visible.sync="editVisible" width="450px">
        <el-form :model="editpermissionform" ref="ruleForm" :rules="rules">
            <el-form-item prop="name" label="权限名称" :label-width="formLabelWidth">
                <el-input v-model="editpermissionform.name" autocomplete="off" @input="updateView($event)"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="权限映射" :label-width="formLabelWidth">
                <el-input v-model="editpermissionform.code" autocomplete="off" @input="updateView($event)"></el-input>
            </el-form-item>
            <el-form-item> 
                <el-button type="primary" @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="EditPermission('ruleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
        
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="delVisible"
        width="30%">
        <span>确定要删除该权限吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDelete">取 消</el-button>
            <el-button type="primary" @click="DelPermission">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 分页条 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            class="pagination">
        </el-pagination>
    </div>
    </div>
</template>

<script>
export default {
  name: 'edit-permission',
  data () {
    return {
      searchinfo: '',
      editVisible: false, // 显示编辑权限对话框
      delVisible: false, // 显示删除权限对话框
      index:-1,//当前选中的行

      formLabelWidth: '80px',
      currentPage: 1, // 默认显示第一页
      pageSize: 3, // 默认每页显示10条
      totalNum: 0, // 总页数
      permissionlists: [],
      selectpermissionlists: [],

      // 编辑权限信息
      editpermissionform: {
        id:'',
        name: '',
        code: ''
      },

      rules:{
        name:[
          {required: true, message: '权限名不能为空', trigger: 'blur'}
        ],
        code:[
          {required: true, message: '权限映射不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    updateView(e){
      this.$forceUpdate();
    },

    //处理表格序号
    indexAutoincrease(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
    },

    // 搜索
    findPermissionFilter (e) {
      console.log(this.searchinfo)
      this.selectpermissionlists = this.permissionlists.filter(item => item.name === this.searchinfo)
      this.totalNum = this.selectpermissionlists.length
      console.log(this.permissionlists)
    },

    showEdit(rowIndex){
      this.index = (this.currentPage - 1) * this.pageSize + rowIndex
      this.editpermissionform.name = this.selectpermissionlists[this.index].name
      this.editpermissionform.code = this.selectpermissionlists[this.index].code
      this.editpermissionform.id = this.selectpermissionlists[this.index].id
      this.editVisible = true
    },

    showDelete(rowIndex){
      this.index = (this.currentPage - 1) * this.pageSize + rowIndex
      console.log(this.index)
      this.delVisible = true
    },

    cancelEdit(){
      this.editVisible = false
    },

    cancelDelete(){
      this.delVisible = false
    },

    // 编辑权限
    EditPermission (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.selectpermissionlists[this.index].name = this.editpermissionform.name
          this.selectpermissionlists[this.index].code = this.editpermissionform.code
          // console.log(this.selectpermissionlists[this.index])
          this.$axios.post('/manager/updatePermission',JSON.stringify(this.selectpermissionlists[this.index]))
          .then(res => {
            // console.log(res)
            if(res.data.state){
                this.index = -1
                //清空editpermissionform.name
                this.editpermissionform.name=''
                this.editpermissionform.code=''
                this.editpermissionform.id=''
                this.editVisible = false;
            }
          })
          .catch(function(error){
            console.log('error in EditPermission')
          })
          
        }
      })
    },

    // 删除权限
    DelPermission () {
      console.log(this.index)
      console.log(this.selectpermissionlists)
      console.log(this.selectpermissionlists[this.index].id)
      this.$axios.post('/manager/deletePermission',String(this.selectpermissionlists[this.index].id))
      .then(res => {
        console.log(res)
        if(res.data.state){
          this.selectpermissionlists.splice(this.index,1)
          this.index = -1
          this.totalNum = this.totalNum - 1
        }
      })
      .catch(function(error){
        console.log('error in DelPermission')
      })
      this.delVisible = false;
    },
    // 分页处理
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
    },

    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
    }
  },
  created () {
    this.$axios.get('/manager/findAllPermission')
    .then(res => {
      this.permissionlists = res.data
      // console.log(res)
      // console.log(this.permissionlists)
      this.totalNum = this.permissionlists.length
      this.selectpermissionlists = this.permissionlists
    })
    .catch(function(error){
      console.log("获得权限信息发生错误！");
    })
    
  }

}
</script>

<style>
.search-input{
    width: 20%;
    float: left;
    margin-right: 20px;
}
.btn-search{
    float: left;
    width: 10%;
    background-color: #2E8B57;
    border: none;
}
.btn-search:hover,.btn-search:focus{
    background-color: #2E8B57;
}

/***************************** */
#permission-list{
    border: 1px solid #ccc;
    background-color: #f6f7f8;
    margin-top: 20px;
}
.control-hint{
    background-color: #2E8B57;
    text-align: left;
    color: white;
    font-size: 80%;
    padding: 2px;
}

#btn-edit,#btn-del{
    border: 0;
    border-radius: 10%;
    padding: 2px 10px;
    /* text-align: center; */
    height: 30px;
}

.dialog-footer>.el-button{
    background-color: #2E8B57;
    border: none;
    border-radius: 10%;
    color: white;
}
/******************************************* */
.clearfix{
    *zoom: 1;
}
.clearfix::after{
    content: ",";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.pagination{
    position: relative;
    left: 20%;
    margin: 20px 0px;
  }
</style>
