rm -rf ../release/*

node releaseHtml.js
node imgsToMain.js
node jsToCompiled.js
#node jsToIndex.js # TO FIX
./compiledToRelease.sh

cp -RL ../css ../release/css
cp -RL ../fonts ../release/fonts
cp -RL ../imgs ../release/imgs
cp -RL ../sounds ../release/sounds
cp -RL ../sounds ../release/sounds
cp ../../node_modules/babel-polyfill/dist/polyfill.min.js ../release/polyfill.min.js

rm -rf ../../cordova/www/*
cp -RL ../release/* ../../cordova/www

cd ../../cordova
cordova build -release
cordova build

cp platforms/android/build/outputs/apk/* ../apk
