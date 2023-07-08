<template>
    <!-- <div @mouseover="handleHover"
        @mouseleave="handleLeave">
        <el-card  
            :body-style="{ padding: '0px' }" 
            @click.native="newPage(records)">
            <img src="https://www.mattbenton.io/img/logos/vue-9-logo-png-transparent-min.png" class="image" :class="{isHoverImg:isHover}">
            <div class="class-card-info">
                <el-descriptions :title="records.className" :column="1" size="medium" :class="{isHoverInfo:isHover}">
                    <el-descriptions-item label="课程id">{{ records.classId }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </el-card>
    </div> -->
    <div>
        <div class="class-card" 
            @click="newPage(records)" 
            @mouseover="handleHover"
            @mouseleave="handleLeave">
            <img src="../../assets/image1.jpg" class="image" :class="{imageHover:isHover}">
            <div class="class-card-info" :class="{infoHover:isHover}">
                <div class="title" :class="{titleHover:isHover}">{{ records.className }}</div>
                <div class="idInfo" :class="{idInfoHover:isHover}">课堂id:&nbsp;&nbsp;{{ records.classId }}</div>
                <div class="description" :class="{descriptionHover:isHover}">&nbsp;&nbsp;&nbsp;&nbsp;创建时间:&nbsp;&nbsp;{{ formatInfo }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {deleteClass} from '@/api/classApis.js'
export default {
    props: ["records"],
    data() {
        return {
            isHover: false,
        };
    },
    methods: {
        deleteById(id){

        },
        newPage(records){
            let routeData = this.$router.resolve({
                path: '/classinfo',
            })
            window.sessionStorage.setItem("classInfo",JSON.stringify(records))
            window.open(routeData.href, '_blank');
        },
        handleHover(){
            this.isHover = true;
        },
        handleLeave(){
            this.isHover = false;
        }
    },
    computed: {
        formatInfo(){
            if (this.records.createdTime.length > 70) {
              return this.records.createdTime.slice(0, 70) + '...';
            }else {
              return this.records.createdTime;
            }
            return this.records.createdTime.substring(0,10);
        }
    },
}
</script>

<style scoped>
.class-card {
    width: 300px;
    height: 350px;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
    transition: 0.6s;
    position: relative;
}
.class-card:hover{
    box-shadow: -1px 3px 15px 3px rgba(0, 0, 0, .3);
}
.image {
    width: 110%;
    height: 110%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    object-fit: cover;
    transition: 0.6s;
    position: absolute;
    z-index: 1;
}
.imageHover{
    width: 100%;
    height: 100%;
}
.class-card-info {
    width: 100%;
    height: 30%;
    padding: 16px;
    box-sizing: border-box;
    transition: 0.6s;
    position: absolute;
    bottom: 0;
    z-index: 2;
    backdrop-filter: blur(20px);
    background-color: rgba(250, 250, 250, 0.1);
}
.infoHover{
    height: 50%;
    background-color: rgba(250, 250, 250, .7);
}
.title{
    font-size: 1.3rem;
    transition: 0.6s;
    display: inline-block;
    margin-bottom: 18px;
}
.titleHover{
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    margin-bottom: 5px;
}
.idInfo{
    transition: 0.6s;
}
.idInfoHover{
    display: none;
}
.description{
    display: none;
    word-break: break-all;
    word-wrap: break-word;
}
.descriptionHover{
    display: block;
}
</style>
