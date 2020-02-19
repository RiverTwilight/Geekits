var list = [{
	name: 'pornhub风格图片生成',
	link: 'fake_pornhub_logo',
	icon: ''
}, {
	name: 'B站视频封面获取',
	link: 'bilibili_cover',
	icon: ''
}, {
	name: '跨设备文本&文件互传',
	link: 'clipboard',
	icon: ''
}, {
	name: 'GIF分解',
	link: 'gif_lib',
	icon: ''
},{
	name: '二维码生成',
	link: 'qrcode',
	icon: ''
},{
	name: '便签',
	link: 'note',
	icon: ''
},{
	name: '做决定',
	link: 'decision',
	icon: ''
},{
	name: '简繁转换',
	link: 'sctc',
	icon: ''
},{
	name: '文字识别',
	link: 'ocr',
	icon: ''
},{
	name: 'GIF制作',
	link: 'gif',
	icon: ''
},{
	name: '樱花动漫视频解析',
	link: 'imomoe_parse',
	icon: 'ondemand_video'
},{
	name: '九格切图',
	link: 'img_split',
	icon: ''
}, {
	name: 'mimetype查询',
	link: 'mimetype',
	icon: ''
}, {
	name: '运动记分板',
	link: 'scoreboard',
	icon: ''
}, {
	name: '表情制作',
	link: 'emoticon',
	icon: ''
}, {
	name: '全能文本转码',
	link: 'endecode',
	icon: ''
}, {
	name: '图片转base64',
	link: 'img2base64',
	icon: ''
}, {
	name: '图片拼接',
	link: 'img_mosaic',
	icon: ''
}]

fetch('https://api.ygktool.cn/apps')
    .then(res => res.json())
    .then(json => {
        console.log(json);
    })

var appinfo = {
	get: link => {
		for (let a in list) {
			if (list[a].link === link) return list[a]
		}
		return '404'
	},
	getAll: ()=>{
		return list
	}
}

export default appinfo