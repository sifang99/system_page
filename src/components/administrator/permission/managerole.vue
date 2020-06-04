<template>
    <div>
        <div class="clearfix search-box">
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="btn-addrole" @click="addroleVisible = true">添加角色</el-button>
        </div>

        <div id="role-list">
        <div class="control-hint">角色列表：</div>

        <el-table :data="selectrolelists.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%" stripe="true"
            border="true"
            @row-click="getdetail"
            row-style="height:0"
            cell-style="padding:5px">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-table :data="props.row.havepermissionlists"
                    style="width: 100%"
                    :stripe="fasle"
                    :border="fasle">
                    <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                    <el-table-column prop="pname" label="权限名称" align="center"></el-table-column>
                    <el-table-column prop="pcode" label="权限映射" align="center"></el-table-column>
                    <el-table-column prop="purl" label="权限路径" align="center"></el-table-column>
                    <el-table-column prop="operation" label="角色权限管理" align="center">
                        <el-button type="danger" icon="el-icon-delete" round id="btn-del" @click="delVisible = true">删除权限</el-button>
                    </el-table-column>
                </el-table>
            </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="roleid" label="角色编号" align="center" ></el-table-column>
            <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
            <el-table-column prop="operation" label="角色管理" align="center">
                <el-button type="warning" icon="el-icon-edit-outline" round id="btn-edit" @click="GetaddPermissionDialog()">添加权限</el-button>
            </el-table-column>
        </el-table>

        <el-dialog title="添加权限" :visible.sync="editVisible">
            <el-table :data="nopermissionlists" style="width: 120%" border="true">
                <el-table-column label="选择" align="center" width="80">
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-table-column>
                <el-table-column prop="id" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="pname" label="权限名称" align="center"></el-table-column>
                <el-table-column prop="pcode" label="权限映射" align="center"></el-table-column>
                <el-table-column prop="purl" label="权限路径" align="center"></el-table-column>
            </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddPermission()">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog title="添加角色" :visible.sync="addroleVisible">
        <el-form :model="addroleform">
            <el-form-item label="角色编号" :label-width="addroleformLabelWidth">
                <el-input v-model="addroleform.roleid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" :label-width="addroleformLabelWidth">
                <el-input v-model="addroleform.rolename" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addroleVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddRole()">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="delVisible"
        width="30%">
        <span>确定要删除角色的该权限吗？</span>
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
  name: 'manage-role',
  data () {
    return {
      searchinfo: '',
      editVisible: false, // 显示编辑权限对话框
      delVisible: false, // 显示删除权限对话框
      addroleVisible: false, // 显示添加角色对话框

      addroleformLabelWidth: '70px',
      formLabelWidth: '80px',
      currentPage: 1, // 默认显示第一页
      pageSize: 1, // 默认每页显示10条
      totalNum: 1000, // 总页数e
      // 角色列表
      rolelists: [{
        id: '1',
        roleid: '1',
        rolename: '管理员',
        operation: '',
        // 角色拥有的权限列表
        havepermissionlists: [{
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
        }]
      }, {
        id: '2',
        roleid: '2',
        rolename: '学生',
        operation: '',
        havepermissionlists: []
      }, {
        id: '3',
        roleid: '3',
        rolename: '教师',
        operation: '',
        havepermissionlists: []
      }],
      selectrolelists: [],

      nopermissionlists: [{
        id: '1',
        pname: '管理员权限',
        pcode: 'admin:logoutuser',
        purl: '/admin/***'
      }],

      // 添加角色信息
      addroleform: {
        roleid: '',
        rolename: ''
      },

      // 添加权限信息
      editpermissionform: {
        pname: '',
        pcode: '',
        purl: ''
      }
    }
  },
  methods: {
    // 打开添加权限的信息框
    GetaddPermissionDialog () {
      this.editVisible = true
      // 需要初始化没有选择的权限列表noperimissionlists
    },

    // 添加权限
    AddPermission () {
      this.editVisible = false
    },
    // 删除权限
    DelPermission () {
      this.delVisible = false
    },
    // 添加角色
    AddRole () {
      this.addroleVisible = false
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
    this.totalNum = this.rolelists.length
    this.selectrolelists = this.rolelists
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
