//var drawer = new mdui.Drawer("#left-drawer");
//drawer.close();/
/*
var loading = new mdui.Dialog('#loading', {
	modal: true,
	history: false
});
Highcharts.setOptions({
   credits:{
     enabled: true,
     text: 'ygktool.cn',
     href : 'http://www.ygktool.cn'
    },
     lang:{
       contextButtonTitle:"图表导出菜单",
       decimalPoint:".",
       downloadJPEG:"下载JPEG图片",
       downloadPDF:"下载PDF文件",
       downloadPNG:"下载PNG文件",
       downloadSVG:"下载SVG文件",
       drillUpText:"返回 {series.name}",
       loading:"加载中",
       months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       noData:"没有数据",
       numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
       printChart:"打印图表",
       resetZoom:"恢复缩放",
       resetZoomTitle:"恢复图表",
       shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
       thousandsSep:",",
       weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
    }
});

//初始化图表
(function init() {
	var options = {
		title: {
			text: '标题' // 标题
		},
		subtitle: {
			text: '副标题'
		},
		xAxis: {
			categories: ['苹果', '香蕉', '橙子'] // x 轴分类
		},
		yAxis: {
			title: {
				text: '吃水果个数' // y 轴标题
			}
		},
		series: [{ // 数据列
			name: '小明', // 数据列名
			data: [1, 0, 4] // 数据
		}, {
			name: '小红',
			data: [5, 7, 3]
		}, {
			name: '张三',
			data: [2, 5, 6]
		}, {
				name: '李四',
				data: [5, 3, 3]
			}]
	};
	var chart = Highcharts.chart('container', options);
})()
//编辑界面

class TableSetting extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			chart: {
				type: 'line' //指定图表的类型，默认是折线图（line）
			},
			title: {
				text: '标题' // 标题
			},
			subtitle:　{
				text: '副标题'
			},
			xAxis: {
				categories: ['苹果', '香蕉', '橙子'], // x 轴分类
				title: {
					text: ''
				}
			},
			yAxis: {
				title: {
					text: '' // y 轴标题
				}
			},
			series: [{ // 数据列
				name: '小明', // 数据列名
				data: [1, 0, 4] // 数据
			}, {
				name: '小红',
				data: [5, 7, 3],
				size: '80%',
                innerSize: '60%'
			}, {
				name: '张三',
				data: [2, 5, 6]
			}, {
				name: '李四',
				data: [5, 3, 3]
			}]
		}
  };
  render() {
  	let btn = () => {
            var arr = Array(this.state.series.length).fill(null)//因为传入的是string所以先转Number
              , element = [];
            arr.map((value,i) => {
                element.push(
                  <div style={{margin:2}} className="mdui-card mdui-p-a-1">
                     <button key={i} onClick={() => {
                     	this.state.series.splice(i,1);
      	                var arr = this.state.series;
      	                this.setState({series:arr},() =>  Highcharts.chart('container', this.state));
                      }}className="close mdui-btn mdui-btn-icon"><i className="mdui-icon material-icons">close</i></button>
        <div className="mdui-textfield">
          <input className="mdui-textfield-input" onChange={(e) => { 
          	var newData = {
          		name: e.target.value,
          		data: this.state.series[i].data
          	}
          	this.state.series.splice(i, 1, newData);
						//替换数据
			var arr = this.state.series;
          	this.setState({
          		series:arr
          	})
          }}value={this.state.series[i].name} type="text" placeholder=""/>
          <textarea onChange={(e) => {
						var textArr = e.target.value;
						var newData = (!/\w+(\,)$/.test(textArr)) ? textArr.split(",").map(item => parseFloat(item)) : textArr.split(",");
						//如果结尾有“，”,那么不替换成数字（防止出现NaN)
						var newArr = {
							name: this.state.series[i].name,
							data: newData
						};
						this.state.series.splice(i, 1, newArr);
						//替换数据
						var arr = this.state.series;
						this.setState({
							series: arr
						}, () => {
							if (!/\w+(\,)$/.test(textArr)) {
								Highcharts.chart('container', this.state)
							}
						});					
          }} className="mdui-textfield-input" value={this.state.series[i].data} rows="2" placeholder="逗号分割"></textarea>
        </div>
     </div>)
            })
            return element
        }
  	return(
  		<React.Fragment>
  		<div id="setting" className="mdui-p-a-1"> 
  		<div className="mdui-row-sm-2">
  		  <div className="mdui-textfield mdui-col">
  		       <label className="mdui-textfield-label">标题</label>
               <input value={this.state.title.text} onChange={
			   (e) => {
				  console.log(e.target.value);
				  this.setState({
					title: {
						text: e.target.value
					}
				  }, () => {
					console.log(this.state);
					Highcharts.chart('container', this.state);
				  })
			    }
		        }className="mdui-textfield-input" type="text"/>
          </div>
          <div className="mdui-textfield mdui-col">
  		       <label className="mdui-textfield-label">副标题</label>
               <input value={this.state.subtitle.text} onChange={
			   (e) => {
				  this.setState({
					subtitle: {
						text: e.target.value
					}
				  }, () => {
					console.log(this.state);
					Highcharts.chart('container', this.state);
				  })
			    }
		        }className="mdui-textfield-input" type="text"/>
          </div>
          <div className="mdui-textfield mdui-col">
                <label className="mdui-textfield-label">Y轴标题</label>
                <input value={this.state.yAxis.title.text} onChange={
			    (e) => {
				   this.setState({
					yAxis: {
						title: {
							text: e.target.value // y 轴标题
						}
					}
				   },() => {console.log(this.state);Highcharts.chart('container', this.state);})			
			    }
		        }className="mdui-textfield-input" type="text"/>
          </div>
          <div className="mdui-textfield mdui-col">
                <label className="mdui-textfield-label">X轴标题</label>
                <input value={this.state.xAxis.title.text} onChange={
			    (e) => {
				   this.setState({
					xAxis: {
						title: {
							text: e.target.value // x 轴标题
						}
					}
				   },() => {console.log(this.state);Highcharts.chart('container', this.state);})			
			    }
		        }className="mdui-textfield-input" type="text"/>
          </div>
          </div>
          <div>
          <div className="mdui-textfield">
                <label className="mdui-textfield-label">X轴项目</label>
                <input value={this.state.xAxis.categories} onChange={
			    (e) => {
				this.setState({
					xAxis: {
						title:{
							text:this.state.xAxis.title.text
						},
						categories: e.target.value.split(",") // y 轴标题
					}
				}, () => {
					console.log(this.state);
					Highcharts.chart('container', this.state);
				})
			    }
		        }className="mdui-textfield-input" type="text" placeholder="用句号分割"/>
          </div>
          </div>
        </div> 
        <div id="series" className="mdui-p-a-2">
           <button id="new" disabled={true} className="mdui-btn mdui-color-theme mdui-btn-raised">导入文件</button>
  		   <br></br>
  		   <select id="select" onChange={
      () => {
				switch ($("#select").val()) {
					case '直线图':
						this.setState({
							chart: {
								type: 'line' //指定图表的类型，默认是折线图（line）
							}
						}, () => Highcharts.chart('container', this.state));
						break;
					case '曲线图':
						this.setState({
							chart: {
								type: 'spline' //指定图表的类型，默认是折线图（line）
							}
						}, () => Highcharts.chart('container', this.state));
						break;
					case '条形图':
						this.setState({
							chart: {
								type: 'bar' //指定图表的类型，默认是折线图（line）
							}
						}, () => Highcharts.chart('container', this.state));
						break;
					case '饼图':
						this.setState({
							chart: {
								type: 'pie' //指定图表的类型，默认是折线图（line）
							}
						}, () => Highcharts.chart('container', this.state));
						break;
				}
      }} className="mdui-m-l-6 mdui-select" mdui-select="true">
    <option>直线图</option>
    <option>曲线图</option>
    <option>条形图</option> 
    <option disabled={true}>饼图</option>
    <option disabled={true}>面积图</option>
    <option disabled={true}>雷达图</option>
    </select>
    <button onClick={()=>{
    	var data = this.state.series;
    	data.unshift({
    		name:'',
    		data:''
    	})
    	this.setState({series:data},() => Highcharts.chart('container', this.state))
    }} style={{zIndex:999}} mdui-tooltip="{content: '打印'}" className="mdui-color-theme mdui-fab mdui-fab-fixed"><i className="mdui-icon material-icons">&#xe145;</i></button>
<div>{btn()}</div>
</div>
  </React.Fragment>		
  		)
  }
}
*/