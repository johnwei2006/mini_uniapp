<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const count = ref(0);

const goLogin = () => {
  uni.navigateTo({ url: '/pages/login/login' });
};
</script>

<template>
  <view class="container">
    <text class="title">uni-app 首页</text>
    <text>当前用户：{{ userStore.userInfo?.nickname || '未登录' }}</text>
    <view class="btn btn-primary" hover-class="btn-hover" @tap="count++">
      点击次数：{{ count }}
    </view>
    <view class="btn" hover-class="btn-hover" @tap="goLogin">去登录</view>
  </view>
</template>

<style scoped>
.container {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}
.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #007aff;
}
.btn {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  background: #fff;
  border: 1rpx solid #ddd;
}
.btn-primary {
  background: #007aff;
  color: #fff;
  border: none;
}
.btn-hover {
  opacity: 0.8;
}
</style>
