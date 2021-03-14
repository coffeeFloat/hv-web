<template>
  <div>
    <div class="video-list">
    <el-row :gutter="20" >
      <el-col class="video-item" :span="6" 
        v-for="item in dataList" :key="item.id" >
        <div @click="openNewTab(item)">
          <div>
            <img :src="item.coverUrl" alt="">
          </div>
          <div>{{item.describeStr}}</div>
          <div class="clearfix">
            <div class="fl">
              <i class="el-icon-time"></i>
              <span>{{item.timeLengthStr}}</span>
            </div>
            <div class="fr">
              <svg-icon icon-class="dianzan" class-name="like-icon"/>
              <span>{{item.likeCount}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
import { queryVideoList } from '@/api/videos';

export default {
  data() {
    return {
      dataList: [],
    }
  },
  created() {
    this.getVideos()
  },
  methods: {
    getVideos() {
      queryVideoList().then(res => {
        console.log(res);
        if (res && res.data && res.data.length) {
          this.dataList = res.data;
        } else {
          this.dataList = [];
        }
      })
    },
    openNewTab(item) {
      console.log(item)
      let routeData = this.$router.resolve({
        name: 'video-detail',
        params: { id: item.id }
      });
      console.log(routeData)
      window.open(routeData.href, '_blank');
    },
  },
}
</script>
<style lang="scss" scoped>
.video-list {
  width: 1024px;
  margin: 30px auto ;
  .video-item {
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 20px;
    img {
      width: 100%;
    }
    .like-icon {
      color: $success-color;
    }
  }
}
</style>
<style lang="scss">

</style>