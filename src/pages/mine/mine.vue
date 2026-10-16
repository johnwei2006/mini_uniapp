<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  uni.reLaunch({ url: '/pages/login/login' });
};
</script>

<template>
  <view class="mine">
    <text class="name">{{ userStore.userInfo?.nickname || '未登录' }}</text>
    <button @click="handleLogout">退出登录</button>
  </view>
</template>

<style scoped>
.mine {
  padding: 60rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  align-items: center;
}
.name {
  font-size: 36rpx;
  font-weight: bold;
}
</style>
