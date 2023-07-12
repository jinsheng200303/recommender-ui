<template>
    <div class="box-card" 
      :tabindex="item.paperId"
      :style="{height: `${boxHeight}px`}">
      <div class="title" ref="title">
        {{ truncatedDescription }}
      </div>
      <div class="handleArea">
        <div class="areaButton" style="background-color: #409EFF;left: 0;" @click="handleEdit">编 辑</div>
        <div class="areaButton" style="background-color: #F56C6C;right: 0;" @click="deletePaper">删 除</div>
      </div>
    </div>
</template>

<script>
import { deletePapers } from '@/api/paperApis.js'
export default {
  props: ["item","index"],
  data() {
    return {
      //盒子高度
      boxHeight: 0,
      questionStatementMaxLength: 20,
      isLoading: false,
      paperData: {},
    }
  },
  methods: {
    handleEdit(){
        this.$emit("editPaper",this.item.paperId);
    },
    deletePaper(){
        this.$confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(() => {
            let Ids = [];
            Ids.push(this.item.paperId);
            deletePapers(Ids)
            .then((res) => {
                if(res.code == 200){
                    this.$emit("deleteRefresh",this.index)
                    this.$message.success(res.msg);
                }else {
                    this.$message.error(res.msg);   
                }
            })
        })
    },
  },
  computed: {
    truncatedDescription() {
      return this.item.paperTitle;
    },
  },
  created() {
    this.paperData = this.item;
  },
  mounted() {
    this.boxHeight = this.$refs.title.offsetHeight;
  },
  watch: {
    item: {
        immediate: true,
        handler(val){
            this.item = val;
        }
    }
  }
}
</script>

<style scoped>
.box-card {
  border-radius: 10px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  transition: 0.6s;
  overflow: hidden;
  padding: 20px;
  position: relative;
  background-color: rgb(245, 245, 245);
}
.box-card:hover{
  transform: translate(2px,-3px);
  box-shadow: -1px 5px 15px -2px rgba(0, 0, 0, .3);
}
.box-card:active{
  transform: translate(-2px,3px);
}
.title {
  transition: 0.6s;
  font-size: 1.2rem;
  /* word-break: break-all;
  word-wrap: break-word; */
  display: inline-block;
  vertical-align: super;
}
.handleArea{
    height: 100%;
    width: 15%;
    max-width: 175px;
    min-width: 120px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
}
.areaButton{
    width: 50%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .info{
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
} */
</style>