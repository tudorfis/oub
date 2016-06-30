/* get list of files
* copy the result from console to "pp/assets/sass/fonts.scss"
* replacing lines 8, 9
* */
var fs = require('fs'),
    path = '../app/assets/fonts/';

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){

        // for subdirectories
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }

    var font_names = '',
        font_paths = '';
    for (var i in files_) {
        var file = files_[i];
        font_names += "'"+
            file.replace(path, '')
                .replace('/', '')
                .replace('.otf', '')
                .replace('.ttf', '')
            +"', ";
        font_paths += "'"+
            file.replace('//', '/')
                .replace('/app/assets', '')
            +"', ";
    }
    font_names = font_names.substring(0, font_names.length - 2);
    font_names = '$font-names: '+ font_names +";";

    font_paths = font_paths.substring(0, font_paths.length - 2);
    font_paths = '$font-paths: '+ font_paths +";";

    console.log(font_names +"\n"+ font_paths)
}
getFiles(path);

