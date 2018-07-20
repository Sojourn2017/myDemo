var echarts = require('echarts');

// 简易直方图

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('bar-graph'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 直方图',
    textStyle: {
      color: '#808080'
    }
  },
  tooltip: {
    // 设置提示框浮层的位置 ['string', 'Array', 'function']
    /** 
     * (point: Array, params: Object|Array.<Object>, dom: HTMLDomElement, rect: Object, size: Object) => Array
     *  function 参数：
     *  point: 鼠标位置，如 [20, 40]。
     *  params: 同 formatter 的参数相同。
     *  dom: tooltip 的 dom 对象。
     *  rect: 只有鼠标在图形上时有效，是一个用x, y, width, height四个属性表达的图形包围盒。
     *  size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：{contentSize: [width, height], viewSize: [width, height]}。
    **/ 
    position: function (point, params, dom, rect, size) {
      return [point[0]+10, point[1]+10];
    },
    // 设置悬浮提示框的样式
    extraCssText:'width:160px;height:40px;'
  },
  legend: {
    data:['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
});