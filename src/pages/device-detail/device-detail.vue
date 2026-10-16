<script setup lang="ts">
import { onLoad, ref } from 'vue';
import { getDevice, latestData } from '@/api/devices';
import type { Device } from '@/types';

const id = ref('');
const device = ref<Device | null>(null);
const latest = ref<unknown>(null);

onLoad((opts) => {
  id.value = ((opts as Record<string, string>)?.id as string) || '';
  load();
});

async function load() {
  if (!id.value) return;
  const d = await getDevice(id.value);
  device.value = d.data;
  const l = await latestData(device.value!.deviceId);
  latest.value = l.data;
}
</script>

<template>
  <view class="detail">
    <view class="card" v-if="device">
      <text class="title">{{ device.name || device.deviceId }}</text>
      <text>设备ID：{{ device.deviceId }}</text>
      <text>节点ID：{{ device.nodeId || '-' }}</text>
      <text>状态：{{ device.status }}</text>
      <text>最后在线：{{ device.lastSeen || '-' }}</text>
    </view>
    <view class="card">
      <text class="title">最新数据</text>
      <text class="mono">{{ latest ? JSON.stringify(latest) : '暂无' }}</text>
    </view>
  </view>
</template>

<style scoped>
.detail {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.title {
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
}
.mono {
  font-size: 22rpx;
  color: #666;
  word-break: break-all;
}
</style>
