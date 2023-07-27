<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" @input="search" placeholder="请输入课程名称" suffix-icon="el-icon-data-analysis" v-model="pageInfo.lessonName"></el-input>
      <el-button class="ml" type="primary" @click="search">搜索 <i class="el-icon-search"></i></el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增课程 <i class="el-icon-circle-plus-outline"></i></el-button>
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
      <el-table-column prop="lessonId" label="课程ID" width="100">
      </el-table-column>
      <el-table-column prop="lessonName" label="课程名" width="160">
      </el-table-column>
      <el-table-column prop="category" label="课程类别" width="160">
      </el-table-column>
      <el-table-column prop="intro" label="课程描述" width="160">
      </el-table-column>
      <el-table-column prop="lessonPicture" label="图片链接" width="160">
      </el-table-column>
      <el-table-column prop="lessonLink" label="课程链接" width="160">
      </el-table-column>
      <el-table-column prop="knowledgeId" label="知识点ID" width="160">
      </el-table-column>
      <el-table-column label="操作"  width="300" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="handleDelete(scope.row.lessonId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>
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

    <el-dialog :title="form.resourceId==null?'新增课程':'修改课程'" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
        <el-form-item label="课程名" prop="lessonName">
          <el-input v-model="form.lessonName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程类别" prop="resourceType">
          <el-select v-model="form.category" filterable placeholder="请选择课程类别">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" prop="lessonPicture">
          <el-input v-model="form.lessonPicture" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程链接" prop="lessonLink">
          <el-input v-model="form.lessonLink" autocomplete="off"></el-input>
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除课程" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
      <span>您确定要删除该资源吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="del(delLessonId)">
          确 定 删 除  <i class="el-icon-delete"></i></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getKnowledgeList} from "@/api/knowledgeApis";
import {deleteLessonById, getLessonPage, updateLesson} from "@/api/lessonApis";
import {getQuestionBank} from "@/api/testApis";

export default {
  name: "User",
  data() {
    return {
      options: [],
      knowledgeOptions: [],
      value: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      delDialogFormVisible: false,
      multipleSelection: [],
      delLessonId:[],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      form: {
        lessonId: '',
        lessonName: '',
        intro: '',
        lessonPicture: '',
        lessonLink: '',
        category: '',
        knowledgeId: '',
      },
      rules: {
        lessonName: [{required: true, message: '请输入课程名', trigger: 'blur'}],
        intro: [{required: true, message: '请输入课程描述', trigger: 'blur'}],
        lessonPicture: [{required: true, message: '请输入图片链接', trigger: 'blur'}],
        lessonLink: [{required: true, message: '请输入课程链接', trigger: 'blur'}],
        category: [{required: true, message: '请输入课程类别', trigger: 'change'}],
        knowledgeId: [{required: true, message: '请选择资源知识点', trigger: 'change'}],
      },
      pageInfo:{
        pageNum: 1,
        pageSize: 5,
        lessonName: "",
      },
      headerBg: 'headerBg',
    };
  },
  created() {
    // 请求分页查询数据
    this.load();
    this.getKnowledgeOptions();
    this.getOptions();
  },
  methods: {
    getOptions(){
      getQuestionBank().then((res) => {
        res.forEach((item) => {
          this.options.push({
            value: item.bankId,
            label: item.bankName,
          })
        })
      })
    },
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
      getLessonPage(this.pageInfo).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      updateLesson(this.form).then((res) => {
        console.log(this.form)
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
      deleteLessonById(id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.lessonId)  // [{}, {}, {}] => [1,2,3]
      deleteLessonById(ids).then(res => {
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
    handleDelete(delLessonId){
      this.delDialogFormVisible = true
      this.delLessonId[0] = delLessonId
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