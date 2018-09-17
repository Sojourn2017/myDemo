var app = new Vue({
  el: '#app',
  data: {
    printclinicName: 'xxx诊所',
    printData: {
      roomCode: '101',
      doctorName: '李白',
      createTime: '2018-08-08',
      patientName: '张三',
      amountReceivable: 666,
      amountReceivable: 666,
    },
    printFlag: false
  },
  created: function () {

  },
  methods: {
    print: function () {
      this.printFlag = true;
      window.print()
    }
  }

})