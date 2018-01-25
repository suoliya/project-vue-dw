<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  import {add0} from '../../config/mUtils'

  export default {
  	props: {
  	  className: {
  	    type: String,
  	    default: 'chart'
  	  },
  	  id: {
  	    type: String,
  	    default: 'chart'
  	  },
  	  width: {
  	    type: String,
  	    default: '100%'
  	  },
  	  height: {
  	    type: String,
  	    default: '400px'
  	  },
  	  chartName:{
  	  	type: String,
  	  	default: '充值金额'
  	  },
  	  chartData:{
  	  	type: Array,
  	  },
      chartType:{
        type: Number,
      }
  	},
  	watch:{
      chartData() {
          this.dataXFun();
          this.DataSeriesFun();   
          this.DataSeries = this.DataAmount;
          this.initChart();
      }
	  },
    mounted () {

      this.dataXFun();
      this.DataSeriesFun();   
      this.DataSeries = this.DataAmount;
      this.initChart();
      
    },
  	beforeDestroy() {
  	  if (!this.chart) {
  	    return
  	  }
  	  this.chart.dispose();
  	  this.chart = null;
  	},
    data() {
      return {
      	chart: null,
        dataX:null,
        DataSeries:null,
        DataCount:null,
        DataAmount:null
      }
    },
    methods: {
      dataXFun() {
        let result =[];
        for(var item of this.chartData){
            if(item.hour !== undefined){
              result.push(item.hour);
            }else if(item.day !== undefined){

              let time = add0(item.month)+'-'+add0(item.day);
              result.push(time);
            }else if(item.ymd !== undefined){

              result.push(item.ymd);
            }
         }
         this.dataX = result;
      },
      DataSeriesFun() {
          let result =[];
          let result2=[];
          for(var item of this.chartData){
              let money = (item.amount/100);
              let params = {'value':money,'count':item.count};
              result.push(params);
              result2.push(item.count);
           }
           this.DataAmount = result;
           this.DataCount = result2;
      },
    	initChart() {
        let count = this.DataCount;
        let countType = this.chartType;
        var num = 0;
    		this.chart = echarts.init(document.getElementById(this.id));
    		this.chart.setOption({ 
    			title: false,
    			tooltip : {
    			    trigger: 'axis',
    			    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    			        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
    			    },
              formatter: function (params) {
                var res='<p style="float:left;clear:both;">时间：'+params[0].name+'</p>';
                if(countType == 1){ 
             
                    res+='<p style="float:left;clear:both;">'+params[0].seriesName+':'+params[0].value+'元</p>';
                    res+='<p style="float:left;clear:both;">'+params[1].seriesName+':'+params[1].value+'</p>';
                }
                return res;
              },
    			},
    			legend: {
    			    data:[this.chartName,this.chartName+'笔数'],
              right:'60px',
              top:'0px'
    			},
    			grid: {
    			    left: '5px',
    			    right: '5px',
    			    bottom: '1%',
              top:'25px',
    			    containLabel: true
    			},
    			xAxis: {
    			    type: 'category',
    			    boundaryGap: false,
    			    data: this.dataX,
    			    splitLine: {
    			        show: true,
    			        interval: 'auto'
    			    }
    			},
    			yAxis: [
          {
    			    type: 'value',
    			    axisLabel: {
    			        formatter: '{value}元'
    			    },
              splitLine: {
                  show: true,
                  interval: 'auto'
              }
    			},
          {
              type: 'value',
              axisLabel: {
                  formatter: '{value}次'
              },
              splitLine: {
                  show: false,
                  interval: 'auto'
              }

          }
          ],
    			series: [
          {
    			    name: this.chartName,
    			    type: 'line',
    			    smooth: true,
    			    data: this.DataSeries,
    			    animation: false,

    			},
          {
              name: this.chartName+'笔数',
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              data: this.DataCount,
              animation: false,

          }

          ]

    		});

    	}

    }


  };
</script>
