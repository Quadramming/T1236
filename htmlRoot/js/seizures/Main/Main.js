game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._world.addBackground('imgs/bg.png');
		this._score    = new Main.Score(app, this._world);
		this._field    = new Main.Field(app, this, {
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
		let back = new QQ.Subject.Sprite(this._app, 'imgs/info.png', 5, 5);
		back.setPosition(x, y);
		back.click = () => this._app.sz().popUp('Info');
		this._world.addSubject(back);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
