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
    $ zipalign -v 4 C:\shtibel\ionic\project\BreslevNews\apk\release\app-release-unsigned.apk C:\shtibel\ionic\project\BreslevNews\apk\release\BreslevNews-release-beta-0-0-5.apk


    5.
    $ apksigner verify C:\shtibel\ionic\BreslevNews\platforms\android\app\build\outputs\apk\release\BreslevNews-release-beta-0-0-4.apk

## Start
    $ ionic start MyApp blank

## Installation

## Add Onesignal
    $ ionic cordova plugin add onesignal-cordova-plugin
    npm install --save @ionic-native/onesignal@4

## Add Network
    $ ionic cordova plugin add cordova-plugin-network-information
    $ npm install --save @ionic-native/network@4
        
## Add In App Browser
    $ ionic cordova plugin add cordova-plugin-inappbrowser
    $ npm install --save @ionic-native/in-app-browser@4

## Add App Version
    $ ionic cordova plugin add cordova-plugin-app-version
    $ npm install @ionic-native/app-version@4

## Add Device
    $ ionic cordova plugin add cordova-plugin-device
    $ npm install @ionic-native/device@4