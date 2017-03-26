game.seizures.Info.CheckBox = class CheckBox extends QQ.SubjectBase {
	
	constructor(app, text, w, h) {
		super(app, w, h);
		this.name    = 'CheckBox_'+text;
		this.value   = false;
		this.check   = new QQ.Subject(app, 'imgs/check.png');
		this.uncheck = new QQ.Subject(app, 'imgs/uncheck.png');
		this.text    = new QQ.Text(app, text);
		this.text.setLineHeight(50);
		this._update();
	}
	
	draw() {
		if ( this.value ) {
			this.check.draw();
		} else {
			this.uncheck.draw();
		}
		this._ctx.translate(
			this.text.getWidth()/2 + this.check.getImgSize().width,
			0
		);
		this.text.draw();
	}
	
	click() {
		this._app.storage(this.name, String(!this.value) );
		this._update();
	}
	
	getScale() {
		let size   = this.check.getScale();
		let scaleX = this._width  * size.x;
		let scaleY = this._height * size.y;
		return { x : scaleX, y : scaleY };
	}
	
	_update() {
		this.value = this._app.storage(this.name) === 'true';
	}
	
};
