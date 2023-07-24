<template>
  <div>
    <el-dialog
        :visible.sync="dialogFormVisible"
        width="800px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        top="5vh">
        <div slot="title" class="dialog-title">调查问卷</div>
        <div class="group-area" v-for="item in styleForm" :key="item.id">
            <div class="radio-group-title">{{ formatQuestionName(item.id) }}</div>
            <el-radio-group v-model=item.studentAnswer>
              <el-radio label="A">{{ item.option1 }}</el-radio>
              <el-radio label="B">{{ item.option2 }}</el-radio>
            </el-radio-group>
        </div>
      <div slot="footer" class="dialog-footer">
        <i class="el-icon-info">填写问卷以为您个性化推荐资源</i>
        <div>
          <el-button type="primary" @click="submitForm()" :loading = isLoading>提 交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStylePaper } from "@/api/studyStylePaperApis.js";
import { updatePersonStyle } from  '@/api/personStylePaperApis'
export default {
  name: 'personStylePaperDialog',
  data() {
    return {
      styleForm: [],
      dialogFormVisible: true,
      isLoading: false,
    };
  },
  created() {
    getStylePaper().then((res) => {
      if (res.code == 200){
        console.log(res.data)
        this.styleForm.push(...res.data)
      }else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    submitForm() {
      if (this.styleFormValidate()){
        let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
        updatePersonStyle(userId,JSON.stringify(this.styleForm)).then((res) => {
          if (res.code == 200){
            this.dialogVisible();
          }else {
            this.$message.error(res.msg);
          }
        })
      }else {
        this.$message.error("请填写全部测试题");
      }
    },
    dialogVisible(){
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    formatQuestionName(id){
      return id + '、' +this.styleForm[id-1].questionName
    },
    styleFormValidate(){
      let isValid = true;
      this.styleForm.forEach((item) => {
        if (item.studentAnswer === undefined){
          isValid = false;
        }
      })
      return isValid;
    }
  },
}
</script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog{
  border-radius: 15px;
}
.dialog-title{
  font-size: 1.7rem;
  text-align: center;
}
.dialog-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.group-area{
  margin-left: 15px;
}
.el-radio-group{
  margin-bottom: 40px;
}
.radio-group-title{
  margin-bottom: 20px;
  font-size: 1.1rem;
}
.el-radio /deep/ .el-radio__label{
  font-size: 0.9rem;
}

.el-icon-info{
  font-size: 0.8rem;
  /* font-weight: 100; */
  color: rgb(160, 157, 157);
}
</style>