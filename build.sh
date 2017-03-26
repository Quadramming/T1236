rm -rf compiled/*
rm release.apk

node buildScripts/releaseHtml.js
node buildScripts/imgsToMain.js
node buildScripts/jsToCompiled.js
#node buildScripts/jsToIndex.js # TO FIX
buildScripts/compiledToRelease.sh

cp -RL htmlRoot/css    compiled/css
cp -RL htmlRoot/fonts  compiled/fonts
cp -RL htmlRoot/imgs   compiled/imgs
cp -RL htmlRoot/sounds compiled/sounds
cp node_modules/babel-polyfill/dist/polyfill.min.js compiled/polyfill.min.js

rm -rf cordova/www/*
cp -RL compiled/* cordova/www

cd cordova
cordova build -release
cordova build
cd ..

cp cordova/platforms/android/build/outputs/apk/* apk
zipalign -p 4 apk/android-release-unsigned.apk release.apk
$ANDROID_HOME/build-tools/25.0.2/apksigner sign --ks sign/my.keystore release.apk

