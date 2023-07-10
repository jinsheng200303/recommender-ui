<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" @input="search" placeholder="请输入角色名" suffix-icon="el-icon-s-custom" class="ml" v-model="roleInfo.roleName"></el-input>
            <el-button class="ml" type="primary" @click="search">搜索 <i class="el-icon-search"></i></el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增角色权限<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
              class="ml"
              confirm-button-text='确定'
              cancel-button-text='算了'
              icon="el-icon-info"
              icon-color="red"
              title="您确定批量删除这些数据吗？"
              @confirm="delBatch"
          >
            <el-button type="danger" class="ml" slot="reference" :disabled="this.multipleSelection.length == 0  ?  true : false">
              批量删除角色权限 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
            </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="roleId" label="角色ID" width="140">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名" width="240">
            </el-table-column>
            <el-table-column prop="flag" label="唯一标识" width="240">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
              <el-button type="warning" @click="viewPermission(scope.row)">查看权限 <i class="el-icon-view"></i></el-button>
              <el-button type="primary" @click="assignPermission(scope.row.roleId)">分配权限 <i class="el-icon-edit-outline"></i></el-button>
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDelete(scope.row.roleId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>

            </template>
            
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="roleInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-if="pageshow">
            </el-pagination>
          </div>

          <el-dialog :title="form.roleId==null?'新增角色信息':'修改角色信息'" :visible.sync="DialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
            <el-form-item label="角色名" prop="roleName">
              <el-input v-model="form.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="唯一标识" prop="flag">
              <el-input v-model="form.flag" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="DialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="角色权限信息查询" :visible.sync="viewPermissionDialog" 
        width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-input style="width: 200px" @input="loadRolePermission" placeholder="请输入权限名" 
          suffix-icon="el-icon-magic-stick" class="ml" v-model="rolePermissionInfo.permissionName"></el-input>
          <el-button class="ml" type="primary" @click="loadRolePermission">搜索 
            <i class="el-icon-search"></i></el-button>
          <template>
            <el-table
              :data="rolePermissionData"
              height="250"
              border
              style="width: 100%">
              <el-table-column
                prop="permissionName"
                label="权限信息">
              </el-table-column>
            </el-table>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="viewPermissionDialog = false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="分配角色权限" :visible.sync="assignPermissionDialog" width="30%" center :close-on-click-modal=false>
          <el-tree
            :props="props"
            :data="permissionData"
            node-key="permissionId"
            show-checkbox
            ref="tree"
            :default-expanded-keys="expends"
            :default-checked-keys="checks">
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="assignPermissionDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveAssignPermission">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除用户角色" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该用户的用户角色信息吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="del(delRoleId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {getRoleInfo} from "@/api/permissionApis.js";
import {getRolePermissionInfo} from "@/api/permissionApis.js";
import {reviseRoleInfo} from "@/api/permissionApis.js";
import {deleteRoleInfo} from "@/api/permissionApis.js";
import {findRolePermission} from "@/api/permissionApis.js";
import {reviseRolePermission} from "@/api/permissionApis.js";

export default { 
    name: "Role",
  data() {
    return {
      tableData: [],
      rolePermissionData: [],
      permissionData: [],
      props: {
        label: 'permissionName',
      },
      expends: [],
      checks: [],
      roleId: 0,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      permissionName: '',
      form: {
        roleId: '',
        roleName: '',
        permissionName: "1",
        flag: '',
      },
      form2: {
        roleId: '',
        permissionName: '',
      },
      rules: {
        roleName: [{required: true, message: '请输入角色名', trigger: 'blur'}],
        flag: [{required: true, message: '请输入唯一标识', trigger: 'blur'}],
      },
      
      DialogFormVisible: false,
      dialogFormVisible: false,
      viewPermissionDialog: false,
      assignPermissionDialog: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delRoleId:[],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      roleInfo:{
        pageNum: 1,
        pageSize: 5,
        roleName: '',
      },
      rolePermissionInfo: {
        roleId: '',
        roleName: '',
        permissionName: '',
      },
      headerBg: 'headerBg'
    };
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    search(){
      this.pageshow = false;
      this.roleInfo.pageNum=1;
      this.load()
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    searchPermission(){
      this.loadRolePermission()
    },
      submitForm(form) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.save();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    load() {  
          getRoleInfo(this.roleInfo).then((res) => {
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      },
      loadRolePermission() {  
          getRolePermissionInfo(this.rolePermissionInfo).then((res) => {
          console.log(res)
          this.rolePermissionData = res.data
          this.total = res.data.total
        })
      },
    handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
    save() {
      reviseRoleInfo(this.form).then((res) => {
          console.log(res)
          if (res.msg=='操作成功') {
          this.$message.success("保存成功")
          this.DialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    saveAssignPermission(){
      reviseRolePermission(this.roleId,this.$refs.tree.getCheckedKeys()).then(res => {
        console.log(res)
        if(res.msg == '操作成功'){
          this.$message.success("保存成功")
          this.assignPermissionDialog = false
        }else {
          this.$message.error("保存失败")
        }
      })
    },
    del(id) {
      deleteRoleInfo(id).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.load()
          this.delDialogFormVisible = false
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.roleId)  // [{}, {}, {}] => [1,2,3]
      deleteRoleInfo(ids).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleAdd() {
      this.DialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = Object.assign({},row)
      this.DialogFormVisible = true
    },
    viewPermission(row) {
      this.rolePermissionInfo = Object.assign({},row)
      this.rolePermissionInfo.permissionName=''
      this.loadRolePermission()
      this.viewPermissionDialog = true
    },
    assignPermission(roleId) {
      this.roleId = roleId
      this.form2.roleId = roleId
      findRolePermission().then((res) => {
          // console.log(res)
          this.permissionData = res.data
          //把后台返回的权限数据处理成id数组
          this.expends = this.permissionData.map(v => v.permissionId)
        })
      getRolePermissionInfo(this.form2).then((res) => {
        console.log(res.data)
        this.checks = res.data.map(v => v.permissionId)
      })
      this.assignPermissionDialog = true
    },
    handleDelete(delRoleId){
      console.log(this.delRoleId)
      this.delDialogFormVisible = true
      this.delRoleId[0] = delRoleId
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.roleInfo.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.roleInfo.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>
.el-menu-item,
.el-menu-item-group,
.el-menu {
  color: rgb(255, 255, 255);
  background-color: rgb(166, 208, 211);
}
.example::-webkit-scrollbar {
  display: none;
}

.ml{
  margin-left: 5px;
}


</style>

<style>
.headerBg {
  background: rgb(240, 240, 210)!important;
}
</style>