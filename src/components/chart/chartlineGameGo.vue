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
  	    default: 'chartGameGo'
  	  },
  	  id: {
  	    type: String,
  	    default: 'chartGameGo'
  	  },
  	  width: {
  	    type: String,
  	    default: '100%'
  	  },
  	  height: {
  	    type: String,
  	    default: '400px'
  	  },
  	  chartDataPt:{
  	  	type: Array,
  	  },
      chartDataNt:{
        type: Array,
      },
      chartDataMg:{
        type: Array,
      }
  	},
  	watch:{
      chartDataPt() {
          this.dataX = this.dataXFun(this.chartDataPt);
          this.DataSeriesPt = this.DataSeriesFun(this.chartDataPt);
          this.DataSeriesNt = this.DataSeriesFun(this.chartDataNt);
          this.DataSeriesMg = this.DataSeriesFun(this.chartDataMg);
          this.initChart();
      },
      chartDataNt() {
          this.dataX = this.dataXFun(this.chartDataPt);
          this.DataSeriesPt = this.DataSeriesFun(this.chartDataPt);
          this.DataSeriesNt = this.DataSeriesFun(this.chartDataNt);
          this.DataSeriesMg = this.DataSeriesFun(this.chartDataMg);
          this.initChart();
      },
      chartDataMg() {
          this.dataX = this.dataXFun(this.chartDataPt);
          this.DataSeriesPt = this.DataSeriesFun(this.chartDataPt);
          this.DataSeriesNt = this.DataSeriesFun(this.chartDataNt);
          this.DataSeriesMg = this.DataSeriesFun(this.chartDataMg);
          this.initChart();
      }
	  },
    mounted () {

      this.dataX = this.dataXFun(this.chartDataPt);
      this.DataSeriesPt = this.DataSeriesFun(this.chartDataPt);
      this.DataSeriesNt = this.DataSeriesFun(this.chartDataNt);
      this.DataSeriesMg = this.DataSeriesFun(this.chartDataMg);
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
        DataSeriesPt:null,
        DataSeriesMg:null,
        DataSeriesNt:null,
      }
    },
    methods: {
      dataXFun(chartData) {
        let result =[];
        for(var item of chartData){
            if(item.hour !== undefined){
              result.push(item.hour);
            }else if(item.day !== undefined){

              let time = add0(item.month)+'-'+add0(item.day);
              result.push(time);
            }else if(item.ymd !== undefined){

              result.push(item.ymd);
            }
         }
         return result;
      },
      DataSeriesFun(chartData) {
          let result =[];
          for(var item of chartData){
              let money = (item.amount/100)
              result.push(money);
           }
          return result;
      },
    	initChart() {
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
                  for (var i = 0; i < params.length; i++) {
                    res+='<p style="float:left;clear:both;">'+params[i].seriesName+':'+params[i].value+'元</p>';
                  }
                return res;
              },
    			},
    			legend: {
    			    data:['PT','MG','NT'],
              left:'right',
              top:'0px',
    			},
    			grid: {
    			    left: '0%',
    			    right: '38px',
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
    			yAxis: {
    			    type: 'value',
    			    axisLabel: {
    			        formatter: '{value}元'
    			    }
    			},
    			series: [
              {
        			    name: 'PT',
        			    type: 'line',
        			    smooth: true,
        			    data: this.DataSeriesPt,
        			    animation: false,

        			},
              {
                  name: 'MG',
                  type: 'line',
                  smooth: true,
                  data: this.DataSeriesMg,
                  animation: false,

              },
              {
                  name: 'NT',
                  type: 'line',
                  smooth: true,
                  data: this.DataSeriesNt,
                  animation: false,

              }


          ]

    		});

    	}

    }


  };
</script>
