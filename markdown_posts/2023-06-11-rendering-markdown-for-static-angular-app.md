---
date: "2023-06-11"
title: Rendering Markdown to HTML for Use with Static Angular App
image: metal_blocks.png
categories: Devops
tags: devops, angular, html, markdown, static
---
##### (image generated with stable_diffusion.openvino)

# Rendering Markdown to HTML for Use with Static Angular App

## Premise

Angular is awesome for creating dynamic, beautiful websites but it sucks when it comes to SEO. The robots and crawlers which scan our websites for consumption by search engines won't render your page for you; for the most part, they expect plain, easily understood HTML. To make your Angular website more SEO friendly, you can prerender as much of it as possible. In my case, I'm using nguniversal to prerender my Angular site.

## Using Markdown documents to quickly add new content to your website

I write my blog posts as Markdown and then use the JS library "showdown" and its extensions to render the markdown into pretty HTML.
### The general workflow
1) Write your content in markdown<br/>
2) Prerender your Angular website<br/>
3) Using a post-build script, render the markdown into HTML<br/>
4) Copy the rendered HTML to the prerendering output folder<br/>
5) Update your website<br/>

## HTML rendering script
In this script, I'm using showdown to render the markdown to HTML, plus its "showdown-highlight" extension which enables syntax highlighting on code blocks.
### renderMarkdown.js
```javascript
const fs = require('fs');
const path = require('path');

const mdFilePath = '/path/to/md/files/';
const htmlPath = '/path/to/place/rendered/html/';

// List of files to ignore which may be hanging around your *.md files
const ignoredFiles = [
    'somefile_to_ignore.txt'
];

// Loop through the *.md files and process them
fs.readdir(mdFilePath, (err, files) => {
    if (err) console.error("Error reading md file", err);

    files.filter(file => !file.includes(ignoredFiles))

        .forEach(file => {

            var filesys = require('fs')
            console.log("Markdown file to render: " + mdFilePath + file);

            const contents = filesys.readFileSync(mdFilePath + file, 'utf8');
            const mdPathName = file.replace('.md', '');
            const htmlFile = htmlPath + mdPathName + "/rendered_md.html";

            console.log("htmlPath: " + htmlPath);
            console.log("mdPathName: " + mdPathName);
            console.log("Final HTML File: " + htmlFile + "\n");

            // Strip out the metadata
            const newContents = contents.replace(/^---[0-9a-zA-Z:"\s\S]*---$/m, "");

            // Create the path for the rendered html file
            try {
                console.log("Creating path: " + htmlPath + mdPathName);
                fs.mkdirSync(htmlPath + mdPathName, { recursive: true });
            } catch (err) {
                console.log(htmlPath + mdPathName + " " + err.message);
            }

            // Render the markdown into html
            const showdown = require('showdown');
            showdownHighlight = require("showdown-highlight");

            let converter = new showdown.Converter({
                extensions: [showdownHighlight({
                    pre: true
                    , auto_detection: true
                })]
            });
            let html = converter.makeHtml(newContents);

            // Write the rendered html to disk
            filesys.writeFileSync(htmlFile, html, { encoding: 'utf8', flag: "w+" }, function (err) {
                if (err) throw err;
            });
        });
});
```
<p>

#### I run something similar to the above script from a "build.sh" wrapper script
```bash
#!/bin/bash
set -ex

# Clean up and build/prerender your site
rm -rf dist
rm -rf .angular/cache/
ng run MyWebsite:prerender

node ./renderMarkdown.js
```
