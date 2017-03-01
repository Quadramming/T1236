// NEED FIX
// Fill index.html with JS-files from folder

//================================================================
// Settings
//================================================================

const output = '../index.html';
const jsDir  = '../js';

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

for ( const file of getFiles(jsDir) ) {
	files += 
		"\t\t\t<script type='application/javascript' src='" +
		file.substr(3) + "'>" +
		"</script>\n";
}

const re      = /(<!-- scripts -->)[\S\s]*?(<!-- \/scripts -->)/;
let   content = fs.readFileSync(output, 'utf-8');
content     = content.replace(re, '$1\n' + files + '\t\t$2');

fs.writeFileSync(output, content, {
	encoding : 'utf-8',
	flag     : 'w'
});
