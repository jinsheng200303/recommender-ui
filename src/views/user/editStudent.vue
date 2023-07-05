<template>
    <el-dialog :title="`编辑学生 -- ${this.editStudentForm.userId} ${this.editStudentForm.userName}`" :visible.sync="dialogFormVisible" width="500px" :destroy-on-close="true">
        <el-form :model="editStudentForm" :rules="rules" ref="editStudentForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="成绩" prop="grade">
            <el-input v-model="editStudentForm.grade"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible">取 消</el-button>
            <el-button type="primary" @click="submitForm('editStudentForm')">确 定</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import axios from 'axios';
    export default {
      data() {
        var validateGrade = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('成绩不能为空'));
          } else if (!Number.isInteger(parseInt(value))) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        };
        return {
          editStudentForm: {
            age: 0,
            avatar: "",
            birth: "",
            email: "",
            gender: "",
            idCard: "",
            name: "",
            password: "",
            phoneNumber: "",
            politics: "",
            profession: "",
            school: "",
            synopsis: "",
            userId: 0,
            userName: ""
          },
          dialogFormVisible: false,
          rules: {
            grade: [
              { validator: validateGrade, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                axios.post("http://localhost:80/student/edit",this.editStudentForm)
                .then((res) => {
                    if (res) {
                        this.dialogFormVisible=false;
                        this.$message.success("修改成功！");
                        this.$emit("call-father");
                    } else {
                        this.$message.error("修改失败！");
                    }
                });
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //表格一行信息传递给表单
        upDateForm(temStudentInfo){
            this.editStudentForm=temStudentInfo;
        },
        dialogVisible(){
            this.dialogFormVisible = !this.dialogFormVisible;
        },
      }
    }
  </script>