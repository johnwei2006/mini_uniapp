<script setup lang="ts">
import { onShow, ref } from 'vue';
import { listDevices } from '@/api/devices';
import type { Device } from '@/types';

const devices = ref<Device[]>([]);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const res = await listDevices();
    devices.value = res.data ?? [];
  } finally {
    loading.value = false;
  }
}

const goDetail = (id?: string) => {
  if (id) uni.navigateTo({ url: `/pages/device-detail/device-detail?id=${id}` });
};

onShow(load);
</script>

<template>
  <view class="devices">
    <view v-if="loading" class="tip">加载中...</view>
    <view v-for="d in devices" :key="d.id" class="card" @tap="goDetail(d.id)">
      <view class="row">
        <text class="name">{{ d.name || d.deviceId }}</text>
        <text :class="['badge', d.status === 'ONLINE' ? 'online' : 'offline']">{{ d.status }}</text>
      </view>
      <text class="sub">{{ d.deviceId }}</text>
    </view>
    <view v-if="!loading && devices.length === 0" class="tip">暂无设备</view>
  </view>
</template>

<style scoped>
.devices {
  padding: 24rpx;
}
.tip {
  text-align: center;
  color: #999;
  margin-top: 60rpx;
}
.card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-size: 30rpx;
  font-weight: 600;
}
.sub {
  color: #999;
  font-size: 24rpx;
}
.badge {
  font-size: 22rpx;
  padding: 2rpx 12rpx;
  border-radius: 8rpx;
}
.online {
  color: #67c23a;
  background: #e8f5e9;
}
.offline {
  color: #909399;
  background: #f0f0f0;
}
</style>
