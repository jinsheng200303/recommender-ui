<template>
    <div>
        <classexamedit ref="classexamedit" @editRefresh="editRefresh"></classexamedit>
        <div class="exam-card" @click="startExam" :style="{height: `${boxHeight}px`}">
            <div class="info"
            ref="examCardInfo">
                <div class="title">
                    <div style="font-size: 1.5rem;">{{ examInfo.examTitle }}</div>
                    <div style="color: rgb(147, 218, 40);">{{ examInfo.totalMarks }}</div>
                </div>
                <div class="exam-time" style="color: #13a8e8;">
                    <div>{{ examInfo.startTime }}</div>
                    <div>{{ examInfo.endTime }}</div>
                </div>
            </div>
            <div class="handle-area">
                <el-button type="primary" @click.stop="handleEdit">编 辑</el-button>
                <el-button type="danger" @click.stop="handleDelete">删 除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { deleteExamsByIds } from "@/api/examApis.js";
import classexamedit from './classexamedit.vue';
export default {
    components: {
        classexamedit,
    },
    props: ["index","item"],
    data() {
        return {
            examInfo: this.item,
            boxHeight: 0,
            // testInfo:{
            //     status: 1,
            //     examId: 0,
            //     examTitle: "编译原理",
            //     timeDuration: "2011-05-10T03:10:14.000+00:00",
            //     totalMarks: 100,
            //     startTime: "2017-03-18 06:10:30",
            //     endTime: "2011-09-05 14:23:10",
            //     classId: 1,
            // },
        }
    },
    methods: {
        startExam(){
            let roleId = JSON.parse(localStorage.getItem("userInfo")).roleId;
            if(roleId == 1){
                this.$message.success("成功选择");
            }
        },
        handleEdit(){
            this.$nextTick(() => {
                this.$refs.classexamedit.dialogVisible();
            })
            this.$nextTick(() => {
                this.$refs.classexamedit.updateExamInfo(JSON.parse(JSON.stringify(this.examInfo)));
            })
        },
        editRefresh(temInfo){
            console.log(this.index);
            this.$emit("cardRefresh",temInfo,this.index)
            this.examInfo = temInfo;
        },
        handleDelete(){
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                let ids = [];
                ids.push(this.examInfo.examId);
                deleteExamsByIds(ids)
                .then((res) => {
                    if(res.code == 200){
                        this.$emit("deleteRefresh",this.examInfo.examId);
                        this.$message.success(res.msg);
                    }else {
                        this.$message.error(res.msg);
                    }
                })
            })
        },
    },
    watch: {
        item(newVal,oldVal){
            this.examInfo = newVal;
        }
    },
    mounted() {
        this.boxHeight = this.$refs.examCardInfo.offsetHeight + 40;
    },
}
</script>

<style scoped>
.exam-card {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
    transition: 0.6s;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.exam-card:hover{
    transform: translate(2px,-6px);
    box-shadow: -1px 5px 15px -2px rgba(0, 0, 0, .3);
}
.info{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
}
.exam-time{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.handle-area{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>