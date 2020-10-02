<template>
  <div v-if="Object.keys(commontInfo).length !== 0" class="commont-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commontInfo.user.avatar" alt="">
      <span>{{ commontInfo.user.uname }}</span>
    </div>

    <div class="info-detail">
      <p>{{ commontInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{commontInfo.created | showDate}}</span>
        <span>{{commontInfo.style}}</span>
      </div>

      <div class="info-imgs">
        <img v-for="(item, index) in commontInfo.images" :src="item" alt="" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "../../../common/utils";

export default {
  name: "DetailCommonInfo",
  props: {
    commontInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      //将时间戳转换为Date对象
      const date = new Date(value * 1000)

      //将date进行时间格式化
      return formatDate(date, "yyyy-MM-dd hh:mm")
    }
  }
}
</script>

<style scoped>
.commont-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #F2F5F8;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}

.header-title {
  float: left;
  font-size: 15px;
}

.header-more {
  float: right;
  font-size: 10px;
  margin-right: 10px;
}

.info-user {
  padding: 10px 0 5px;
}

.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
