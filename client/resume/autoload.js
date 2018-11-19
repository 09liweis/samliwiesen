// 加载 CSS
$("<link>").attr({href: "./waifu.css", rel: "stylesheet", type: "text/css"}).appendTo('head');

// 插入 DIV
$('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" width="280" height="250" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');

// 加载 JS
$.ajax({
	url: './live2d.js',
	dataType:"script",
	cache: true,
	async: false
});
$.ajax({
	url: './waifu-tips.js',
	dataType:"script",
	cache: true,
	async: false
});

// 初始化看板娘，会自动加载指定目录下的 waifu-tips.json
initModel('');