<template>
    <div>
        <div class="clearfix search-box">
            <el-input v-model="searchinfo" placeholder="搜索权限" class="search-input"></el-input>
            <el-button type="primary" icon="el-icon-search" class="btn-search" @click="findPermissionFilter($event)">确定</el-button>
        </div>

        <div id="permission-list">
        <div class="control-hint">权限列表：</div>

        <el-table :data="selectpermissionlists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%" stripe="true"
            border="true"
            @row-click="getdetail"
            row-style="height:0"
            cell-style="padding:5px">
            <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="pname" label="权限名称" align="center" width="200"></el-table-column>
            <el-table-column prop="pcode" label="权限映射" width="200" align="center"></el-table-column>
            <el-table-column prop="purl" label="权限路径" align="center" width="200"></el-table-column>
            <el-table-column prop="operation" label="权限管理" align="center">
                <el-button type="warning" icon="el-icon-edit-outline" round id="btn-edit" @click="editVisible = true">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" round id="btn-del" @click="delVisible = true">删除</el-button>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑权限" :visible.sync="editVisible">
        <el-form :model="editpermissionform">
            <el-form-item label="权限名称" :label-width="formLabelWidth">
                <el-input v-model="editpermissionform.pname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限映射" :label-width="formLabelWidth">
                <el-input v-model="editpermissionform.pcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限路径" :label-width="formLabelWidth">
                <el-input v-model="editpermissionform.purl" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="EditPermission()">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="delVisible"
        width="30%">
        <span>确定要删除该权限吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="DelPermission()">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 分页条 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 8]"
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

      formLabelWidth: '80px',
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000, // 总页数
      permissionlists: [{
        id: '1',
        pname: '管理员权限',
        pcode: 'admin:logoutuser',
        purl: '/admin/***',
        operation: ''
      }, {
        id: '2',
        pname: '管理员权限',
        pcode: 'admin:logoutuser',
        purl: '/admin/***',
        operation: ''
      }, {
        id: '3',
        pname: '管理员权限',
        pcode: 'admin:logoutuser',
        purl: '/admin/***',
        operation: ''
      }],
      selectpermissionlists: [],

      // 编辑权限信息
      editpermissionform: {
        pname: 'aa',
        pcode: 'bb',
        purl: 'cc'
      }
    }
  },
  methods: {
    // 获取编辑权限的原内容
    getdetail (row) {
      this.editpermissionform.pname = row.pname
      this.editpermissionform.pcode = row.pcode
      this.editpermissionform.purl = row.purl
    },
    // 搜索
    findPermissionFilter (e) {
      console.log(this.searchinfo)
      this.selectpermissionlists = this.permissionlists.filter(item => item.pname === this.searchinfo)
      this.totalNum = this.selectpermissionlists.length
    },

    // 编辑权限
    EditPermisssion () {
      this.editVisible = false
    },

    // 删除权限
    DelPermission () {
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
    this.totalNum = this.permissionlists.length
    this.selectpermissionlists = this.permissionlists
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
