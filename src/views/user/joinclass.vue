<template>
    <el-dialog title="加入课堂" 
        :visible.sync="dialogFormVisible" 
        width="500px" 
        :destroy-on-close="true"
        @closed="resetForm('joinForm')">
        <el-form :model="joinForm" :rules="rules" ref="joinForm" label-width="80px">
            <el-form-item label="课堂ID" prop="classId">
                <el-input v-model="joinForm.classId"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible();resetForm('joinForm');">取 消</el-button>
            <el-button type="primary" @click="submitForm('joinForm')" :loading = isLoading>添 加</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import { joinClass } from '@/api/userApis.js'
    export default {
      data() {
        var validateClassId = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课程名不能为空'));
          } else {
            callback();
          }
        };
        return {
            joinForm: {
                classId: null,
                userId: null,
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                classId: [
                    { validator: validateClassId, trigger: 'blur' }
                ],
            }
        };
      },
      created() {
        this.joinForm.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                joinClass(this.joinForm)
                .then((res) => {
                    if (res.code == 200) {
                        this.dialogFormVisible=false;
                        this.resetForm(formName)
                        this.$message.success(res.msg);
                        // this.$emit("call-father");
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.isLoading = false;
                });
            }
          });
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