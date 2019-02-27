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
  const categoryTplt = path.resolve(`src/templates/category.js`)
  const tutorialTplt = path.resolve(`src/templates/tutorial.js`)
  const quizTplt     = path.resolve(`src/templates/quiz.js`)
  
  return graphql(
    `
      {
        pages: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
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

      const {slug} = page.node.fields

      // console.log(slug)

      if(/\/category\/[\w-]+\/$/.test(slug)){// create category by index.md
        // console.log('>>> create category index.md: ', slug)
        createPage({
          path: slug,
          component: categoryTplt,
          context: {slug}
        })
        return
      }

      // MUST:  placed BEFORE the tutorial section creation
      if(/\/category\/([\w-]+\/){2}test\//.test(slug)){// create quiz page
        const tutorialPath = slug.match(/\/category\/([\w-]+\/){2}/g)[0]
        // console.log('>>> create quiz page ...')
        createPage({
          path: slug,
          component: quizTplt,
          context: {slug, tutpath:tutorialPath}
        })
        return
      }

      if(/\/category\/([\w-]+\/){3}/.test(slug)){// create tutorial section
        const tutorialPath = slug.match(/\/category\/([\w-]+\/){2}/g)[0]
        const categoryPath = slug.match(/\/category\/([\w-]+\/){1}/g)[0]
        // console.log('>>> create tutorial section: ', tutorialPath)
        createPage({
          path: slug,
          component: tutorialTplt,
          context: {slug, tutpath:tutorialPath, catpath:categoryPath}
        })
        return
      }

      if(slug.includes('/categories/')) return // no need to generate categories page

      // Last: to generate page of navi bar menu!
      createPage({
        path: slug,
        component: path.resolve(
          // one on one mapping!
          `src/templates${String(slug).slice(0, -1)}.js`
        ),
        // Data passed to context is available
        // in page queries as GraphQL variables.
        // also available in props.pageContext of component
        context: {
          slug: slug,
        },
      })

    // end of pages loop
    });
  // end of graphql resolve callback
  });
// end of createPages
}
