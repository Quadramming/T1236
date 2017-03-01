class ActionDisapear extends ActionBase {
	
	constructor(subj, duration) {
		super(subj);
		this._duration = duration;
	}
	
	tick(delta) {
		let progress = QQ.Math.calcProgress(this._start, this._duration);
		this._subj.setAlpha(1 - progress);
		if ( progress === 1 ) {
			this.onEnd();
		}
	}
	
	type() {
		return 'disapear';
	}
	
}
