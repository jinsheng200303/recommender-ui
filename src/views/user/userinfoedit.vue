<template>
    <el-dialog 
        class="dialog"
        title="编辑个人信息" 
        :visible.sync="dialogFormVisible" 
        width="500px" 
        :destroy-on-close="true"
        @closed="resetForm('userInfoForm')">
        <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="80px">
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="userInfoForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
                <el-select v-model="userInfoForm.gender">
                    <el-option label="男" value="M"></el-option>
                    <el-option label="女" value="F"></el-option>
                    <el-option label="未知" value="U"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期:" prop="birth">
                <el-date-picker
                v-model="userInfoForm.birth"
                type="date"
                value-format="yyyy-MM-dd[T]HH:mm:ss"
                style="width: 100%;"
                :editable="false"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="简介:" prop="synopsis">
                <el-input 
                    v-model="userInfoForm.synopsis" 
                    type="textarea" 
                    maxlength="500"
                    :show-word-limit="true"
                    rows="6"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible();resetForm('userInfoForm');">取 消</el-button>
            <el-button type="primary" @click="submitForm('userInfoForm')" :loading = isLoading>修 改</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import { editUserInfo } from '@/api/userApis.js'
    export default {
      data() {
        var validateUerName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          } else {
            callback();
          }
        };
        var validateGender = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请选择性别'));
          } else {
            callback();
          }
        };
        return {
            userInfoForm: {
                // userId: 0,
                // userName: "",
                // email: "",
                // gender: "",
                // synopsis: "",
                // ......
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                userName: [
                    { validator: validateUerName, trigger: 'blur' }
                ],
                gender: [
                    { validator: validateGender, trigger: 'blur' }
                ],
            }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                editUserInfo(this.userInfoForm)
                .then((res) => {
                    if (res.code == 200) {
                        this.dialogFormVisible=false;
                        this.$message.success(res.msg);
                        this.$emit("submitInfo",this.userInfoForm);
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
        updateForm(userInfo){
            this.userInfoForm = userInfo;
        }
      }
    }
  </script>

<style scoped>
.dialog /deep/ .el-dialog{
    border-radius: 15px;
}
.el-form{
    margin-right: 20px;
}
.el-select{
    width: 100%;
}
</style>