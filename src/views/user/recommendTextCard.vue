<template>
  <div class="recommend-text-card" @click="selectedCard">
    <div class="text-card-title">
      类别:{{ textCardData.resourceType }}
    </div>
    <div class="text-card-info">
      {{ formatResourceName }}
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
      maxTitleLength: 22,
    }
  },
  methods: {
    selectedCard(){
      recordBrowse(this.textCardData.resourceId,JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
        if (res.code === 200){

        }else {
          this.$message.error(res.msg);
        }
      })
      window.open(this.textCardData.resourceLink, '_blank');
    },
  },
  computed: {
    formatResourceName(){
      if (this.textCardData.resourceName.length > this.maxTitleLength) {
        return this.textCardData.resourceName.slice(0,this.maxTitleLength) + '...';
      }else {
        return this.textCardData.resourceName;
      }
    },
  }
}
</script>

<style scoped>
.recommend-text-card{
  width: 180px;
  height: 90px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  overflow: hidden;
  box-sizing: border-box;
  padding: 15px;
  transition: 0.6s;
  cursor: default;
  background-color: white;
}
.recommend-text-card:hover{
  box-shadow: -1px 3px 15px 3px rgba(0, 0, 0, .3);
}
.text-card-title{
  font-size: 1rem;
  line-height: 22px;
}
.text-card-info{
  font-size: 0.9rem;
  line-height: 20px;
  color: #504f4f;
}
</style>