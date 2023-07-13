<template>
    <div class="box-card" 
      :tabindex="records.questionId"
      :style="{height: `${boxHeight}px`}"
      :class="{afterSelected:isSelected}">
      <div class="title" ref="title" @click="showInfo">
        {{ truncatedDescription }}
        <div 
        class="areaButton" 
        @click.stop="selecetQuestion" 
        :style="{height: `${boxHeight}px`,width: `${boxWidhth}px`}">撤 销</div>
      </div>
      <div class="info" ref="info">
        <el-radio-group v-model="radioValue">
          <el-radio 
            class="radioButton" 
            v-for="item in records.options" 
            :key="item.optionId" 
            :label=item.optionLabel>
              {{ item.optionValue }}
            </el-radio>
        </el-radio-group>
        <div class="footer">
            {{ footerTip }}
        </div>
      </div>
    </div>
</template>

<script>
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
  props: ["records","index"],
  data() {
    return {
      //盒子高度
      boxHeight: 0,
      boxWidhth: 0,
      isSelected: false,
      questionStatementMaxLength: 20,
      //是否展开
      isActive: false,
      //选择答案值
      radioValue: "",
      //可选项值
      // selectData: [
      // "status":1,
      // "optionId":1,
      // "questionId":1,
      // "optionLabel":"A",
      // "optionValue":"test"
      // ],
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
    showInfo(){
      if(this.isActive){
        this.isActive = false;
        this.boxHeight = this.$refs.title.offsetHeight;
      }else {
        this.isActive = true;
        this.boxHeight = this.$refs.title.offsetHeight + this.$refs.info.offsetHeight;
      }
    },
    selecetQuestion(){
        this.boxWidhth = 1500;
        this.boxHeight = 0;
        this.isSelected = true;
        this.$emit("cancelRefresh",this.index);
    },
  },
  computed: {
    truncatedDescription() {
      return this.records.questionStatement;
    },
    footerTip(){
      
    },
  },
  mounted() {
    // this.selectData = this.records.options;
    this.boxWidhth = 80;
    this.boxHeight = this.$refs.title.offsetHeight;
  },
}
</script>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  transition: 0.6s;
  overflow: hidden;
  margin-bottom: 20px;
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
    position: relative;
}
.areaButton{
    background-color: #ec5050;
    display: inline-block;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 200;
    transition: 0.6s;
    /* width: 100% ; */
    display: flex;
    justify-content: center;
    align-items: center;
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
  justify-content: center;
}
.afterSelected{
    margin-bottom: 0;
}
</style>