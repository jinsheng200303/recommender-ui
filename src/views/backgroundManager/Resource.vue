<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" @input="search" placeholder="请输入资源名称" suffix-icon="el-icon-data-analysis" v-model="pageInfo.resourcesName"></el-input>
      <el-button class="ml" type="primary" @click="search">搜索 <i class="el-icon-search"></i></el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增资源 <i class="el-icon-circle-plus-outline"></i></el-button>
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
          批量删除资源 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="resourceId" label="资源ID" width="100">
      </el-table-column>
      <el-table-column prop="resourceName" label="资源名" width="160">
      </el-table-column>
      <el-table-column prop="resourceType" label="资源类别" width="160">
      </el-table-column>
      <el-table-column prop="resourceLink" label="资源链接" width="160">
      </el-table-column>
      <el-table-column prop="knowledgeId" label="知识点ID" width="160">
      </el-table-column>
      <el-table-column label="操作"  width="300" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="handleDelete(scope.row.resourceId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>
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

    <el-dialog :title="form.resourceId==null?'新增资源':'修改资源'" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
        <el-form-item label="资源名" prop="resourceName">
          <el-input v-model="form.resourceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类别" prop="resourceType">
          <el-select v-model="form.resourceType" filterable placeholder="请选择资源类别">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源链接" prop="resourceLink">
          <el-input v-model="form.resourceLink" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联知识" prop="knowledgeId">
          <el-select v-model="form.knowledgeId" filterable placeholder="请选择知识点">
            <el-option
                v-for="item in knowledgeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="form.knowledgeId" autocomplete="off"></el-input>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除资源" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
      <span>您确定要删除该资源吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="del(delResourceId)">
          确 定 删 除  <i class="el-icon-delete"></i></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleteResourceById, getResourcePage, updateResource} from "@/api/resourcesApis";
import {getKnowledgeList} from "@/api/knowledgeApis";

export default {
  name: "User",
  data() {
    return {
      options: [{
        value: '1',
        label: '文档'
      }, {
        value: '2',
        label: '视频'
      }, ],
      knowledgeOptions: [],
      value: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delResourceId:[],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      form: {
        resourceId: '',
        resourceName: '',
        knowledgeId: '',
        resourceType: '',
        resourceLink: '',
      },
      rules: {
        resourceName: [{required: true, message: '请输入资源名', trigger: 'blur'}],
        resourceType: [{required: true, message: '请选择资源类别', trigger: 'change'}],
        resourceLink: [{required: true, message: '请输入资源链接', trigger: 'blur'}],
        knowledgeId: [{required: true, message: '请选择资源知识点', trigger: 'change'}],
      },
      pageInfo:{
        pageNum: 1,
        pageSize: 5,
        resourcesName: "",
      },
      headerBg: 'headerBg',

    };
  },
  created() {
    // 请求分页查询数据
    this.load();
    this.getKnowledgeOptions()
  },
  methods: {
    getKnowledgeOptions(){
      getKnowledgeList().then((res) => {
        res.forEach((item) => {
          this.knowledgeOptions.push({
            value: item.knowledgeId,
            label: item.knowledgeName,
          })
        })
      })
    },
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
      getResourcePage(this.pageInfo).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      updateResource(this.form).then((res) => {
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
      deleteResourceById(id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.resourceId)  // [{}, {}, {}] => [1,2,3]
      deleteResourceById(ids).then(res => {
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
    handleDelete(delResourceId){
      this.delDialogFormVisible = true
      this.delResourceId[0] = delResourceId
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