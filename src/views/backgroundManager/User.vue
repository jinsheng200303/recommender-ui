<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-user" v-model="pageInfo.username"></el-input>
            <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml" v-model="pageInfo.email"></el-input>
            <el-button class="ml" type="primary" @click="load">搜索 <i class="el-icon-search"></i></el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
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
              批量删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
            </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userId" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="电话">
            </el-table-column>
            <el-table-column label="操作"  width="300" align="center">
              <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDelete(scope.row.userId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>

            </template>
            
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>

          <el-dialog title="新增/修改用户信息" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal=false>
          <el-form label-width="80px" size="small">
            <el-form-item label="用户名">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <div style="margin:0 0 10px 0;">
              <span style="margin-left:38px">性别</span>
              <el-radio v-model="form.gender" label="M" border style="margin-left:12px;">男</el-radio>
              <el-radio v-model="form.gender" label="F" border style="margin-left:25px;">女</el-radio>
              <el-radio v-model="form.gender" label="NULL" border style="margin-left:25px;">其他</el-radio>
            </div>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除用户" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该用户的用户信息吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="del(delUserId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {getUserInfo} from "@/api/userApis.js";
import {addUser} from "@/api/userApis.js";
import {DeleteUser} from "@/api/userApis.js";
export default { 
    name: "User",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      // userName: "",
      // email: "",
      form: {},
      dialogFormVisible: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delUserId:[],
      // collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logoTextShow: true,
      pageInfo:{
        pageNum: 1,
        pageSize: 5,
        username: "",
        email: "",
      },
      headerBg: 'headerBg'
    };
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load() {  
          getUserInfo(this.pageInfo).then((res) => {
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
        addUser(this.form).then((res) => {
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
    del(id) {
      DeleteUser(id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.userId)  // [{}, {}, {}] => [1,2,3]
      DeleteUser(ids).then(res => {
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
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = Object.assign({},row)
      this.dialogFormVisible = true
    },
    handleDelete(delUserId){
      this.delDialogFormVisible = true
      this.delUserId[0] = delUserId
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageInfo.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageInfo.pageNum = pageNum
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