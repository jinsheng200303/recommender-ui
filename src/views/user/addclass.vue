<template>
    <el-dialog title="新增课程" :visible.sync="dialogFormVisible" width="500px" :destroy-on-close="true" :modal-append-to-body="false">
        <el-form :model="classes" :rules="rules" ref="classes" label-width="80px">
            <el-form-item label="课堂名:" prop="className">
                <el-input v-model="classes.className"></el-input>
            </el-form-item>
            <el-form-item label="课堂类别:" prop="categoryId">
              <el-select v-model="classes.categoryId" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in classCategoryOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="课堂图片:" prop="classPicture">
                <input type="file" @change="onchangemd">
                <el-input type="file" v-model="classes.classPicture"></el-input>
            </el-form-item> -->
            <el-form-item label="课堂简介:" prop="description">
              <el-input 
                    v-model="classes.description" 
                    type="textarea" 
                    maxlength="500"
                    :show-word-limit="true"
                    rows="6"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('classes')" :loading = isLoading>添 加</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import {addClass} from '@/api/classApis.js'
    export default {
      data() {
        var validateClassName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课程名不能为空'));
          } else {
            callback();
          }  
        };
        var validateDescription = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课堂简介不能为空'));
          } else {
            callback();
          }
        };
        var validateCategoryId = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课堂类别不能为空'));
          } else {
            callback();
          }
        };
        var validateClassPicture = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('课堂图片不能为空'));
          } else {
            callback();
          }
        };
        return {
            classes: {
                className: "",
                classPicture: "",
                description: "",
                categoryId: '',
                createUserId: 0,
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                className: [
                    { validator: validateClassName, trigger: 'blur' }
                ],
                description: [
                    { validator: validateDescription, trigger: 'blur' }
                ],
                categoryId: [
                    { validator: validateCategoryId, trigger: 'change' }
                ],
                classPicture: [
                    { validator: validateClassPicture, trigger: 'change' }
                ],
            },
            //选择器选项
            classCategoryOptions: [
                {
                  value: '1',
                  label: '数据库'
                }, 
                {
                  value: '2',
                  label: '数据结构'
                },
                {
                  value: '3',
                  label: '数学建模'
                },
                {
                  value: '4',
                  label: '计算机网络'
                },
                {
                  value: '5',
                  label: '操作系统'
                },
            ],
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                this.classes.createUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
                console.log(this.classes);
                addClass(this.classes)
                .then((res) => {
                    if (res.code == 200) {
                        this.dialogFormVisible=false;
                        this.$message.success(res.msg);
                        this.$emit("call-father");
                    } else {
                        this.isLoading = false;
                        this.$message.error(res.msg);
                    }
                });
            }
          });
        },
        dialogVisible(){
            this.dialogFormVisible = true;
        },
        // onchangemd(e){
        //   console.log(e.target.files)//这个就是选中文件信息
        //   let formdata = new FormData()
        //   Array.from(e.target.files).map(item => {
        //       console.log(item)
        //       formdata.append("file", item)  //将每一个文件图片都加进formdata
        //     })
        //     axios.post("接口地址", formdata).then(res => { console.log(res) })
        // },
      }
    }
  </script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog{
    border-radius: 15px;
}
</style>