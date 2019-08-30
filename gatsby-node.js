const path = require(`path`);
const get = require("lodash/get");
const kebabCase = require("lodash/kebabCase");
const uniq = require("lodash/uniq");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });

    createNodeField({
      node,
      name: "isPublic",
      value: "isPublic" in node.frontmatter ? node.frontmatter.isPublic : true
    });
  }
};

const getTags = posts => {
  const tags = posts.reduce((ac, edge) => {
    return get(edge, "node.frontmatter.tags")
      ? ac.concat(edge.node.frontmatter.tags)
      : ac;
  }, []);

  return uniq(tags);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              id
              parent {
                ... on File {
                  name
                  sourceInstanceName
                  relativePath
                }
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: `/${node.parent.sourceInstanceName}/${node.parent.name}`,
      component: path.resolve("./src/components/posts/template.js"),
      context: {
        id: node.id,
        workspacePath: `src/${node.parent.sourceInstanceName}/${node.parent.relativePath}`
      }
    });
  });

  const tags = getTags(posts);
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: path.resolve("./src/components/tags/template.js"),
      context: {
        tag
      }
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") }
    }
  });
};
