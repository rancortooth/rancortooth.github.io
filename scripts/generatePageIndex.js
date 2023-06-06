console.debug("STARTING POST GENERATION SCRIPT...")

const fs = require('fs');
const path = require('path');
const metaParser = require('markdown-yaml-metadata-parser');
const pathToPosts = path.join(__dirname, '../markdown_posts');
const pathToCompiledPosts = path.join(__dirname, '../src/_assets/posts');
const ignoredFiles = [
  'gitignore',
  'pages.json',
  'posts.json',
  'portfolio.json',
  // 'template_html.html'
];

// create compiled posts directory
fs.mkdirSync(pathToCompiledPosts, {
  recursive: true
}, error => {
  if (error) {
    console.error("An error occurred creating the posts directory", error);
  }
});

// Delete routesFile.txt and generate an updated one
try {
  fs.unlinkSync("routesFile.txt");
} catch (error) {
  console.error(error);
}
fs.copyFile("base_routesFile.txt", "routesFile.txt", fs.constants.COPYFILE_EXCL, (err) => {
  if (err) throw (err);
});
fs.appendFile('routesFile.txt', '\n', function (err) {
  if (err) throw err;
});


// Delete sitemap.xml and generate an updated one
try {
  fs.unlinkSync("src/sitemap.xml");
} catch (error) {
  console.error(error);
}
fs.copyFile("src/base_sitemap.xml.txt", "src/sitemap.xml", fs.constants.COPYFILE_EXCL, (err) => {
  if (err) throw err;
});
fs.appendFile('src/sitemap.xml', '\n', function (err) {
  if (err) throw err;
});


// compile the posts
fs.readdir(pathToPosts, (err, files) => {
  if (err) console.error("Error reading posts", err);

  let fileArray = [];

  files.filter(file => !file.includes(ignoredFiles))
    .forEach(file => {
      const contents = fs.readFileSync(pathToPosts + '/' + file, 'utf8');
      const parsed = metaParser(contents);

      // fs.writeFile(`${pathToCompiledPosts}/${file}`, parsed.content, 'utf8', err => {
      //   if (err) {
      //     console.error("Error writing file contents", error);
      //   }
      // });

      const shortFileName = file.replace('.md', '');

      fileArray.push({
        filename: file,
        link: shortFileName,
        title: parsed.metadata.title,
        date: parsed.metadata.date,
        image: parsed.metadata.image,
        categories: parsed.metadata.categories,
        tags: parsed.metadata.tags
      });

      // Append a route for this post to routesFile.txt
      fs.appendFile('routesFile.txt', '/blog/post/' + shortFileName + '\n', function (err) {
        if (err) throw err;
      });

      // Append an entry to sitemap.xml
      const today = new Date();
      const date = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, '0') + "-" + today.getDate().toString().padStart(2, '0');
      fs.appendFile('src/sitemap.xml', '\
      <url>\n\
        <loc> https://starshipfluke.com/blog/post/' + shortFileName + '</loc>\n\
        <lastmod>' + date + '</lastmod>\n\
        <changefreq>monthly</changefreq>\n\
        <priority>1</priority>\n\
      </url >\n', function (err) {
        if (err) throw err;
      });

    });

  // Close sitemap.xml
  fs.appendFile('src/sitemap.xml', '</urlset>\n', function (err) {
    if (err) throw err;
  });

  // // Print routesFile.txt to the console for validation
  // fs.readFile('routesFile.txt', 'utf8', (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // });

  const data = {
    Posts: fileArray
  }

  fs.writeFile(`${pathToCompiledPosts}/posts.json`, JSON.stringify(data), 'utf8', err => {
    if (err) console.log(err);
  });
});

console.debug("POST GENERATION SCRIPT - COMPLETED")
