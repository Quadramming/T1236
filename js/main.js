window.addEventListener('load', () => {
	document.addEventListener('deviceready', () => {
		
		const imgs = [
		'imgs/bg.png',
		'imgs/block.png',
		'imgs/check.png',
		'imgs/dialog.png',
		'imgs/gap.png',
		'imgs/info.png',
		'imgs/next.png',
		'imgs/restart.png',
		'imgs/settings.png',
		'imgs/uncheck.png'
	];
		
		const appConfig = {
			width:    600,
			height:   800,
			maximize: true
		};
		
		QQ.engine.start(imgs, appConfig);
		
	}, false);
});
