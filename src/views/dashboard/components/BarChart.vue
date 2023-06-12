<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header> weather </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const props = defineProps({
  id: {
    type: String,
    default: 'barChart'
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
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['high', 'low','humidity'],
    textStyle: {
      color: '#999'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['6.5', '6.6', '6.7', '6.8', '6.9'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 50,
      interval: 5,
      axisLabel: {
        formatter: '{value} '
      }
    },
    {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: 'high',
      type: 'bar',
      data: [31, 27, 29, 31, 33],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    },
    {
      name: 'low',
      type: 'bar',
      data: [18, 18, 22, 21, 20],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#25d73c' },
          { offset: 0.5, color: '#1bc23d' },
          { offset: 1, color: '#179e61' }
        ])
      }
    },
    {
      name: 'humidity',
      type: 'line',
      yAxisIndex: 1,
      data: [80, 65, 75, 70, 80],
      itemStyle: {
        color: '#ffff00'
      }
    },
  ]
};

onMounted(() => {
  // 图表初始化
  const chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement
  );
  chart.setOption(options);

  // 大小自适应
  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>
