# BreslevNews

    For android 7.0.0

    $ cordova clean android
    $ cordova build android

    $ ionic cordova run android --device -l --debug
    $ ionic cordova run android --prod 
    $ ionic cordova run ios --device -l --debug
    $ ionic cordova run ios --prod
    $ ionic cordova run android --emulator -l --debug

## Release APP:
    1.
    $ ionic cordova build android --prod --release

    2.
    $ cd C:\shtibel\ionic\project\BreslevNews\apk\release
    
    
    //$ keytool -genkey -v -keystore keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

    alias: upload
    password: m_5730013

    3.
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore.jks app-release-unsigned.apk upload

    //$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-alias

    4.
    $ cd C:\sdk\build-tools\28.0.3
    $ zipalign -v 4 C:\shtibel\ionic\project\BreslevNews\apk\release\app-release-unsigned.apk C:\shtibel\ionic\project\BreslevNews\apk\release\BreslevNews-release-beta-0-0-11.apk


    5.
    $ apksigner verify C:\shtibel\ionic\BreslevNews\platforms\android\app\build\outputs\apk\release\BreslevNewsד-release-beta-03.apk

## Start
    $ ionic start MyApp blank

## Installation

## Add Google analytics
    $ ionic cordova plugin add cordova-plugin-google-analytics
    $ npm install --save @ionic-native/google-analytics

## Add Onesignal
    $ ionic cordova plugin add onesignal-cordova-plugin
    $ npm install --save @ionic-native/onesignal

## Add Network
    $ ionic cordova plugin add cordova-plugin-network-information
    $ npm install --save @ionic-native/network

## Add Device
    $ ionic cordova plugin add cordova-plugin-device
    $ npm install --save @ionic-native/device

## Add App version
    $ ionic cordova plugin add cordova-plugin-app-version
    $ npm install --save @ionic-native/app-version

