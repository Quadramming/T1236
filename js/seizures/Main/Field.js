QQ.Seizures.SeizureMain.Field = class Field {
	
	constructor(seizure, settings) {
		this._score    = seizure.getScore();
		this._seizure  = seizure;
		this._settings = settings;
		this._rows     = settings.rows;
		this._cols     = settings.cols;
		this._field    = [];
		this._next     = {
			from: {x: 17.5, y: 12},
			to:   {x: 0,    y: 12},
			subj: null
		};
		this._tmp      = null;
		this._world    = seizure.getWorld();
		this._space    =  5;
		this._offsetY  = 6;
		this._finished = false;
		this._initField();
	}
	
	tick(delta) {
		this._forAllSubj( subj => subj.tick() );
		if ( ! this._isAllIdle() || this._finished ) {
			return;
		}
		let score = this._clearSame();
		if ( score ) {
			this._score.addScore(score);
			return;
		}
		if ( this._dropFiled() ) {
			return;
		}
		if ( this._next.subj === null ) {
			this._makeNext();
			this._saveField();
		}
		if ( this._isFieldFull() ) {
			this._seizure.blockInput();
			this._finished = true;
			setTimeout( () => {
				QQ.seizures.popUp('EndLevel', this._score.getScore());
				this._resetSavedField();
			}, 1000 );
			return;
		}
	}
	
	_saveField() {
		let field = '';
		field += this._next.subj.getValue();
		for ( let [i, row] of this._field.entries() ) {
			for ( let [j, cell] of row.entries() ) {
				field += cell.value;
			}
		}
		QQ.application.storage('Field', field);
		QQ.application.storage('curScore', this._score.getScore());
	}
	
	_resetSavedField() {
		let save = '0';
		save = save.repeat(1 + this._rows*this._cols);
		QQ.application.storage('Field', save);
		QQ.application.storage('curScore', '0');
		return save;
	}
	
	_forAllSubj(fn) {
		if ( this._next.subj ) {
			fn(this._next.subj);
		}
		if ( this._tmp ) {
			fn(this._tmp);
		}
		for ( let [i, row] of this._field.entries() ) {
			for ( let [j, cell] of row.entries() ) {
				if ( cell.subj ) {
					fn(cell.subj);
				}
			}
		}
	}
	
	_isAllIdle() {
		let notIdle = 0;
		this._forAllSubj( subj => {
			if ( ! subj.isIdle() ) {
				++notIdle;
			}
		});
		return notIdle === 0;
	}
	
	_makeNext(n) {
		if ( n === '0' || ! n ) {
			n = this._getRandom();
		}
		let nextBlock = new Field.Block(
			this._next.from.x * QQ.Math.any(1, -1),
			this._next.from.y,
			n
		);
		this._next.subj = nextBlock;
		this._world.addSubject(nextBlock);
		nextBlock.moveTo(this._next.to);
	}
	
	_isFieldFull() {
		for ( let [j, cell] of this._field[0].entries() ) {
			let sum = cell.value + this._next.subj.getValue();
			if ( sum <= this._settings.cap ) {
				return false;
			}
		}
		return true;
	}
	
	_initField() {
		let field        = QQ.application.storage('Field');
		let currentScore = QQ.application.storage('curScore') || 0;
		this._score.setScore(currentScore);
		if ( field === null ) {
			field = this._resetSavedField();
		}
		this._makeNext(Number(field[0]));
		for ( let i = 0; i < this._rows; ++i ) {
			this._field[i] = new Array;
			for ( let j = 0; j < this._cols; ++j ) {
				this._field[i][j] = {
					value:  Number(field[1 + i*this._cols + j]),
					delete: false,
					x:      0,
					y:      0,
					subj:   null
				};
			}
		}
		this._initButtons();
		return;
	}
	
	_initButtons() {
		for ( let [i, row] of this._field.entries() ) {
			for ( let [j, cell] of row.entries() ) {
				cell.x   = j*this._space - (this._cols-1)*this._space/2;
				cell.y   = (this._offsetY - i*this._space);
				const bt = new QQ.Subject('imgs/gap.png', 5, 5);
				bt.setPosition(cell.x, cell.y);
				bt.click = () => { this._clickCol(j); };
				this._world.unshiftSubject( bt );
				if ( cell.value ) {
					let block = new Field.Block(
						cell.x,
						cell.y,
						cell.value
					);
					cell.subj = block;
					this._world.addSubject(block);
				}
			}
		}
	}
	
	_clickCol(i) {
		if ( this._isAllIdle() ) {
			let value  = this._next.subj.getValue();
			let target = this._getTarger(i, value);
			if ( target ) {
				if ( target.value ) {
					target.value   += this._next.subj.getValue();
					this._tmp = this._next.subj;
					this._next.subj = null;
					this._tmp.moveTo({x: target.x, y: target.y}, () => {
						target.subj.setValue(target.value);
						this._tmp.disapear(() => {
							this._world.deleteSubject(this._tmp);
							this._tmp    = null;
						});
						
					});
				} else {
					target.value    = this._next.subj.getValue();
					target.subj     = this._next.subj;
					this._next.subj = null;
					target.subj.moveTo({x: target.x, y: target.y});
				}
			}
		}
	}
	
	_getTarger(j, value) {
		let target = null;
		let F      = this._field;
		for ( let i = 0; i < F.length; ++i ) {
			let me = this._field[i][j].value;
			if ( me + value <= this._settings.cap ) {
				target = this._field[i][j];
				if ( me > 0 ) {
					return target;
				}
			} else {
				return target;
			}
		}
		return target;
	}
	
	_getRandom() {
		let s = this._settings;
		return QQ.Math.rand(s.rndFrom, s.rndTo);
	}
	
	_exchange(A, B) {
		([A.value, B.value] = [B.value, A.value]);
		([A.subj,  B.subj]  = [B.subj,  A.subj]);
		A.subj.moveTo({x: A.x, y: A.y});
	}
	
	_dropFiled() {
		let F       = this._field;
		let dropped = false;
		let again   = false;
		let H       = this._rows;
		let W       = this._cols;
		for ( let i = (H-1); i >= 1; --i ) {
			for ( let j = 0; j < W; ++j ) {
				if ( F[i][j].value === 0 && F[i-1][j].value !== 0 ) {
					this._exchange(F[i][j], F[i-1][j]);
					dropped = true;
				}
			}
		}
		return dropped;
	}
	
	_clearSame() {
		let score = 0;
		let need  = this._settings.delLength;
		let F     = this._field;
		let H     = this._rows;
		let W     = this._cols;
		for ( let i = 0; i < H; ++i ) {
			for ( let j = 0; j < W - (need-1); ++j ) {
				let same = true;
				for ( let k = 1; k < need; ++k ) {
					let isZero = F[i][j].value === 0;
					if ( F[i][j].value !== F[i][j+k].value || isZero ) {
						same = false;
						break;
					}
				}
				if ( same ) {
					for ( let k = 0; k < need; ++k ) {
						F[i][j+k].delete = true;
					}
				}
			}
		}
		for ( let i = 0; i < H - (need-1); ++i ) {
			for ( let j = 0; j < W; ++j ) {
				let same = true;
				for ( let k = 1; k < need; ++k ) {
					let isZero = F[i][j].value === 0;
					if ( F[i][j].value !== F[i+k][j].value || isZero ) {
						same = false;
						break;
					}
				}
				if ( same ) {
					for ( let k = 0; k < need; ++k ) {
						F[i+k][j].delete = true;
					}
				}
			}
		}
		for ( let row of F ) {
			for ( let el of row ) {
				if ( el.delete ) {
					score     += el.value;
					el.value   = 0;
					el.delete  = false;
					el.subj.disapear(() => {
						this._world.deleteSubject(el.subj);
						el.subj    = null;
					});
				}
			}
		}
		return score;
	}
	
};
