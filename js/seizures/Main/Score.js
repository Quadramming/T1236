QQ.Seizures.SeizureMain.Score = class Score {
	
	constructor(world) {
		this._topScore  = new QQ.Seizures.SeizureMain.TopScore(world);
		this._prefix    = 'Score   ';
		this._score     = 0;
		this._textScore = new QQ.Text(this._getText(), 0, 17, 2);
		this.setScore(0);
		world.addSubject(this._textScore);
	}
	
	addScore(score) {
		this._score += score;
		this.setScore(this._score);
	}
	
	getScore() {
		return this._score;
	}
	
	setScore(score) {
		this._score = parseInt(score, 10);
		this._topScore.tryScore(score);
		this._textScore.setText(this._getText());
	}
	
	_getText() {
		return this._prefix + this._score;
	}
	
};
