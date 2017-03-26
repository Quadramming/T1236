dirs:
apk - apk files
build - tmp build files
buildScripts - scripts to compile project
compiled - compiled html project
cordova - cordova project
htmlRoot - src
nbproject - NetBean project
node_modules - babel and other
playMarket - files for play market
sign - sign staff
.git - git project

files:
buid.sh - full build project
readme.md - this file
release.apk - Fully ready apk
.gitignore - Git ignore

other:
1) Optional. Block backbutton. 
Add: 

@Override
public void onBackPressed() {
}

in "CordovaActivity.java" after "protected void onPause() {...}"

2) Allow meta in project.
Add:

settings.setUseWideViewPort(true);
settings.setLoadWithOverviewMode(true);

in "SystemWebViewEngine.java" after "settings.setLayoutAlgorithm(...);" in "private void initWebViewSettings()"

