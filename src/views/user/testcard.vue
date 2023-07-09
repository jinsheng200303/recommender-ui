<template>
    <div class="box-card" 
      :tabindex="records.questionId"
      :style="{height: `${boxHeight}px`}">
      <div class="title" ref="title" @click="showInfo">
        {{ truncatedDescription }}
      </div>
      <div class="info" ref="info">
        <el-radio-group v-model="radioValue">
          <el-radio 
            class="radioButton" 
            v-for="item in selectData" 
            :key="item.optionId" 
            :label=item.optionLabel>
              {{ item.optionValue }}
            </el-radio>
        </el-radio-group>
        <div class="footer" :class="isCorrect ? 'correct':'notcorrect'">
          <div class="tip">
            {{ footerTip }}
          </div>
          <el-button @click="submitAnswer()" type="primary" size="small" class="submitButton" :loading="isLoading">提 交</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import { updateRecords } from '@/api/testApis.js'
export default {
  // records: {
  //   "status": "启用",
  //   "questionId": 2,
  //   "bankId": 1,
  //   "questionType": "填空题",
  //   "knowledgeId": 1,
  //   "questionStatement": "第二题",
  //   "answer": "B",
  //   "difficultyLevel": "难",
  //   "score": "3"
  // },
  props: ["records"],
  data() {
    return {
      //盒子高度
      boxHeight: 0,
      questionStatementMaxLength: 20,
      //是否展开
      isActive: false,
      //选择答案值
      radioValue: "",
      //可选项值
      selectData: [
      // "status":1,
      // "optionId":1,
      // "questionId":1,
      // "optionLabel":"A",
      // "optionValue":"test"
      ],
      isLoading: false,
      //是否已选择
      isNull: false,
      isCorrect: false,
      isSubmited: false,
      saveData: {
          answer: "",
          examId: 0,
          paperId: 0,
          questionId: 0,
          recordId: 0,
          score: "",
          status: 0,
          userId: 0,
      },
    }
  },
  methods: {
    selectQuestion(){
        this.$message.success(this.records.questionStatement)
    },
    showInfo(){
      if(this.isActive){
        this.isActive = false;
        this.boxHeight = this.$refs.title.offsetHeight;
      }else {
        this.isActive = true;
        this.boxHeight = this.$refs.title.offsetHeight + this.$refs.info.offsetHeight;
      }
    },
    submitAnswer(){
      this.isLoading = true;
      this.saveData.answer = this.radioValue;
      this.saveData.questionId = this.records.questionId;
      this.saveData.userId = JSON.parse(window.localStorage.getItem("userInfo")).userId;
      if(this.radioValue == ""){
        this.isNull = true;
      }else {
        updateRecords(this.saveData)
        .then((res) => {
          this.isSubmited = true;
          this.isNull = false;
          if(this.radioValue == this.records.answer){
            this.isCorrect = true;
          }
        })
      }
      this.isLoading = false;
    },
  },
  computed: {
    truncatedDescription() {
      // if(this.isActive){
      //   return this.records.questionStatement;
      // }else if (this.records.questionStatement.length > this.questionStatementMaxLength) {
      //   return this.records.questionStatement.slice(0, this.questionStatementMaxLength) + '...';
      // }else {
      //   return this.records.questionStatement;
      // }
      return this.records.questionStatement;
    },
    footerTip(){
      if(!this.isSubmited){
        return "";
      }else if(this.isNull){
        return "请选择答案";
      }else if(this.isCorrect){
        return "正确";
      }else {
        return "错误";
      }
    },
  },
  created() {

  },
  mounted() {
    this.selectData = this.records.options;
    this.boxHeight = this.$refs.title.offsetHeight;
  },
}
</script>

<style scoped>
.box-card {
  border-radius: 5px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  transition: 0.6s;
  overflow: hidden;
}

.box-card:hover{
  transform: translate(2px,-3px);
  box-shadow: -1px 5px 15px -2px rgba(0, 0, 0, .3);
}

.box-card:active{
  transform: translate(-2px,3px);
}

.title {
  padding: 20px;
  transition: 0.6s;
  font-size: 1.2rem;
  word-break: break-all;
  word-wrap: break-word;
}

.info{
  padding: 20px;
  transition: 0.6s;
  background: #f1f0f0;
}

.el-radio-group{
  display: block;
}

.radioButton{
  display: block;
  margin-bottom: 30px;
}
.radioButton >>> .el-radio__label{
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 22px;
  vertical-align: middle;
  display: inline-block;
}
.footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tip{
  padding-left: 10px;
  font-size: 0.9rem;
}
.correct{
  color: #4dc062;
}
.notcorrect{
  color: #d74f4f;
}
</style>