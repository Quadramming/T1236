// Fill main.js with imgs from folder

//================================================================
// Settings
//================================================================

const output  = 'htmlRoot/js/main.js';
const imgsDir = 'htmlRoot/imgs';

//================================================================
// Functions
//================================================================

function getFiles(dir, inFiles = [], showHidding = false) {
	const files = fs.readdirSync(dir);
	for ( const file of files ) {
		const name = dir + '/' + file;
		if ( fs.statSync(name).isDirectory() ){
			if ( ! name.includes('/.') || showHidding ) {
				getFiles(name, inFiles);
			}
		} else {
			if ( ! name.includes('/.') || showHidding ) {
				inFiles.push(name);
			}
		}
	}
	return inFiles;
}

//================================================================
// Code
//================================================================

const fs    = require('fs');
let   files = '';

for ( const file of getFiles(imgsDir) ) {
	files += "\t\t\t'" + file.substr(9) + "',\n";
}
files = files.replace(/[\s\S]([\s\S])$/, '$1');

const re      = /(const imgs = \[)[\S\s]*?(\];)/;
let   content = fs.readFileSync(output, 'utf-8');
content       = content.replace(re, '$1\n' + files + '\t\t$2');
fs.writeFileSync(output, content, {
	encoding : 'utf-8',
	flag     : 'w'
});

