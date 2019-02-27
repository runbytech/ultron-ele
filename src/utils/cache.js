/**
 * save some global data in client
 * 
 * @2019/02/23
 */

const userInfoMap  = {
  // userName: '',
  // userEmail: ''
}

const userQuizMap  = {
  // tutorial: {} 
}

 const categoryMap = {
  //  category slug: {category name, cover image}
 }

 export const saveCategory = (path, cateName, coverImage) => {
    categoryMap[path] = {name: cateName, cover: coverImage}
 }

 export const getCategory = (path) => categoryMap[path]

 export const printCategories = () => console.log(categoryMap)

//  ------ user info process ------------------------------
 export const saveUser = (userName, userEmail) => {
  userInfoMap.userName = userName
  userInfoMap.userEmail= userEmail
  localStorage.setItem('user', JSON.stringify(userInfoMap))
 }

 export const getUser = () => {
  // retrieve cache first...
  if(Object.keys(userInfoMap).length) return userInfoMap

   // retrive local storage
   let user = localStorage.getItem('user')
   if(user) {
     let ujson = JSON.parse(user)
     userInfoMap.userName = ujson.userName
     userInfoMap.userEmail= ujson.userEmail

     return userInfoMap
   }

   return null
 }