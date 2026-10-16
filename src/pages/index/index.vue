<script setup lang="ts">
import { onShow, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { listDevices } from '@/api/devices';

const userStore = useUserStore();
const deviceCount = ref(0);

onShow(async () => {
  if (userStore.isLogin) {
    try {
      const d = await listDevices();
      deviceCount.value = d.data?.length ?? 0;
    } catch {
      /* 忽略 */
    }
  }
});

const goDevices = () => uni.switchTab({ url: '/pages/devices/devices' });
const goLogin = () => uni.navigateTo({ url: '/pages/login/login' });
</script>

<template>
  <view class="container">
    <text class="title">IoT 平台小程序</text>
    <text>当前用户：{{ userStore.userInfo?.nickname || '未登录' }}</text>
    <view class="card">
      <text class="big">{{ deviceCount }}</text>
      <text class="label">设备总数</text>
    </view>
    <view class="btn btn-primary" hover-class="btn-hover" @tap="goDevices">查看设备</view>
    <view class="btn" hover-class="btn-hover" v-if="!userStore.isLogin" @tap="goLogin">去登录</view>
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
.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}
.big {
  font-size: 64rpx;
  font-weight: bold;
  color: #007aff;
}
.label {
  color: #999;
  font-size: 26rpx;
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
