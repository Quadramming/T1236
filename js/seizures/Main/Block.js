class Block extends QQ.Subject {
	
	constructor(x, y, value) {
		super('imgs/block.png', 5, 5);
		this.setPosition(x, y);
		this._value = value;
		this._text = new QQ.Text(this._value);
		this._text.setLineHeight(50);
		this._ctx = QQ.application.getContext();
		this._action = new ActionBase(this);
	}
	
	moveTo(to, onEnd = () => {} ) {
		this._action = new ActionMove(this,
			{ x: this._x, y: this._y },
			to,
			this._getTime()
		);
		this._action.onEnd = onEnd;
	}
	
	disapear(fn) {
		this._action = new ActionDisapear(this, this._getTime());
		this._action.onEnd = fn;
	}
	
	tick(delta) {
		this._action.tick(delta);
	}
	
	isIdle() {
		return this._action.type() === 'idle';
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
		this._action = new ActionBase(this);
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
		let isAnimation = QQ.application.storage('CheckBox_Fast animation');
		let time = (isAnimation === 'true' ? 50 : 300);
		return time;
	}
	
}
