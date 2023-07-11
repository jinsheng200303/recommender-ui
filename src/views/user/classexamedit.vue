<template>
  <el-dialog title="编 辑" :visible.sync="dialogFormVisible" width="500px" :destroy-on-close="true">
    <el-form :model="temInfo" :rules="rules" ref="temInfo" label-width="80px" @closed="resetForm('examInfo')">
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
      <el-button @click="dialogVisible();resetForm('temInfo')">取 消</el-button>
      <el-button type="primary" @click="submitForm('temInfo')" :loading=isLoading>修 改</el-button>
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
      } else {
        callback();
      }
    };
    return {
      // examInfo:{
      //     status: 1,
      //     examId: 0,
      //     examTitle: "编译原理",
      //     timeDuration: "2011-05-10T03:10:14.000+00:00",
      //     totalMarks: 100,
      //     startTime: "2017-03-18 06:10:30",
      //     endTime: "2011-09-05 14:23:10",
      //     classId: 1,
      // },
      examInfo: {},
      temInfo:{
        examTitle: "",
        timeRange: [],
      },
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
          this.examInfo.examTitle = this.temInfo.examTitle;
          this.examInfo.startTime = this.temInfo.timeRange[0];
          this.examInfo.endTime = this.temInfo.timeRange[1];
          updateExam(this.examInfo)
          .then((res) => {
            if(res.code == 200){
              this.dialogVisible();
              this.$message.success(res.msg);
              this.$emit("editRefresh",this.examInfo);
            }else {
              this.$message.error(res.msg);
            }
          })
          this.isLoading = false;
        }
      });
    },
    dialogVisible() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    updateExamInfo(examInfo) {
      this.examInfo = examInfo;
      this.temInfo.examTitle = examInfo.examTitle;
      this.temInfo.timeRange[0] = examInfo.startTime;
      this.temInfo.timeRange[1] = examInfo.endTime;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog{
    border-radius: 15px;
}
</style>