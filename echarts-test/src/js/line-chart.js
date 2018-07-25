// 通过<script>标签引用echarts 

window.onload = function () {
  // 显示加载动画效果
  lineChart.showLoading();

  // 获取数据
  setTimeout(getData, 1000);
}

// 获取数据
var getData = function () {
  axios.get('src/mock/data.json', {
    params: {

    }
  }).then(function (response) {
    var res = response.data;
    if (res.status == "1") {
      var data = res.result;
      // 加载配置
      setOpt(data);
    } else {
      console.log(res.msg);
    }
  })
}

// 初始化
var lineChart = echarts.init(document.getElementById('line-chart'));

// 线图配置
function setOpt($data) {
  var saleNum = [];
  $data.forEach((val) => {
    if (typeof val[2] == 'number') {
      saleNum.push(val[2]);
    }
  })
  var lineChartOption = {
    title: {
      text: 'XX药品',
      subtext: '线图'
    },
    // 定义网格位置
    grid: {
      top: "15%",
      left: '20%'
    },
    // 悬浮框
    tooltip: {
      trigger: 'axis',
      // formatter: '{b}<br>{a0}: {c0}<br>{a1}: {c1}'
    },
    // 图例组件
    legend: {
      data: ['销售量', '销售额']
    },
    // 放缩
    dataZoom: [{
      startValue: "2018-01"
    },
    {
      type: 'inside'
    }
    ],
    // 工具
    toolbox: {
      left: 'right',
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    // X轴
    xAxis: {
      type: 'category',
    },
    // Y轴
    yAxis: {
      name: '销售量',
      type: 'value',
      boundaryGap: [0, 0.2]
    },
    // 数据集
    dataset: {
      source: $data
    },
    // 数据
    series: [
      {
        type: 'line',
        name: '销售量',
        data: saleNum,
        label: {
          show: false,
          formatter: '{a|{a}}\n{hr|}\n  {b|{b}: {c}}',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          shadowBlur:3,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowColor: '#999',
          padding: [0, 7],
          rich: {
            a: {
              color: '#999',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 14,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      {
        type: 'line',
        name: '销售额'
      }
    ],
    // 视觉映射组件
    visualMap: [
      {
        type: 'piecewise',
        seriesIndex: 1,
        splitNumber: 6,
        min: 0,
        max: 1000,
        pieces: [{
          gt: 0,
          lte: 200,
          color: '#096'
        }, {
          gt: 200,
          lte: 400,
          color: '#ffde33'
        }, {
          gt: 400,
          lte: 600,
          color: '#ff9933'
        }, {
          gt: 600,
          lte: 800,
          color: '#cc0033'
        }, {
          gt: 800,
          lte: 1000,
          color: '#660099'
        }, {
          gt: 1000,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#808080'
        }
      },
      // {
      //   type: 'continuous',
      //   orient: 'vertical',
      //   seriesIndex: 1,
      //   top: '20%',
      //   left: '0%',
      //   show: true,
      //   min: 0,
      //   max: 1000,
      // }
    ]
  };

  // 关闭加载动画
  lineChart.hideLoading();
  // 应用配置
  lineChart.setOption(lineChartOption);
}