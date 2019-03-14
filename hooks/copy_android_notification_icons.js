#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var rootDest = 'platforms/android/app/src/main/res';
var files = [{
  'locales/android/drawable-hdpi/ic_stat_onesignal_default.png':
     path.join(rootDest, 'drawable-hdpi/ic_stat_onesignal_default.png')
}, {
  'locales/android/drawable-mdpi/ic_stat_onesignal_default.png':
    path.join(rootDest, 'drawable-mdpi/ic_stat_onesignal_default.png')
}, {
  'locales/android/drawable-xhdpi/ic_stat_onesignal_default.png':
    path.join(rootDest, 'drawable-xhdpi/ic_stat_onesignal_default.png')
}, {
  'locales/android/drawable-xxhdpi/ic_stat_onesignal_default.png':
    path.join(rootDest, 'drawable-xxhdpi/ic_stat_onesignal_default.png')
}, {
  'locales/android/drawable-xxxhdpi/ic_stat_onesignal_default.png':
    path.join(rootDest, 'drawable-xxxhdpi/ic_stat_onesignal_default.png')
}];

function createFolder(pathAbsolute) {
  if (!fs.existsSync(pathAbsolute)) {
    fs.mkdirSync(pathAbsolute);
  }

  console.log('Folder ready ', pathAbsolute);
}

module.exports = function(context) {
  var root = context.opts.projectRoot;

  createFolder(path.join(root, rootDest, 'drawable-hdpi'));
  createFolder(path.join(root, rootDest, 'drawable-mdpi'));
  createFolder(path.join(root, rootDest, 'drawable-xhdpi'));
  createFolder(path.join(root, rootDest, 'drawable-xxhdpi'));
  createFolder(path.join(root, rootDest, 'drawable-xxxhdpi'));

  files.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
      var src = path.join(root, key);
      var dest = path.join(root, obj[key]);

            
      console.log('existsSync: ', fs.existsSync(src));
      console.log('existsSync dirname: ', fs.existsSync(path.dirname(dest)));
      console.log('existsSync src: ', src);      
      console.log('existsSync dest: ', dest);      

      if (fs.existsSync(src) && fs.existsSync(path.dirname(dest))) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));

        console.log('Copied ' + src + ' to ' + dest);
      }
      console.log('-------');
    });
  });
};