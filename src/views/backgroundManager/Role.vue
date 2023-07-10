<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" @input="search" placeholder="请输入用户名" suffix-icon="el-icon-user" v-model="userInfo.userName"></el-input>
            <el-input style="width: 200px" @input="search" placeholder="请输入角色名" suffix-icon="el-icon-s-custom" class="ml" v-model="userInfo.roleName"></el-input>
            <el-button class="ml" type="primary" @click="search">搜索 <i class="el-icon-search"></i></el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增用户角色<i class="el-icon-circle-plus-outline"></i></el-button>
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
              批量删除用户角色 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
            </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="personRoleId" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="240">
            </el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="roleName" label="用户角色">
            </el-table-column>
            <el-table-column label="操作"  width="300" align="center">
              <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDelete(scope.row.personRoleId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>

            </template>
            
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="userInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-if="pageshow">
            </el-pagination>
          </div>

          <el-dialog title="新增用户角色信息" :visible.sync="addDialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="form2" ref="form2" :rules="rules" label-width="80px" size="small">
            <el-form-item label="用户ID" prop="userId">
              <el-input v-model="form2.userId" autocomplete="off"></el-input>
            </el-form-item>
              <el-form-item label="角色" prop="roleId">
                <el-radio-group v-model="form2.roleId">
                  <el-radio label="1" border >学生</el-radio>
                  <el-radio label="2" border style="margin-left:15px;">教师</el-radio>
                  <el-radio label="3" border style="margin-left:15px;">管理员</el-radio>
                </el-radio-group>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm2(form2)">确 定</el-button>
          </div>
        </el-dialog>

          <el-dialog title="修改用户角色信息" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
            <el-form-item label="用户ID">
              <el-input :disabled="true" v-model="form.userId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input :disabled="true" v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-radio-group v-model="form.roleId">
                  <el-radio label="1" border >学生</el-radio>
                  <el-radio label="2" border style="margin-left:15px;">教师</el-radio>
                  <el-radio label="3" border style="margin-left:15px;">管理员</el-radio>
                </el-radio-group>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除用户角色" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该用户的用户角色信息吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="del(delUserId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {getUserRoleInfo} from "@/api/userRoleApis.js";
import {reviceUserRole} from "@/api/userRoleApis.js";
import {AddUserRole} from "@/api/userRoleApis.js";
import {DeleteUserRole} from "@/api/userRoleApis.js";

export default { 
    name: "User",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      form: {
        userId: '',
        roleId: '',
      },
      form2: {
        userId: '',
        roleId: '',
      },
      rules: {
        userId: [{required: true, message: '请输入用户ID', trigger: 'blur'}],
        roleId: [{required: true, message: '请选择角色', trigger: 'blur'}],
      },
      
      addDialogFormVisible: false,
      dialogFormVisible: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delUserId:[],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      userInfo:{
        pageNum: 1,
        pageSize: 5,
        userName: "",
        roleName: "",
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
      this.userInfo.pageNum=1;
      this.load()
      this.$nextTick(() => {
        this.pageshow = true;
      });

    },
    submitForm2(form2) {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            this.add();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          getUserRoleInfo(this.userInfo).then((res) => {
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      },
      handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
      save() {
        reviceUserRole(this.form).then((res) => {
          console.log(res)
          if (res.msg=='操作成功') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    add(){
      AddUserRole(this.form2).then((res) => {
          console.log(res)
          if (res.msg=='操作成功') {
          this.$message.success("保存成功")
          this.addDialogFormVisible = false
          this.load()
        } else if(res.msg=='用户角色已经存在！'){
          this.$message.error("用户角色已经存在！")
        }else{
          this.$message.error("用户不存在！")
        }
      })
    },
    del(id) {
      DeleteUserRole(id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.personRoleId)  // [{}, {}, {}] => [1,2,3]
      DeleteUserRole(ids).then(res => {
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
      this.addDialogFormVisible = true
      this.form2 = {}
    },
    handleEdit(row) {
      this.form = Object.assign({},row)
      this.dialogFormVisible = true
    },
    handleDelete(delUserId){
      console.log(this.delUserId)
      this.delDialogFormVisible = true
      this.delUserId[0] = delUserId
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.userInfo.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.userInfo.pageNum = pageNum
      this.load()
      }
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