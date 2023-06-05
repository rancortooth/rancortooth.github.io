console.debug("STARTING MARKDOWN RENDER SCRIPT...\n")

const fs = require('fs');
const path = require('path');
const metaParser = require('markdown-yaml-metadata-parser');
const pathToPosts = path.join(__dirname, '../src/assets/posts');
const pathToCompiledPosts = path.join(__dirname, '../src/_assets/posts');
const ignoredFiles = [
  'gitignore',
  'pages.json',
  'posts.json',
  'portfolio.json',
];

// compile the posts
fs.readdir(pathToPosts, (err, files) => {
  if (err) console.error("Error reading posts", err);

  let fileArray = [];

  const htmlPath = path.join(__dirname, '../docs/blog/post/');

  files.filter(file => !file.includes(ignoredFiles))
    .forEach(file => {
      const contents = fs.readFileSync(path.join(__dirname, `../src/assets/posts/${file}`), 'utf8');
      const parsed = metaParser(contents);
      const shortFileName = file.replace('.md', '');

      const htmlFile = htmlPath + shortFileName + "/index.html";
      const markdownFile = `${pathToCompiledPosts}/${file}`;
      console.log("Markdown File: " + markdownFile);
      console.log("HTML File: " + htmlFile + "\n");

      // Render the markdown into html
      fs.readFile(markdownFile, 'utf8', function (err, data) {
        if (err) throw err;
        var showdown = require('showdown'),
          converter = new showdown.Converter(),
          text = data,
          html = converter.makeHtml(text);

        // Replace the REPLACE_ME_WITH_MARKDOWN token in the html file with the rendered markdown
        var fs = require('fs')
        fs.readFile(htmlFile, 'utf8', function (err, data) {
          if (err) throw err;
          var result = data.replace(/REPLACE_ME_WITH_MARKDOWN/g, html);

          fs.writeFile(htmlFile, result, 'utf8', function (err) {
            if (err) throw err;
          });
        });

      });

      // fileArray.push({
      //   filename: file,
      //   link: shortFileName,
      //   title: parsed.metadata.title,
      //   date: parsed.metadata.date,
      //   image: parsed.metadata.image,
      //   categories: parsed.metadata.categories,
      //   tags: parsed.metadata.tags
      // });

    });

});

console.debug("MARKDOWN RENDER SCRIPT - COMPLETED\n");
