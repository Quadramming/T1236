game.seizures.Main.Field.Block = class Block extends QQ.Subject {
	
	constructor(app, x, y, value) {
		super(app, 'imgs/block.png', 5, 5);
		this.setPosition(x, y);
		this._value  = value;
		this._ctx    = this._app.getContext();
		this._action = new QQ.Actions.Base(app, this);
		this._text   = new QQ.Text(app, this._value);
		this._text.setLineHeight(50);
	}
	
	moveTo(to, onEnd = () => {} ) {
		this._action = new QQ.Actions.Move(
			this._app,
			this,
			{ x: this._x, y: this._y },
			to,
			this._getTime()
		);
		this._action.onEnd = onEnd;
	}
	
	disapear(fn) {
		this._action = new QQ.Actions.Disapear(
				this._app,
				this,
				this._getTime()
			);
		this._action.onEnd = fn;
	}
	
	tick(delta) {
		this._action.tick(delta);
	}
	
	isIdle() {
		return this._action.type() === 'base';
	}
	
	isClickable() {
		return false;
	}
	
	getValue() {
		return this._value;
	}
	
	setValue(value) {
		this._value = value;
		this._text.setText(this._value);
	}
	
	setIdle() {
		this._action = new QQ.Actions.Base(this._app, this);
	}
	
	draw() {
		super.draw();
		this._ctx.translate(6, 10);
		const changeAlpha = (this._alpha !== 1);
		if ( changeAlpha ) {
			this._ctx.globalAlpha = this._alpha;
		}
		this._text.draw();
		if ( changeAlpha ) {
			this._ctx.globalAlpha = 1;
		}
	}
	
	_getTime() {
		let isAnimation = this._app.storage('CheckBox_Fast animation');
		let time = (isAnimation === 'true' ? 50 : 300);
		return time;
	}
	
};
