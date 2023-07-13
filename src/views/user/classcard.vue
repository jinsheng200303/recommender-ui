<template>
    <div>
        <div class="class-card" 
            @click="newPage(records)" 
            @mouseover="handleHover"
            @mouseleave="handleLeave">
            <img :src="records.classPicture" class="image" :class="{imageHover:isHover}">
            <div class="class-card-info" :class="{infoHover:isHover}">
                <div class="title" :class="{titleHover:isHover}">{{ records.className }}</div>
                <div class="idInfo" :class="{idInfoHover:isHover}">课堂id:&nbsp;&nbsp;{{ records.classId }}</div>
                <div class="description" :class="{descriptionHover:isHover}">{{ formatInfo }}</div>
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
            console.log(records);
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
            if(this.records.description != null){
                if (this.records.description.length > 78) {
                    return this.records.description.slice(0, 78) + '...';
                }else {
                    return this.records.description;
                }
            }else {
                return this.records.description;
            }
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
    background-color: rgba(250, 250, 250, 0.3);
}
.infoHover{
    height: 50%;
    background-color: rgba(255, 255, 255, 0.8);
}
.title{
    font-size: 1.3rem;
    transition: 0.6s;
    display: inline-block;
    margin-bottom: 18px;
}
.titleHover{
    margin-left: 50%;
    transform: translateX(-60%);
    /* font-size: 1.5rem; */
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
