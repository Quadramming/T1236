game.seizures.EndLevel = class EndLevel
	extends QQ.Seizures.Base
{
	
	constructor(app, score) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('imgs/dialog.png');
		
		let text = new QQ.Text(app, 'Final score\n', 0, 13, 1.3);
		this._world.addSubject(text);
		
		let finalScore = new QQ.Text(app, String(score), 0, 9, 3);
		this._world.addSubject(finalScore);
		
		const reset = new QQ.Subject.Sprite(app, 'imgs/restart.png', 5, 5);
		reset.setPosition(0, 4);
		reset.click = () => {
			app.sz().closePopUp();
			app.sz().reset();
		};
		this._world.addSubject(reset);
	}
	
};

QQ.Seizures.register.set('EndLevel', game.seizures.EndLevel);
