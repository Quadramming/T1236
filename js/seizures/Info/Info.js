QQ.seizures.add('Info', class Info
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		this._camera.init(30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('imgs/dialog.png');
		
		let text = new QQ.Text(
				'Trifle  Quad  Studio\n'+
				'Game  by  Quad\n'+
				'Assets  by  kenney.nl',
				0, 13, 
				1.5, QQ.Text.fit.HEIGHT
			);
		text.setLineSpace(10);
		this._world.addSubject(text);
		
		const reset = new QQ.Subject('imgs/restart.png', 5, 5);
		reset.setPosition(-3, 4);
		reset.click = () => {
			let field = String( QQ.application.storage('Field') );
			QQ.application.storage('Field', field.replace(/./g, '0') );
			QQ.application.storage('curScore', '0');
			QQ.seizures.closePopUp();
			QQ.seizures.reset();
		};
		this._world.addSubject(reset);
		
		const close = new QQ.Subject('imgs/next.png', 5, 5);
		close.setPosition(3, 4);
		close.click = () => {
			QQ.seizures.closePopUp();
		};
		this._world.addSubject(close);
		
		let animation = new CheckBox('Fast animation', 2, 2);
		this._world.addSubject(animation);
		animation.setPosition(-7, 8);
	}
	
});
