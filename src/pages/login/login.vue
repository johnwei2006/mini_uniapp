<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import type { LoginPayload } from '@/types';

const userStore = useUserStore();
const loading = ref(false);
const form = reactive<LoginPayload>({ username: '', password: '' });

const handleLogin = async () => {
  if (!form.username || !form.password) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' });
    return;
  }
  loading.value = true;
  try {
    await userStore.login(form);
    uni.showToast({ title: '登录成功', icon: 'success' });
    uni.switchTab({ url: '/pages/index/index' });
  } catch {
    // 错误已在 request 拦截中统一提示
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <view class="login">
    <view class="field">
      <text class="label">用户名</text>
      <input class="input" v-model="form.username" placeholder="请输入用户名" />
    </view>
    <view class="field">
      <text class="label">密码</text>
      <input class="input" v-model="form.password" password placeholder="请输入密码" />
    </view>
    <view class="btn btn-primary" hover-class="btn-hover" @tap="handleLogin">
      {{ loading ? '登录中...' : '登录' }}
    </view>
  </view>
</template>

<style scoped>
.login {
  padding: 60rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.label {
  font-size: 28rpx;
  color: #666;
}
.input {
  height: 80rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  background: #fff;
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
