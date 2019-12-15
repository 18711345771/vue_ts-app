<template>
    <div ref="mychart" class="chart" :style="{width:chartWidth,height:chartHeight}"></div>
</template>

<script lang="ts">
    import {Component, Provide, Vue, Prop} from 'vue-property-decorator';
    import echarts from 'echarts';

    @Component({
        components: {}
    })
    export default class Chart extends Vue {
        @Prop({type: String, default: "line"}) readonly chartType!: string;//图表类型line/bar/pie
        @Prop(Object) chartData!: string | null;

        @Provide() chartWidth: string = "1380px";
        @Provide() chartHeight: string = "640px";

        created() {
            this.generatorWidthAndHeight();
        }

        generatorWidthAndHeight() {
            // this.chartWidth=`${document.body.offsetWidth*0.8}px`;
            // this.chartWidth=`${document.body.offsetHeight*0.6}px`;

            console.log(this.chartWidth);
            console.log(this.chartHeight);
        }

        mounted() {
            this.drawChart();
        }

        drawChart() {
            //1 实例echarts对象
            let chart = echarts.init((this as any).$refs.mychart as HTMLCanvasElement);

            if (chart == undefined) {
                console.log(`echarts init dom is failed`);
                return;
            }

            switch (this.chartType) {
                case "line":
                    chart.setOption((this as any).generatorLineOption());
                    break;
                case "bar":
                    chart.setOption((this as any).generatorBarOption());
                    break;
                case "pie":
                    chart.setOption((this as any).generatorPieOption());
                    break;
                default:
                    console.log(`chartType ${this.chartType} is invalid`);
                    break;
            }
        }

        generatorLineOption() {
            //绘制折线图
            return {
                title: {
                    text: '近一周学习量',
                    subtext: 'test',
                    x: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: (this as any).chartData.xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: (this as any).chartData.yAxisData,
                    type: 'line',
                    smooth: true
                }],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                }
            }
        }

        generatorBarOption() {
            //绘制柱状图
            return {
                title: {
                    text: '近一周学习量',
                    subtext: 'test',
                    x: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: (this as any).chartData.xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: (this as any).chartData.yAxisData,
                    type: 'bar',
                    barWidth: '20%'
                }],
                color: ["#3398DB"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // type:'cross',
                        // label:{
                        //     backgroundColor:'#6a7985'
                        // }
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'//默认为直线，可选:'line'|'shadow'
                    }
                },
                grid: {
                    left: '20%',
                    right: '5%',
                    bottom: '5%'
                }
            }
        }

        generatorPieOption() {
            return {
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>