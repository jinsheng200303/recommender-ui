<template>
  <div>
    <div style="margin: 10px 0">
            <el-input style="width: 200px" @input="search" placeholder="请输入试题描述" 
                suffix-icon="el-icon-document" v-model="questionInfo.questionStatement">
            </el-input>
            <el-input style="width: 200px" @input="search" placeholder="请输入题库名" 
                suffix-icon="el-icon-s-flag" class="ml" v-model="questionInfo.bankName">
            </el-input>
            <el-button class="ml" type="primary" @click="search">搜索 
                <i class="el-icon-search"></i>
            </el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增试题<i class="el-icon-circle-plus-outline"></i></el-button>
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
              批量删除试题 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
            </div>

          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="expand" width="20">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" style="color: #99a9bf;">
                        <el-form-item label="试题描述:" style="margin-left:10px;">
                            <span>{{ props.row.questionStatement }}</span>
                        </el-form-item>
                        <!-- <el-form-item label="知识点ID:" style="margin-left:10px;">
                            <span>{{ props.row.knowledgeId }}</span>
                        </el-form-item> -->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="questionId" label="试题ID" width="140">
            </el-table-column>
            <el-table-column prop="bankName" label="题库名" width="140">
            </el-table-column>
            <el-table-column prop="knowledgeName" label="关联知识点" width="200">
            </el-table-column>
            <el-table-column prop="answer" label="试题答案" width="240">
            </el-table-column>
            <el-table-column prop="score" label="试题分数" width="100">
            </el-table-column>
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="manageOptions(scope.row.questionId)">管理试题选项 <i class="el-icon-edit-outline"></i></el-button>
              <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDelete(scope.row.questionId)" slot="reference" class="ml">删除 <i class="el-icon-remove-outline"></i></el-button>
            </template>
            </el-table-column>
          </el-table>
          
          <div style="padding: 10px 0">
            <el-pagination
              @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="questionInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-if="pageshow">
            </el-pagination>
          </div>

          <el-dialog :title="form.questionId==null?'新增试题信息':'修改试题信息'" :visible.sync="DialogFormVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="small">
            <el-form-item label="试题描述" prop="questionStatement">
              <el-input v-model="form.questionStatement" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="试题答案" prop="answer">
              <el-input v-model="form.answer" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="题库" prop="bankId">
              <el-select v-model="form.bankId" filterable placeholder="请选择题库">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="知识点" prop="knowledgeId">
              <el-select v-model="form.knowledgeId" filterable placeholder="请选择知识点">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试题分数" prop="score">
              <el-input v-model="form.score" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="DialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="管理试题选项" :visible.sync="manageOptionsDialog" width="70%" center :close-on-click-modal=false>
        <el-button type="primary" style="margin-bottom:10px" @click="addOption">新增选项<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-popconfirm
              class="ml"
              confirm-button-text='确定'
              cancel-button-text='算了'
              icon="el-icon-info"
              icon-color="red"
              title="您确定批量删除这些数据吗？"
              @confirm="optionsDelBatch"
          >
            <el-button type="danger" class="ml" slot="reference" :disabled="this.multipleSelection.length == 0  ?  true : false">
              批量删除选项 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
          <el-table :data="optionsTableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="optionId" label="选项ID" width="100">
            </el-table-column>
            <el-table-column prop="optionLabel" label="选项标号" width="100">
            </el-table-column>
            <el-table-column prop="optionValue" label="选项内容" width="440">
            </el-table-column>
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEditOption(scope.row)">选项编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger" @click="handleDeleteOption(scope.row.optionId)" slot="reference" class="ml">删除选项 <i class="el-icon-remove-outline"></i></el-button>
            </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="manageOptionsDialog = false">完 成</el-button>
          </div>
        </el-dialog>

        <el-dialog :title="formOption.optionId==null?'新增选项信息':'修改选项信息'" 
        :visible.sync="DialogFormOptionVisible" width="30%" center :close-on-click-modal=false destroy-on-close>
          <el-form :model="formOption" ref="formOption" :rules="rules" label-width="80px" size="small">
            <el-form-item label="选项标号" prop="optionLabel">
              <el-input v-model="formOption.optionLabel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="选项内容" prop="optionValue">
              <el-input v-model="formOption.optionValue" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="DialogFormOptionVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitFormOption(formOption)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除试题" :visible.sync="delDialogFormVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该试题吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="del(delQuestionId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>

        <el-dialog title="删除选项" :visible.sync="delDialogFormOptionVisible" width="30%" center :close-on-click-modal=false>
          <span>您确定要删除该选项吗？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogFormOptionVisible = false">取 消</el-button>
            <el-button type="primary" @click="delOption(delOptionId)">
              确 定 删 除  <i class="el-icon-delete"></i></el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {getQuestionInfo} from "@/api/questionApis.js";
import {reviseQuestionInfo} from "@/api/questionApis.js";
import {deleteQuestionInfo} from "@/api/questionApis.js";
import {findQuestionOptions} from "@/api/questionApis.js";
import {reviseOptionInfo} from "@/api/optionApis.js";
import {deleteOptionInfo} from "@/api/optionApis.js";

export default { 
    name: "Question",
  data() {
    return {
        options: [{
          value: '1',
          label: '数据库'
        }, {
          value: '2',
          label: '数据结构'
        }, {
          value: '3',
          label: '数学建模'
        }, {
          value: '4',
          label: '计算机网络'
        }, {
          value: '5',
          label: '操作系统'
        }],
        options2: [{
          value: '1',
          label: '数据库基本数据类型'
        }, {
          value: '2',
          label: '数据库基本概念'
        }],
        value: '',
      tableData: [],
      optionsTableData: [],
      questionData: [],
      expends: [],
      checks: [],
      questionId: 0,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      questionName: '',
      form: {
        questionId: '',
        questionStatement: '',
        questionType: "1",
        flag: '',
      },
      formOption: {
        optionId: '',
        optionValue: '',
        optionLabel: '',
        questionId: '',
      },
      rules: {
        questionStatement: [{required: true, message: '请输入试题描述', trigger: 'blur'}],
        answer: [{required: true, message: '请输入试题答案', trigger: 'blur'}],
        questionType: [{required: true, message: '请选择试题类别', trigger: 'blur'}],
        bankId: [{required: true, message: '请选择题库', trigger: 'blur'}],
        knowledgeId: [{required: true, message: '请选择知识点', trigger: 'blur'}],
        score: [{required: true, message: '请输入分数', trigger: 'blur'}],
        optionLabel: [{required: true, message: '请输入选项标签', trigger: 'blur'}],
        optionValue: [{required: true, message: '请输入选项内容', trigger: 'blur'}],
      },
      DialogFormOptionVisible:false,
      DialogFormVisible: false,
      dialogFormVisible: false,
      manageOptionsDialog: false,
      delDialogFormVisible: false,
      delDialogFormOptionVisible: false,
      multipleSelection: [],
      delQuestionId:[],
      delOptionId: [],
      sideWidth: 200,
      logoTextShow: true,
      pageshow: true,
      questionInfo:{
        pageNum: 1,
        pageSize: 5,
        questionStatement: '',
        bankName: '',
      },
      questionPermissionInfo: {
        questionId: '',
        questionName: '',
        questionName: '',
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
      this.questionInfo.pageNum=1;
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
      submitFormOption(formOption){
        this.$refs.formOption.validate((valid) => {
          if (valid) {
            this.saveOptions();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    load() {  
          getQuestionInfo(this.questionInfo).then((res) => {
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      },
      loadOption(){
          findQuestionOptions(this.questionId).then(res => {
            console.log(res)
            this.optionsTableData = res.data
        })
      },
    handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
    save() {
      reviseQuestionInfo(this.form).then((res) => {
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
    saveOptions(){
      console.log(this.formOption)

      reviseOptionInfo(this.formOption).then((res) => {
          console.log(res)
          if (res.msg=='操作成功') {
          this.$message.success("保存成功")
          this.DialogFormOptionVisible = false
          this.loadOption()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    del(id) {
      deleteQuestionInfo(id).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.load()
          this.delDialogFormVisible = false
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delOption(id){
      console.log(id)
      deleteOptionInfo(id).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.delDialogFormOptionVisible = false
          this.loadOption()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.questionId)  // [{}, {}, {}] => [1,2,3]
      deleteQuestionInfo(ids).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    optionsDelBatch(){
      let ids = this.multipleSelection.map(v => v.optionId)  // [{}, {}, {}] => [1,2,3]
      deleteOptionInfo(ids).then(res => {
        if (res.msg=='操作成功') {
          this.$message.success("删除成功")
          this.loadOption()
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
    addOption(){
      this.DialogFormOptionVisible = true
      this.formOption = {}
      this.formOption.questionId = this.questionId
},
    handleEdit(row) {
      this.form = Object.assign({},row)
      this.DialogFormVisible = true
    },
    handleEditOption(row) {
      this.formOption = Object.assign({},row)
      console.log(this.formOption)
      this.DialogFormOptionVisible = true
    },
    manageOptions(questionId) {
      this.questionId = questionId
      this.formOption.questionId = questionId
      this.loadOption()
      this.manageOptionsDialog = true
    },
    handleDelete(delQuestionId){
      console.log(this.delQuestionId)
      this.delDialogFormVisible = true
      this.delQuestionId[0] = delQuestionId
    },
    handleDeleteOption(delOptionId){
      this.delDialogFormOptionVisible = true
      this.delOptionId[0] = delOptionId
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.questionInfo.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.questionInfo.pageNum = pageNum
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

.demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
</style>

<style>
.headerBg {
  background: rgb(240, 240, 210)!important;
}
</style>