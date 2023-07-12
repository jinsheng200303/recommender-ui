<template>
    <el-dialog title="新建考试" 
        :visible.sync="dialogFormVisible" 
        width="500px" 
        :destroy-on-close="true"
        @closed="resetForm('temInfo')">
        <el-form :model="temInfo" :rules="rules" ref="temInfo" label-width="80px" @closed="resetForm('temInfo')">
          <el-form-item label="考试名:" prop="examTitle">
            <el-input v-model="temInfo.examTitle"></el-input>
          </el-form-item>
          <el-form-item label="考试时间:" prop="timeRange">
            <el-date-picker v-model="temInfo.timeRange" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible();resetForm('temInfo');">取 消</el-button>
            <el-button type="primary" @click="submitForm('temInfo')" :loading = isLoading>添 加</el-button>
        </div>
    </el-dialog>
  </template>

  <script>
  import { updateExam } from '@/api/examApis.js'
    export default {
      data() {
        var validateExamTitle = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('考试名不能为空'));
          } else {
            callback();
          }
        };
        var validateTimeRange = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('考试时间不能为空'));
          }else if(value[0] == value[1]) {
            return callback(new Error('开考和结束时间不能相同'));
          }else {
            callback();
          }
        };
        return {
            temInfo:{
                examTitle: "",
                timeRange: [new Date(),new Date()],
            },
            // examInfo: {
            //     classId: 0,
            //     endTime: new Date(),
            //     examId: 0,
            //     examTitle: "",
            //     startTime: new Date(),
            //     status: 0,
            //     timeDuration: "",
            //     totalMarks: 0,
            // },
            dialogFormVisible: false,
            isLoading: false,
            rules: {
              examTitle: [
                { validator: validateExamTitle, trigger: 'blur' }
              ],
              timeRange: [
                { validator: validateTimeRange, trigger: 'blur' }
              ],
            },
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isLoading = true;
                let examInfo = {
                    classId: JSON.parse(window.sessionStorage.getItem("classInfo")).classId,
                    examTitle: this.temInfo.examTitle,
                    startTime: this.temInfo.timeRange[0],
                    endTime: this.temInfo.timeRange[1],
                }
                // this.examInfo.examTitle = this.temInfo.examTitle;
                // this.examInfo.startTime = this.temInfo.timeRange[0];
                // this.examInfo.endTime = this.temInfo.timeRange[1];
                updateExam(examInfo)
                .then((res) => {
                    if (res.code == 200) {
                        this.resetForm(formName)
                        this.$message.success(res.msg);
                        let newExam = {
                            examTitle: examInfo.examTitle,
                            startTime: examInfo.startTime,
                            endTime: examInfo.endTime,
                        }
                        this.$emit("addRefresh",newExam);
                        this.dialogFormVisible=false;
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
      },
      created() {
        // this.examInfo.classId =  JSON.parse(window.sessionStorage.getItem("classInfo")).classId;
      },
    }
  </script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog{
    border-radius: 15px;
}
</style>