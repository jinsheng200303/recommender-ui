<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" @input="search" placeholder="请输入课堂名" suffix-icon="el-icon-data-analysis" v-model="pageInfo.className"></el-input>
            <el-input style="width: 200px" @input="search" placeholder="请输入教师名" suffix-icon="el-icon-user" class="ml" v-model="pageInfo.userName"></el-input>
            <el-input style="width: 200px" @input="search" placeholder="请输入课堂类别" suffix-icon="el-icon-s-grid" class="ml" v-model="pageInfo.categoryName"></el-input>
            <el-button class="ml" type="primary" @click="search">搜索 <i class="el-icon-search"></i></el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增课堂 <i class="el-icon-circle-plus-outline"></i></el-button>
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
              批量删除课堂 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
            </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="classId" label="课堂ID" width="100">
            </el-table-column>
            <el-table-column prop="className" label="课堂名" width="160">
            </el-table-column>
            <el-table-column prop="categoryName" label="课堂类别" width="160">
            </el-table-column>
            <el-table-column prop="createUserId" label="教师ID" width="160">
            </el-table-column>
            <el-table-column prop="userName" label="教师名" width="160">
            </el-table-column>
            <el-table-column prop="createdTime" label="创建时间" width="180">
            </el-table-column>      
            <el-table-column label="操作"  width="300" align="center">
              <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDelete(scope.row.classId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>
            </template>
            
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-if="pageshow">
            </el-pagination>
          </div>

          <el-dialog :title="form.classId==null?'新增课堂信息':'修改课堂信息'" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
            <el-form-item label="课堂名" prop="className">
              <el-input v-model="form.className" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="课堂类别" prop="classCategoryId">
              <el-select v-model="form.classCategoryId" filterable placeholder="请选择课堂类别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教师ID" prop="createUserId">
              <el-input v-model="form.createUserId" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除课堂" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该课堂吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="del(delClassId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {getTeacherClassInfo} from "@/api/classApis.js";
import {newClass} from "@/api/classApis.js";
import {deleteClass} from "@/api/classApis.js";

export default { 
    name: "User",
  data() {
    return {
      options: [{
          value: '1',
          label: 'java'
        }, {
          value: '2',
          label: 'python'
        }, {
          value: '3',
          label: '数据库'
        }, {
          value: '4',
          label: '数据结构'
        }, {
          value: '5',
          label: '智能终端'
        }, {
          value: '6',
          label: 'C++'
        }],
        value: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delClassId:[],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      form: {
        classId: '',
        className: '',
        classCategoryId: '',
        createUserId: '',
        classPicture: '',
      },
      rules: {
        className: [{required: true, message: '请输入课堂名', trigger: 'blur'}],
        classCategoryId: [{required: true, message: '请选择课堂类别', trigger: 'change'}],
        createUserId: [{required: true, message: '请输入教师ID', trigger: 'blur' },],
      },
      pageInfo:{
        pageNum: 1,
        pageSize: 5,
        className: "",
        userName: "",
        categoryName: "",
      },
      headerBg: 'headerBg',
      
    };
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    search(){
      this.pageshow = false;
      this.pageInfo.pageNum=1;
      this.load()
      this.$nextTick(() => {
        this.pageshow = true;
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
          getTeacherClassInfo(this.pageInfo).then((res) => {
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
        newClass(this.form).then((res) => {
          console.log(res)
          if (res.msg=='操作成功') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else if(res.msg=='用户权限不足！') {
          this.$message.error("该用户权限不足！")
        }else{
          this.$message.error("保存失败！")
        }
      })
    },
    del(id) {
      deleteClass(id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.classId)  // [{}, {}, {}] => [1,2,3]
      deleteClass(ids).then(res => {
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
    handleDelete(delClassId){
      this.delDialogFormVisible = true
      this.delClassId[0] = delClassId
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
/* .el-menu-item,
.el-menu-item-group,
.el-submenu.el-menu-item,
.el-menu {
  color: rgb(255, 255, 255);
  background-color: rgb(166, 208, 211);
} */
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