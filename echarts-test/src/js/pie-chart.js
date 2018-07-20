var echarts = require('echarts');

// 饼图

var myChart = echarts.init(document.getElementById('pie-chart'));
myChart.setOption({
  title: {
    // 标题组件
    text: 'ECharts 饼图'
  },
  textStyle: {
    color: '#808080',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',    // 定义类型为饼图
      radius: '55%',    // [ default: [0, '75%'] ] 饼图半径
      data: [
        { value: 235, name: '视频广告' },
        { value: 274, name: '联盟广告' },
        { value: 310, name: '邮件营销' },
        { value: 335, name: '直接访问' },
        { value: 400, name: '搜索引擎' }
      ].sort((a,b) => a.value - b.value),
      roseType: 'radius',    // 南丁格尔图，通过半径区分数据大小
      itemStyle: {    // 图像样式
        // 阴影的大小
        shadowBlur: 200,
        // 阴影水平方向上的偏移
        shadowOffsetX: 0,
        // 阴影垂直方向上的偏移
        shadowOffsetY: 0,
        // 阴影颜色
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        // 颜色
        color: '#c23531',
      },
      labelLine: {
        lineStyle: {
          color: '#808080',
        }
      }
    }
  ],
  visualMap: {
    // 确定是否显示visualMap组件
    show: false,
    // 最小映射值
    min: '80',
    // 最大映射值
    max: '600',
    // 映射范围
    inRange: {
      // 通过明暗度映射
      colorLightness: [0, 1]
    }
  },
  backgroundColor: '#2c343c',   // 背景色
})

module.exports = {
  pieChart: myChart
}
