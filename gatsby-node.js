/**
 * Implement Gatsby's Node APIs in this file.
 * @2019/01/30
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')


// 1. create node first
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value,
    })
  }
}

// 2. then create pages by template & .md content
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        pages: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create site pages by .md/tplt.
    const pages = result.data.pages.edges;

    pages.forEach((page, index) => {
      createPage({
        path: page.node.fields.slug,
        component: path.resolve(
          // one on one mapping!
          `src/templates${String(page.node.fields.slug).slice(0, -1)}.js`
          // TODO, use templateKey in .md @2019/02/13
        ),
        // Data passed to context is available
        // in page queries as GraphQL variables.
        // also available in props.pageContext of component
        context: {
          slug: page.node.fields.slug,
        },
      })
    });

  })
}
