rm -rf ../release/*
node releaseHtml.js
node imgsToMain.js
node jsToCompiled.js
#node jsToIndex.js # TO FIX
./compiledToRelease.sh

cp -RL ../css ../release/css
cp -RL ../js ../release/js
cp -RL ../fonts ../release/fonts
cp -RL ../imgs ../release/imgs
cp -RL ../sounds ../release/sounds

