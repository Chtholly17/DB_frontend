<!-- 饼图 -->
<template>
  <el-card>
    <template #header> shops categories </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const props = defineProps({
  id: {
    type: String,
    default: 'pieChart'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px',
    required: true
  },
  height: {
    type: String,
    default: '200px',
    required: true
  }
});
const options = {
  grid: {
    left: '2%',
    right: '2%',
    bottom: '10%',
    containLabel: true
  },
  legend: {
    top: 'bottom',
    textStyle: {
      color: '#999'
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 130],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 1,
        color: function (params: any) {
          //自定义颜色
          const colorList = ['#409EFF', '#67C23A', '#24b5a1','#ce1081','#ee0c2f', '#F56C6C'];
          return colorList[params.dataIndex];
        }
      },
      data: [
        { value: 12, name: 'fresh' },
        { value: 27, name: 'restaurant' },
        { value: 11, name: 'clothing' },
        { value: 5, name: 'electronic' },
		  	{ value: 25, name: 'amusement' },
		  	{ value: 20, name: 'other' },
      ]
    }
  ]
};

onMounted(() => {
  const chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement
  );
  chart.setOption(options);
  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>
