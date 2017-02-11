QQ.seizures.add('Main', class Main
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		
		this._cols     = 4;
		this._rows     = 4;
		this._rndFrom  = 1;
		this._rndTo    = 6;
		
		this._width    = 30;
		this._height   = 40;
		this._camera.init(this._width, this._height, 0, 0);
		this._world.addBackground('imgs/bg.png');
		
		this.field     = new Filed(this._cols, this._rows);
		this.field.setPosition(0, 0);
		this._world.addSubject(this.field);
		
		this.next      = 0;
		this.textNext  = new QQ.Text('', 0, 17, 3);
		this.textNext.setLineSpace(10);
		this._world.addSubject(this.textNext);
		
		this.score     = 0;
		this.textScore = new QQ.Text('', 0, -17, 3);
		this.textScore.setLineSpace(10);
		this._world.addSubject(this.textScore);
		this.addScore(0); // init
		this.getNext();
		
		let space = 6 * this._cols;
		for ( let i = 0; i < this._cols; ++i ) {
			let bt = new QQ.Subject('imgs/block.png', 5, 5);
			bt.setPosition(-space/2 + 6*i + 6/2, 8);
			bt.click = () => {
				let isAdded = this.field.add(i, this.next);
				if ( isAdded === 'END_GAME' ) {
					alert('ENDGAME\nYour score ' + this.score);
					QQ.seizures.set('Main');
					return;
				}
				do {
					this.addScore( this.field.clearSame() );
				} while( this.field.dropFiled() );
				this.getNext();
			};
			this._world.addSubject(bt);
		}
	}
	
	getNext() {
		this.next = QQ.Math.rand(this._rndFrom, this._rndTo);
		this.textNext.setText('Next\n' + this.next);
	}
	
	addScore(n) {
		this.score += n;
		this.textScore.setText('Score ' + this.score);
	}
	
});

class Filed extends QQ.Subject {
	
	constructor(w, h) {
		super(null, 25, 25);
		
		this._need     = 3;
		this._cap      = 7;
		this._vertical = true;
		
		this._cols  = w;
		this._rows  = h;
		this._field = [];
		this._space = 5;
		
		for ( let i = 0; i < this._rows; ++i ) {
			this._field[i] = new Array;
			for ( let j = 0; j < this._cols; ++j ) {
				let x = j*this._space - (this._cols-1)*this._space/2;
				let y = -2 + i*this._space;
				let t = new QQ.Text('', x, y);
				t.setLineHeight(2);
				this._field[i][j] = {
					value:  0,
					subj:   t,
					delete: false
				};
			}
		}
	}
	
	dropFiled() {
		let F    = this._field;
		let dropped = false;
		let need = false;
		do {
			need = false;
			for ( let i = (this._rows-1); i >= 1; --i ) {
				for ( let j = 0; j < this._cols; ++j ) {
					if ( F[i][j].value === 0 && F[i-1][j].value !== 0 ) {
						let tmp   = F[i][j].value;
						F[i][j].value   = F[i-1][j].value;
						F[i-1][j].value = tmp;
						need = true;
						dropped = true;
					}
				}
			}
		} while(need);
		return dropped;
	}
	
	add(col, N) {
		for ( let i = 0; i < this._rows; ++i ) {
			let current = this._field[i][col];
			let V       = current.value;
			if ( V !== 0 ) {
				if ( V + N < this._cap ) {
					current.value += N;
					return;
				} else {
					if ( i === 0 ) {
						return 'END_GAME';
					} else {
						this._field[i-1][col].value = N;
						return;
					}
				}
			}
		}
		this._field[this._rows-1][col].value = N;
	}
	
	clearSame() {
		let score = 0;
		let F     = this._field;
		
		for ( let i = 0; i < this._rows; ++i ) {
			for ( let j = 0; j < this._cols - (this._need-1); ++j ) {
				let same = true;
				for ( let k = 1; k < this._need; ++k ) {
					if ( F[i][j].value !== F[i][j+k].value ) {
						same = false;
					}
				}
				if ( same ) {
					for ( let k = 0; k < this._need; ++k ) {
						F[i][j+k].delete = true;
					}
				}
			}
		}
		
		if ( this._vertical ) {
			for ( let i = 0; i < this._rows - (this._need-1); ++i ) {
				for ( let j = 0; j < this._cols; ++j ) {
					let same = true;
					for ( let k = 1; k < this._need; ++k ) {
						if ( F[i][j].value !== F[i+k][j].value ) {
							same = false;
						}
					}
					if ( same ) {
						for ( let k = 0; k < this._need; ++k ) {
							F[i+k][j].delete = true;
						}
					}
				}
			}
		}
		
		for ( let row of this._field ) {
			for ( let el of row ) {
				if ( el.delete ) {
					score += el.value;
					el.value  = 0;
					el.delete = false;
				}
			}
		}
		return score;
	}
	
	draw() {
		//this.drawBorder();
		for ( let row of this._field ) {
			for ( let el of row ) {
				let pos = el.subj.getPosition();
				this._ctx.translate(pos.x, pos.y);
				if ( el.value === 0 ) {
					el.subj.setText('-');
				} else {
					el.subj.setText(el.value);
				}
				el.subj.draw();
				this._ctx.translate(-pos.x, -pos.y);
			}
		}
	}
	
};