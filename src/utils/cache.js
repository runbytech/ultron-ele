/**
 * save some global data in client
 * 
 * @2019/02/23
 */

 const categoryMap = {
  //  category slug: {category name, cover image}
 }

 export const saveCategory = (path, cateName, coverImage) => {
  categoryMap[path] = {name: cateName, cover: coverImage}
 }

 export const getCategory = (path) => categoryMap[path]

 export const printCategories = () => console.log(categoryMap)