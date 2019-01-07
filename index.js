mustache = require('mustache');
fs = require('fs');
HTML = require('html-parse-stringify');
pdf = require('html-pdf');
options = { format: 'Letter' };

//get the json and html data
var jsondata = fs.readFileSync('../input/input.json');
var template = fs.readFileSync('../templateHtml/template.html');

//parse the json and stringify the HTML
var data = JSON.parse(jsondata);
var html = template.toString();

//render the json data into the html template using mustache
var output = mustache.render(html,data)

//write the rendered content as html to a new html file
fs.writeFileSync('../outputs/index.html' , output)

//read the html file written now
var htmlFile = fs.readFileSync('../outputs/index.html','utf8')

//if the file exists then use html to pdf to convert the DOM to pdf
if(htmlFile){
    pdf.create(htmlFile , options).toFile('../outputs/index.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });
}