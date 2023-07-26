<template>
    <div class="box-card">
        <div class="title" ref="title">
            {{ truncatedDescription }}
        </div>
        <div class="info" ref="info">
            <el-radio-group v-model="radioValue" @change="saveSelected" :disabled="isSubmited">
                <el-radio class="radioButton" v-for="item in records.options" :key="item.optionId" :label=item.optionLabel>
                    {{ item.optionValue }}
                </el-radio>
            </el-radio-group>
        </div>
        <div class="footer" :class="isCorrect ? 'correct':'notcorrect'">
            {{ afterAnswer }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["records","index"],
    data() {
        return {
            questionStatementMaxLength: 20,
            //选择答案值
            radioValue: "",
            //可选项值
            // records.options: [
                // "status":1,
                // "optionId":1,
                // "questionId":1,
                // "optionLabel":"A",
                // "optionValue":"test"
            // ],
            //是否已选择
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
            isCorrect: false,
            isSubmited: false,
        }
    },
    methods: {
        saveSelected(){
            this.$emit("selectedRefresh",this.radioValue,this.index)
        },
        submitRefresh(){
            this.isSubmited = true;
        },
        checkRefresh(){
          this.radioValue = this.records.studentAnswer;
        }
    },
    computed: {
        truncatedDescription() {
            return this.index+1 + "、" + this.records.questionStatement;
        },
        afterAnswer(){
            if(this.isSubmited){
                if(this.radioValue == this.records.answer){
                    this.isCorrect = true;
                    return "正确";
                }else {
                    this.isCorrect = false;
                    return "错误 " + "答案: " +this.records.answer;
                }
            }  
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>

<style scoped>
.box-card {
  transition: 0.6s;
  overflow: hidden;
  margin-bottom: 30px;
}
.title {
  padding: 10px;
  transition: 0.6s;
  font-size: 1.1rem;
  word-break: break-all;
  word-wrap: break-word;
}

.info{
  padding: 10px;
  transition: 0.6s;
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
    float: right;
}
.correct{
  color: #4dc062;
}
.notcorrect{
  color: #d74f4f;
}
</style>