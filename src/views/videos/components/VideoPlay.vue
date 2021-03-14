<template>
<div class="player" v-if="videoDetail.videoPath">
  <video-player class="vjs-custom-skin" 
    :options="playerOptions" 
    @ready="playerReadied">
  </video-player>
</div>
</template>
<script>
import videojs from 'video.js'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
import { queryVideoDetail } from '@/api/videos';   
export default {
  data() {
    return {
      // videojs options
      videoDetail: {},
      
    }
  },
  props: {
    id: {
      type: [Number, String]
    },
  },
  created() {
    this.getVideo();
  },
  computed: {
    playerOptions() {
      return {
        height: '360',
        sources: [{
          withCredentials: false,
          type: "application/x-mpegURL",
          src: this.videoDetail.videoPath,
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }},
        poster: this.videoDetail.coverUrl,
      }
    },
  },
  methods: {
    getVideo() {
      queryVideoDetail(this.id).then(res => {
        this.videoDetail = res.data;
      });
    },
    playerReadied(player) {
      const hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .player {
    text-align: center;
  }
</style>
<style lang="scss">
  .player {
    .video-player {
      display: inline-block;
    }
    .video-js .vjs-big-play-button {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>