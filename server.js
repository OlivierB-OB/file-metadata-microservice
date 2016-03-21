var express = require('express');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'tmp/' });
var jade = require('jade');

var app = new express();
app.use(express.static('bower_components'));
app.use(express.static('statics'));
app.get('/', home);
app.post('/', upload.single('metafile'), getMeta);

var home = jade.compile(fs.readFileSync('home.jade', 'utf8'));

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Listening on port: ' + process.env.PORT);
});

function home (req, res) {
    res.send(home({}));
}

function getMeta (req, res) {
    res.send(home({
        fileSize: req.file.size
    }));
    fs.unlinkSync(req.file.path);
}