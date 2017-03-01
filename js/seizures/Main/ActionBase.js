class ActionBase {
	
	constructor(subj) {
		this._subj  = subj;
		this._start = QQ.application.getTime().now();
	}
	
	onStart() {
	}
	
	onEnd() {
	}
	
	tick() {
	}
	
	draw() {
	}
	
	type() {
		return 'idle';
	}
}
