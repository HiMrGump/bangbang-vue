<template>
  <div class="home">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import { adList } from "@/utils/api";
export default {
  name: 'home',
  data() {
    return {

    }
  },
  created() {
    
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('main'));    
    let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    myChart.setOption(option);
  },
  methods: {
    
  }
}
</script>
