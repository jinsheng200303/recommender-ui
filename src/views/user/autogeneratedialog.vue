<template>
    <el-dialog title="自动生成" 
        :visible.sync="dialogFormVisible" 
        width="500px" 
        :destroy-on-close="true"
        @closed="resetForm('autoForm')">
        <el-form :model="autoForm" :rules="rules" ref="autoForm" label-width="90px">
            <el-form-item label="选择题个数:" prop="typeChoice">
                <el-input v-model="autoForm.typeChoice"></el-input>
            </el-form-item>
            <el-form-item label="问答题个数:" prop="typeEssay">
                <el-input v-model="autoForm.typeEssay"></el-input>
            </el-form-item>
            <el-form-item label="填空题个数:" prop="typeGap">
                <el-input v-model="autoForm.typeGap"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <i class="el-icon-info">自动组卷将移除所有已选择试题</i>
            <div>
                <el-button @click="dialogVisible();resetForm('autoForm');">取 消</el-button>
                <el-button type="primary" @click="submitForm('autoForm')" :loading = isLoading>添 加</el-button>
            </div>
        </div>
    </el-dialog>
  </template>

  <script>
  import { autoGeneratePaper } from '@/api/paperApis.js'
    export default {
      data() {
        var validateChoiceAccount = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('数量不能为空'));
          } else {
            callback();
          }
        };
        var validateEssayAccount = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('数量不能为空'));
          } else {
            callback();
          }
        };
        var validateGapAccount = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('数量不能为空'));
          } else {
            callback();
          }
        };
        return {
            autoForm: {
                bankId: 0,
                paperId: 0,
                typeChoice: '0',
                typeEssay: '0',
                typeGap: '0',
            },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
                typeChoice: [
                    { validator: validateChoiceAccount, trigger: 'blur' }
                ],
                typeEssay: [
                    { validator: validateEssayAccount, trigger: 'blur' }
                ],
                typeGap: [
                    { validator: validateGapAccount, trigger: 'blur' }
                ],
            }
        };
      },
      created() {
            this.autoForm.bankId = this.$route.query.bankId;
            this.autoForm.paperId = this.$route.query.paperId;
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                if(this.autoForm.typeChoice == 0&&this.autoForm.typeEssay == 0&&this.autoForm.typeGap == 0){
                    this.$message.error("请输入有效个数")
                }else {
                    autoGeneratePaper(this.autoForm)
                    .then((res) => {
                        if (res.code == 200) {
                            this.resetForm(formName)
                            this.$message.success(res.msg);
                            this.dialogVisible();
                            this.$router.go(0);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
                this.isLoading = false;
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
    .dialog-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-icon-info{
        font-size: 0.8rem;
        /* font-weight: 100; */
        color: rgb(160, 157, 157);
    }
  </style>