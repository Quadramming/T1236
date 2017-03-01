QQ.Seizures.SeizureMain.TopScore = class TopScore {
	
	constructor(world) {
		this._prefix    = 'BEST\n';
		this._score     = 0;
		this._textScore = new QQ.Text('', 6, -15, 3);
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
			QQ.application.storage(key, val);
		}
		let result = QQ.application.storage(key);
		return Number(result);
	}
	
};
