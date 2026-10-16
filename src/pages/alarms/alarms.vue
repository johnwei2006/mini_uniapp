<script setup lang="ts">
import { onShow, ref } from 'vue';
import { listAlarms, resolveAlarm } from '@/api/alarms';
import type { Alarm } from '@/types';

const alarms = ref<Alarm[]>([]);
const statusFilter = ref('');

async function load() {
  const res = await listAlarms(statusFilter.value || undefined);
  alarms.value = res.data ?? [];
}

function resolve(a: Alarm) {
  resolveAlarm(a.id as string).then(() => {
    uni.showToast({ title: '已处理', icon: 'success' });
    load();
  });
}

onShow(load);
</script>

<template>
  <view class="alarms">
    <view class="filters">
      <text :class="['tab', statusFilter === '' ? 'active' : '']" @tap="statusFilter = ''; load()">全部</text>
      <text :class="['tab', statusFilter === 'OPEN' ? 'active' : '']" @tap="statusFilter = 'OPEN'; load()">未处理</text>
      <text :class="['tab', statusFilter === 'RESOLVED' ? 'active' : '']" @tap="statusFilter = 'RESOLVED'; load()">已处理</text>
    </view>
    <view v-for="a in alarms" :key="a.id" class="card">
      <text class="title">{{ a.deviceId }} · {{ a.level }}</text>
      <text class="msg">{{ a.message }}</text>
      <view class="row">
        <text :class="['badge', a.status === 'OPEN' ? 'offline' : 'online']">{{ a.status }}</text>
        <text class="btn" v-if="a.status === 'OPEN'" @tap="resolve(a)">处理</text>
      </view>
    </view>
    <view v-if="alarms.length === 0" class="tip">暂无告警</view>
  </view>
</template>

<style scoped>
.alarms {
  padding: 24rpx;
}
.filters {
  display: flex;
  gap: 16rpx;
  margin-bottom: 20rpx;
}
.tab {
  font-size: 26rpx;
  color: #666;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  background: #fff;
}
.tab.active {
  color: #007aff;
  background: #e6f0ff;
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
.title {
  font-size: 28rpx;
  font-weight: 600;
}
.msg {
  color: #666;
  font-size: 24rpx;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: #e6a23c;
  background: #fdf6ec;
}
.btn {
  color: #007aff;
  font-size: 26rpx;
}
</style>
