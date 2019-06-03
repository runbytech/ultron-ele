/**
 * helper functions
 * 
 * @2019/02/23
 */

export const reorderforCateHead = edges => {
  let ctgs = [] // for gallery use
  let tempCates = edges
  tempCates.map((cat,i) => {// find the head
    if(cat.node.frontmatter.ishead && !ctgs.length) ctgs.push(cat)
  })
  tempCates.map((cat,i) => {// find the other
    if(!cat.node.frontmatter.ishead) ctgs.push(cat)
  })
  return ctgs
}

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

// FROM: https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}