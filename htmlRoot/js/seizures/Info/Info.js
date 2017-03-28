game.seizures.Info = class Info
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('imgs/dialog.png');
		
		let text = new QQ.Text(
				app,
				'Trifle  Quad  Studio\n'+
				'Game  by  Quad\n'+
				'Assets  by  kenney.nl',
				0, 13, 
				1.5, QQ.Text.fit.HEIGHT
			);
		text.setLineSpace(10);
		this._world.addSubject(text);
		
		const reset = new QQ.Subject.Sprite(app, 'imgs/restart.png', 5, 5);
		reset.setPosition(-3, 4);
		reset.click = () => {
			let field = String( app.storage('Field') );
			app.storage('Field', field.replace(/./g, '0') );
			app.storage('curScore', '0');
			app.sz().closePopUp();
			app.sz().reset();
		};
		this._world.addSubject(reset);
		
		const close = new QQ.Subject.Sprite(app, 'imgs/next.png', 5, 5);
		close.setPosition(3, 4);
		close.click = () => {
			app.sz().closePopUp();
		};
		this._world.addSubject(close);
		
		let animation = new Info.CheckBox(app, 'Fast animation', 2, 2);
		this._world.addSubject(animation);
		animation.setPosition(-7, 8);
	}
	
};

QQ.Seizures.register.set('Info', game.seizures.Info);
