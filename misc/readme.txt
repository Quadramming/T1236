1) Add: 

@Override
public void onBackPressed() {
}

in "CordovaActivity.java" after "protected void onPause() {...}"

2) Add:

settings.setUseWideViewPort(true);
settings.setLoadWithOverviewMode(true);

in "SystemWebViewEngine.java" after "settings.setLayoutAlgorithm(...);" in "private void initWebViewSettings()"

