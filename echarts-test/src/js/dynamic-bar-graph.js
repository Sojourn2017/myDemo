var echarts = require("echarts");

// 动态直方图

var myChart = echarts.init(document.getElementById("dynamic-bar-graph"));

myChart.showLoading();

// 定义相关配置
var option = {
  // 定义标题
  title: {
    // 主标题
    text: 'ECharts 动态直方图',
    // 副标题
    subtext: '定时加载数据',
    // 标题颜色
    color: '#808080',
    // 内边距
    padding: 5
  },
  // 设置提示框组件
  tooltip: {
    // 触发类型（数据项，坐标轴，不触发） ['item', 'axis', 'none']
    trigger: 'axis',
    // 坐标轴指示器
    axisPointer: {
      // 指示器类型(直线，阴影，十字) ['line', 'shadow', 'cross']
      type: 'cross',
      // 坐标轴指示器的文本标签。
      label: {
        // 坐标轴指示器背景色
        backgroundColor: '#283b56'
      }
    }
  },
  // 图例组件
  legend: {
    // 图例类型（默认，滚动）['plain', 'scroll']
    type: 'plain',
    // 图例的数据数组
    data: ['最新成交价', '预购队列']
  },
  // 工具栏
  toolbox: {
    show: true,
    // 布局朝向(水平， 垂直) ['horizontal', 'vertical']
    orient: 'horizontal',
    // 各工具配置项
    feature: {
      // 数据视图工具
      dataView: { readOnly: false },
      // 配置项还原
      restore: {},
      // 保存为图片
      saveAsImage: {}
    }
  },
  // 数据区域缩放
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  grid: {
    top: '15%',
    left: '15%'
  },
  // 直角坐标系 grid 中的 x 轴
  xAxis: [
    {
      // 坐标轴类型(数值轴：连续值， 类目轴：离散值，时间轴：连续时序数据， 对数轴：对数数据) ['value', 'category', 'time', 'log']
      type: 'category',
      // 坐标轴两边留白策略（类目轴为Boolean，非类目轴为Array）
      boundaryGap: true,
      // 定义下方x轴数据名称
      data: (function () {
        // 加载10项时间数据，每项相隔20秒
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          // 格式化时间
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    },
    {
      // 坐标轴类型(数值轴：连续值， 类目轴：离散值，时间轴：连续时序数据， 对数轴：对数数据) ['value', 'category', 'time', 'log']
      type: 'category',
      // 坐标轴两边留白策略（类目轴为Boolean，非类目轴为Array）
      boundaryGap: true,
      // 定义上方坐标轴数据名称
      data: (function () {
        var res = [];
        var len = 10;
        while (len--) {
          res.push(10 - len - 1);
        }
        return res;
      })()
    },
  ],
  // 直角坐标系 grid 中的 y 轴
  yAxis: [
    {
      type: 'value',
      // 是否是脱离 0 值比例。(Booolean) 设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
      scale: true,
      name: '价格',
      // 定义了max, min 后boundaryGap会失效
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: '预购量',
      // 定义了max, min 后boundaryGap会失效
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  // 图表数据
  series: [
    {
      name: '预购队列',
      // 定义图标类型
      /**
      * line: 折线图
      * bar: 柱状图
      * pie：饼图
      * scatter：散点图
      * effectScatter：涟漪特效散点图
      * radar：雷达图
      * tree：树图
      * treemap: 面积树图
      * sunburst： 旭日图
      * boxplot: 箱图
      * candlestick：K线图
      * heatmap：热力图
      * map：地图
      * parallel：平行坐标系
      * lines：带有起点和终点信息的线数据的绘制（航线图）
      * graph：关系图
      * sankey：桑基图（可看作是有向无环图）
      * funnel：漏斗图
      * gauge：仪表盘
      * pictorialBar：象形柱图 
      * themeRiver：主题河流
      * custom: 自定义
      **/
      type: 'bar',
      // 对应的X轴数据项索引（默认为0）
      xAxisIndex: 1,
      // 对应的Y轴数据项索引（默认为0）
      yAxisIndex: 1,
      // 预购队列数据
      data: (function () {
        var res = [];
        var len = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })()
    },
    {
      name: '最新成交价',
      type: 'line',
      // 最新成交价数据
      data: (function () {
        var res = [];
        var len = 0;
        while (len < 10) {
          res.push((Math.random() * 10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })()
    }
  ],
  visualMap: {
    type: 'piecewise',
    seriesIndex: 1,
    bottom: '10%',
    pieces: [{
      gt: 0,
      lte: 5,
      color: '#ffde33'
    }, {
      gt: 5,
      lte: 10,
      color: '#ff9933'
    }, {
      gt: 10,
      color: '#660099'
    }],
    outOfRange: {
      color: '#999'
    }
  }
};

// 首次绘制表格
myChart.hideLoading();
myChart.setOption(option);

var app = {
  count: 11,
}
// 定时生成新数据
setInterval(function () {
  // 格式化时间
  var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
  // 获取数据项 
  var data0 = option.series[0].data;
  var data1 = option.series[1].data;
  // 移除旧数据并生成新数据
  data0.shift();
  data0.push(Math.round(Math.random() * 1000));
  data1.shift();
  data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
  // 移除旧数据项并生成新数据项
  option.xAxis[0].data.shift();
  option.xAxis[0].data.push(axisData);
  option.xAxis[1].data.shift();
  option.xAxis[1].data.push(app.count++);
  // 应用配置 
  myChart.setOption(option);
}, 2100);