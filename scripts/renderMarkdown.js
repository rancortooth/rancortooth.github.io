console.debug("STARTING MARKDOWN RENDER SCRIPT...\n")

const fs = require('fs');
const path = require('path');
const pathToPosts = path.join(__dirname, '../markdown_posts/');
const htmlPath = path.join(__dirname, '../docs/blog/post/');
const ignoredFiles = [
  'template_html.html'
];

// compile the posts
fs.readdir(pathToPosts, (err, files) => {
  if (err) console.error("Error reading posts", err);

  let fileArray = [];

  files.filter(file => !file.includes(ignoredFiles))
    .forEach(file => {
      var filesys = require('fs')
      console.log("Markdown file to render: " + pathToPosts + file);
      const contents = filesys.readFileSync(pathToPosts + file, 'utf8');
      const postDirName = file.replace('.md', '');
      const htmlFile = htmlPath + postDirName + "/post.html";
      console.log("htmlPath: " + htmlPath);
      console.log("postDirName: " + postDirName);
      console.log("Final HTML File: " + htmlFile + "\n");

      try {
        console.log("Creating path: " + htmlPath + postDirName);
        fs.mkdirSync(htmlPath + postDirName);
      } catch (err) {
        console.log(htmlPath + postDirName + " already exists");
      }

      // Render the markdown into html
      var showdown = require('showdown'),
        converter = new showdown.Converter(),
        text = contents,
        html = converter.makeHtml(text);
      console.log("RENDERED HTML: " + html);
      filesys.writeFileSync(htmlFile, html, 'utf8', function (err) {
        if (err) throw err;
      });
    });
});

console.debug("MARKDOWN RENDER SCRIPT - COMPLETED\n");
