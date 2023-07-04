<template>
    <el-dialog :title=title :visible.sync="dialogFormVisible" width="500px" :destroy-on-close="true">
        <el-form :model="loginPerson" :rules="rules" ref="loginPerson" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
            <el-input v-model="loginPerson.userName" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input v-model="loginPerson.password" autocomplete="on"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('loginPerson')">登 录</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import {userLogin} from '@/api/userApis.js'
    export default {
      data() {
        var validateName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          } else {
            callback();
          }
            
        };
        var validatePass = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('密码不能为空'));
          } else {
            callback();
          }
        };
        return {
          loginPerson: {
            password: "",
            userName: "",
          },
          personInfo: {
            
          },
          title: "登录",
          dialogFormVisible: false,
          rules: {
            userName: [
              { validator: validateName, trigger: 'blur' }
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                userLogin(this.loginPerson)
                .then((res) => {
                    if (res.data.code == 200) {
                        let userInfo = res.data.data
                        localStorage.setItem("userInfo",JSON.stringify(userInfo))
                        localStorage.setItem("token",userInfo.token)
                        this.dialogFormVisible=false;
                        this.$message.success(res.data.msg);
                        // this.$emit("call-father");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        dialogVisible(){
            this.dialogFormVisible = true;
        },
      }
    }
  </script>