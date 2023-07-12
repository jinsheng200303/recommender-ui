<template>
    <el-dialog title="新建试卷" 
        :visible.sync="dialogFormVisible" 
        width="500px" 
        :destroy-on-close="true"
        @closed="resetForm('paperForm')">
        <el-form :model="paperForm" :rules="rules" ref="paperForm" label-width="80px">
            <el-form-item label="试卷名:" prop="paperTitle">
                <el-input v-model="paperForm.paperTitle"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible();resetForm('paperForm');">取 消</el-button>
            <el-button type="primary" @click="submitForm('paperForm')" :loading = isLoading>添 加</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
import { updatePaper } from '@/api/paperApis.js'
    export default {
      data() {
        var validatePaperTitle = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课程名不能为空'));
          } else {
            callback();
          }
        };
        return {
            paperForm: {
                classId: 0,
                paperTitle: "",
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                paperTitle: [
                    { validator: validatePaperTitle, trigger: 'blur' }
                ],
            }
        };
      },
      created() {
        this.paperForm.classId = JSON.parse(sessionStorage.getItem("classInfo")).classId;
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                updatePaper(this.paperForm)
                .then((res) => {
                    if (res.code == 200) {
                        console.log(this.paperForm);
                        console.log(JSON.parse(JSON.stringify(this.paperForm)));
                        this.$emit("newPaperCardRefresh",JSON.parse(JSON.stringify(this.paperForm)));
                        this.dialogFormVisible=false;
                        this.resetForm(formName)
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.isLoading = false;
                });
            }
          });
          console.log(this.paperForm)
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        dialogVisible(){
            this.dialogFormVisible = !this.dialogFormVisible;
        },
      }
    }
  </script>

  <style scoped>
    .el-dialog__wrapper /deep/ .el-dialog{
        border-radius: 15px;
    }
  </style>