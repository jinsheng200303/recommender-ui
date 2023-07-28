<template>
  <div class="recommend-video-card" @click="selectedCard">
    <img :src="textCardData.lessonPicture" alt="" class="video-card-img">
    <div class="video-card-title">
      {{ textCardData.lessonName }}
    </div>
  </div>
</template>

<script>
import { recordBrowse } from '@/api/browseRecordsApis'
export default {
  props: ["recommendData"],
  data() {
    return{
      textCardData: this.recommendData,
      maxTitleLength: 28,
    }
  },
  methods: {
    selectedCard(){
      // recordBrowse(this.textCardData.resourceId,JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
      //   if (res.code === 200){

      //   }else {
      //     this.$message.error(res.msg);
      //   }
      // })
      window.open(this.textCardData.lessonLink, '_blank');
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.recommend-video-card{
  width: 300px;
  height: 265px;
  border-radius: 7px;
  //box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  //overflow: hidden;
  box-sizing: border-box;
  transition: 0.6s;
  cursor: default;
}
.recommend-video-card:hover{
  color: #13a8e8;
  //box-shadow: -1px 3px 15px 3px rgba(0, 0, 0, .3);
}
.video-card-img{
  width: 100%;
  height: 185px;
  border-radius: 7px;
  transition: 0.6s;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, .1);
}
.video-card-img:hover{
  transform: translateY(-8px);
  box-shadow: -1px 2px 15px 2px rgba(0, 0, 0, .3);
}
.video-card-title{
  width: 100%;
  height: 80px;
  padding: 15px;
  box-sizing: border-box;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
}
.video-card-title:hover{

}
</style>