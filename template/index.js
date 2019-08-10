const Mustache = require("mustache");

const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const slug = text => slugify(text).toLowerCase();
const getPostPath = text => path.join("src/posts", slug(text) + ".mdx");

console.log("Hi 🤖! I'll help you write a post");
inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "Enter it's title:"
    },
    {
      name: "description",
      type: "input",
      message:
        "Describe it but in an engaging way to people - please don't exceed 160 characters, this is for SEO purposes 😉. \n" +
        "More on https://www.seoclarity.net/resources/knowledgebase/write-perfect-meta-description-seo-17115/ \n"
    },
    {
      name: "author",
      type: "input",
      message: "Identify you, by putting your author id - see authors.yml:"
    },
    {
      name: "imageURL",
      type: "input",
      message:
        "Enter an image url, this is used when you share your post on Twitter or Facebook:"
    }
  ])
  .then(answers => {
    const format = require("date-fns/format");
    const view = {
      ...answers,
      date: format(new Date(), "yyyy-MM-dd"),
      tags: ["historia", "personajes del software", "desarrollo de software"]
    };

    const postPath = getPostPath(view.title);
    fs.writeFile(postPath, newPost(view), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(`Post created as a draft, at ${postPath}, start writing 😃`);
      console.log(
        `Remember to remove the "isPublic: false" to publish your post`
      );
      console.log(
        "Don't know mdx? You could guide yourself by seeing other .mdx files or see https://www.gatsbyjs.org/docs/mdx/markdown-syntax/"
      );
    });
  });

const newPost = view =>
  Mustache.render(
    `---
title: {{title}}
date: {{date}}
author: {{author}}
tags: [tag-1, tag-2]
{{#description}}
description: {{description}}
{{/description}}
{{#imageURL}}
image: {{imageURL}}
{{/imageURL}}
isPublic: false # this post is a draft, you can share it's link to 
# other people to review your post. Remove this property to publish it.
---

Your content in markdown but with the power of JSX. MDX!`,
    view
  );

// TODO:
// Validate title, description, author, imageURL
// Add tags
// Tags, description recommend based on analytics keyword
// Store author id
// Automatic author based on github profile
// Automatic date based on commit date
