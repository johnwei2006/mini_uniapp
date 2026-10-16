<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <view class="hello">
    <text>{{ msg }}</text>
  </view>
</template>

<style scoped>
.hello {
  padding: 20rpx;
  color: #007aff;
}
</style>
