QQ.Seizures.SeizureMain = class Main
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		this._camera.init(30, 40, 0, 0);
		this._world.addBackground('imgs/bg.png');
		this._score    = new Main.Score(this._world);
		this._field    = new Main.Field(this, {
			rows:      4,
			cols:      4,
			rndFrom:   1,
			rndTo:     6,
			delLength: 3,
			cap:       6
		});
		this._addInfo(-12, -17);
	}
	
	getWorld() {
		return this._world;
	}
	
	getScore() {
		return this._score;
	}
	
	tick(delta) {
		this._field.tick(delta);
	}
	
	_addInfo(x, y) {
		let back = new QQ.Subject('imgs/info.png', 5, 5);
		back.setPosition(x, y);
		back.click = () => QQ.seizures.popUp('Info');
		this._world.addSubject(back);
	}
	
};

QQ.seizures.add('Main', QQ.Seizures.SeizureMain);
