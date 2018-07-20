// 通过<script>标签引用echarts 

window.onload = function () {
  // 显示加载动画效果
  lineChart.showLoading();

  // 获取数据
  setTimeout(getData,1000);


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

      console.log(data);

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
  var lineChartOption = {
    title: {
      text: 'XX药品',
      subtext: '线图'
    },
    // 定义网格位置
    grid: {
      top: "15%"
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
        name: '销售量'
      },
      {
        type: 'line',
        name: '销售额'
      }
    ],
    visualMap: {

    }
  };

  // 关闭加载动画
  lineChart.hideLoading();
  // 应用配置
  lineChart.setOption(lineChartOption);
}