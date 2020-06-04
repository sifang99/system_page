<template>
    <div>
        <div id="role-list">
        <div class="control-hint">角色列表：</div>

        <el-table :data="rolelists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            @expand-change="expandClick">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-table :data="props.row.havepermissionlists"
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                    <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
                    <el-table-column prop="code" label="权限映射" align="center"></el-table-column>
                    <el-table-column prop="url" label="权限路径" align="center"></el-table-column>
                    <el-table-column label="角色权限管理" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" icon="el-icon-delete" round id="btn-del" @click="showDelDialog(scope.$index)">删除权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            </el-table-column>
            <el-table-column type="index" :index="indexIncrease" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="id" label="角色编号" align="center" ></el-table-column>
            <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
            <el-table-column label="角色管理" align="center">
              <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-edit-outline" round id="btn-edit" @click="GetaddPermissionDialog(scope.$index)">添加权限</el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加权限" :visible.sync="editVisible">
            <el-table :data="selectPermissionList" style="width: 120%">
                <el-table-column label="选择" align="center" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked"  @change="choosePer(scope.$index)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
                <el-table-column prop="code" label="权限映射" align="center"></el-table-column>
                <el-table-column prop="url" label="权限路径" align="center"></el-table-column>
            </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEdit">取 消</el-button>
            <el-button type="primary" @click="AddPermission">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="delVisible"
        width="30%">
        <span>确定要删除角色的该权限吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDel">取 消</el-button>
            <el-button type="primary" @click="DelPermission()">确 定</el-button>
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
  name: 'manage-role',
  data () {
    return {
      searchinfo: '',
      editVisible: false, // 显示编辑权限对话框
      delVisible: false, // 显示删除权限对话框
      delIndex:-1,      //选中要删除的行的Index 
      addIndex:-1,      //要添加权限的行的索引 
      chooseID:null,    //选中要操作的角色的ID  
      chooseIndex:-1,   //选中要添加的权限的索引

      addroleformLabelWidth: '70px',
      formLabelWidth: '80px',
      currentPage: 1, // 默认显示第一页
      pageSize: 3, // 默认每页显示10条
      totalNum: 1000, // 总页数e
      // 角色列表
      rolelists: [],
      nopermissionlists: [],

      selectPermissionList:[],

      // 添加权限信息
      editpermissionform: {
        pname: '',
        pcode: '',
        purl: ''
      },
      i:-1,
    }
  },
  methods: {
    //选中一项权限后，设置其他权限为没有选中的状态
    choosePer(index){
      var length = this.selectPermissionList.length
      // console.log(index)
      // console.log('choosePer')
      this.chooseIndex = index
      for(var i = 0; i < length; i++){
       if(i != index){
         this.selectPermissionList[i].checked = false
       }
      }
    },
    cancelDel(){
      this.delVisible = false
    },
    cancelEdit(){
      this.editVisible = false
    },
    expandClick(row, data){
      console.log(row)
      // console.log(data)
      this.chooseID = row.id
      if(row.havepermissionlists.length <= 0){
        this.$axios.get('/manager/findPermissionByRole',{params: {role_id:row.id}})
      .then(res => {
        row.havepermissionlists = res.data
        // console.log("我在下拉框发了请求")
        // console.log(this.rolelists)
      })
      .catch(function(error){
        console.log("error in expandClick")
      })
      }
      
    },
    getPermission(id){

    },
    showDelDialog(index){
      this.delVisible = true
      this.delIndex = index
      console.log(index)
    },
    //使页面上的序号连贯
    indexIncrease(index){
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 打开添加权限的信息框
    GetaddPermissionDialog (index) {
      this.addIndex = index
      var id = this.rolelists[index].id
      this.$axios.get('/manager/findPermissionByRole',{params: {role_id:id}})
      .then(res => {
        this.rolelists[index].havepermissionlists = res.data
        var length = this.rolelists[index].havepermissionlists.length
        var pLength = this.nopermissionlists.length

        //清空selectPermissionList数组
        this.selectPermissionList.splice(0, this.selectPermissionList.length)
        this.copy(this.selectPermissionList, this.nopermissionlists)

        for(var i = 0; i < length; i++){
          for( var j = 0; j < pLength; j++){
            if(this.rolelists[index].havepermissionlists[i].id == this.selectPermissionList[j].id){
              this.selectPermissionList.splice(j,1)
              pLength = pLength - 1
            }
          }
        }
      })
      .catch(function(error){
        console.log("error")
      })
      
      this.editVisible = true
      // 需要初始化没有选择的权限列表noperimissionlists
    },

    copy(p1, p2){
      var length = p2.length
      for(var i = 0; i < length ;i++){
        p1.push({
          checked:p2[i].checked,
          code:p2[i].code,
          id:p2[i].id,
          name:p2[i].name,
          url:p2[i].url
        })
      }
    },

    // 添加权限
    AddPermission () {
      console.log(this.addIndex)
      console.log(this.chooseIndex)
      var param = {
        role_id:this.rolelists[this.addIndex].id,
        perm_id:this.selectPermissionList[this.chooseIndex].id
      }
      console.log(param)
      this.$axios.post('/manager/insertPermToRole',param)
      .then(res => {
        if(res.data.state){
          alert("添加成功")
        }
      })
      .catch(function(error){
        console.log("error in addPermision")
      })
      this.editVisible = false
      this.selectPermissionList[this.chooseIndex].checked = false
    },
    // 删除权限
    DelPermission () {
      var index = -1
      var length = this.rolelists.length
      for(var i = 0; i < length; i++){
        if(this.rolelists[i].id == this.chooseID){
          index = i
          break
        }
      }
      var param = {
        role_id: this.rolelists[index].id,
        perm_id: this.rolelists[index].havepermissionlists[this.delIndex].id
      }
      console.log(param)
      this.$axios.post('/manager/deletePermByRole',param)
      .then(res => {
        if(res.data.state){
          alert("删除成功！")
        }
      })
      .catch(function(error){
        console.log("error in DelPermission")
      })
      this.rolelists[index].havepermissionlists.splice(this.delIndex,1)
      this.delVisible = false
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
    //获取当前所有角色
    this.$axios.get('/manager/findAllRole')
    .then(res => {
      if(res.data){
        this.rolelists = res.data
        var length = this.rolelists.length
        for(var i = 0; i< length; i++){
          this.rolelists[i].havepermissionlists = []
        }
        this.totalNum = this.rolelists.length
        console.log(this.rolelists)
      }
    })
    .catch(function(error){
      console.log("error in creadted findAllRole")
    })
    this.$axios.get('/manager/findAllPermission')
    .then(res => {
      this.nopermissionlists = res.data
      var length = this.nopermissionlists.length
      for(var i = 0; i < length; i++){
        this.$set(this.nopermissionlists[i], 'checked', false)
      }
      // console.log(this.nopermissionlists)
    })
    .catch(function(error){
      console.log("error in findPermission")
    })
  }

}
</script>

<style>
.btn-addrole{
    float: left;
    background-color: #2E8B57;
    border: none;
}
.btn-addrole:hover,.btn-addrole:focus{
    background-color: #2E8B57;
}

/***************************** */
#role-list{
    border: 1px solid #ccc;
    background-color: #f6f7f8;
    margin-top: 20px;
    width: 90%;
    margin-left: 40px;
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

.permission-table-list{
    border: none;
    background-color: #f6f7f8;
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
