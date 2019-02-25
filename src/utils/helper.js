/**
 * helper functions
 * 
 * @2019/02/23
 */

export const groupTutorials = edges => {
  // console.log(edges)
  let tutorialTitles = []
  let tutorialDict = {}
  let title
  edges.forEach(edge => {
    title = edge.node.frontmatter.tutorial
    if(!tutorialTitles.includes(title)) { // check exist
      tutorialTitles.push(title)
      tutorialDict[title] = [edge]
    }else{
      tutorialDict[title].splice(0, 0, edge) // insert to first
    }
  })

  let groups = []
  tutorialTitles.forEach(title => 
    groups.push({
      slug    : tutorialDict[title][0].node.fields.slug,
      date    : tutorialDict[title][0].node.frontmatter.date,
      cover   : tutorialDict[title][0].node.frontmatter.cover,
      tags    : tutorialDict[title][0].node.frontmatter.tags,
      tutori  : title, 
      sections: tutorialDict[title]
    }))

  return groups
}

/**
 * 
 * @param {*} element, the scroll container
 * @param {*} to, the scroll height
 * @param {*} duration, milliseconds
 */
export const scrollTo = (element, to, duration) => {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
  }, 10);
}
