console.clear();
var app=new Vue({
  el: '#app',
  data: {
    AddStr: '',
    ListArray: []
  },
  methods: {
    getNowTime(){
      var today=new Date();
      let minutes = today.getMinutes();
      if(String(minutes).length<2){
        minutes = '0'+minutes;
      }
      var currentDateTime = today.getHours()+':'+minutes

      return currentDateTime;
    },
    Add: function(){
      const vm = this;
      if(vm.AddStr!=''){
        let time = vm.getNowTime();
        console.log(time);
        vm.ListArray.push(
          {
            title: vm.AddStr,
            time: time
          }
        );
        vm.AddStr='';
      }  
    },
    del: function(index){
      this.ListArray.splice(index,1);
    },
    tableToExcel(){
      const vm = this;
      let jsonData = vm.ListArray;

      let str = `時間,事項\n`;
      jsonData.forEach(element => {
        str += `${element.time + '\t'},`;
        str += `${element.title + '\t'},`;
        str += '\n';
      });
      console.log(str);
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      var link = document.createElement("a");
      link.href = uri;
      //對下載的檔案命名
      link.download =  "老公老婆每日報告.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    clear: function(){
      // console.log(this.ListArray);
      // this.ListArray.length=0;
      // console.log(this.ListArray);
        this.ListArray.splice(0,this.ListArray.length);
    }
  }
});