<template>
    <el-dialog title="新增课程" :visible.sync="dialogFormVisible" width="500px" :destroy-on-close="true">
        <el-form :model="classes" :rules="rules" ref="classes" label-width="80px">
            <el-form-item label="课程名" prop="className">
                <el-input v-model="classes.className"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="classPicture">
                <el-input v-model="classes.classPicture"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('classes')" :loading = isLoading>添 加</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import {addClass} from '@/api/classes.js'
    export default {
      data() {
        var validateClassName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课程名不能为空'));
          } else {
            callback();
          }  
        };
        var validateClassPicture = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('图片不能为空'));
          } else {
            callback();
          }
        };
        return {
            classes: {
                classId: 0,
                className: "",
                classPicture: "",
                createdTime: ""
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                className: [
                    { validator: validateClassName, trigger: 'blur' }
                ],
                classPicture: [
                    { validator: validateClassPicture, trigger: 'blur' }
                ],
            }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                addClass(this.classes)
                .then((res) => {
                    if (res.data.code == 200) {
                        this.dialogFormVisible=false;
                        this.$message.success(res.data.msg);
                        this.$emit("call-father");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
          });
        },
        dialogVisible(){
            this.dialogFormVisible = true;
        },
      }
    }
  </script>