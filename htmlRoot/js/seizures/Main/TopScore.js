game.seizures.Main.TopScore = class TopScore {
	
	constructor(app, world) {
		this._app       = app;
		this._prefix    = 'BEST\n';
		this._score     = 0;
		this._textScore = new QQ.Text(app, '', 6, -15, 3);
		this._textScore.setLineSpace(10);
		world.addSubject(this._textScore);
		this._update();
	}
	
	tryScore(score) {
		if ( score > this._score ) {
			this._store(score);
			this._update();
		}
	}
	
	_update() {
		this._score = this._store();
		this._textScore.setText(this._prefix + this._score);
	}
	
	_store(val) {
		let key = 'topScore';
		if ( val ) {
			this._app.storage(key, val);
		}
		let result = this._app.storage(key);
		return Number(result);
	}
	
};
