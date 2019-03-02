/**
 * save some global data in client
 * 
 * @2019/02/23
 */

const userInfoMap  = {
  // userName: '',
  // userEmail: ''
}
// save the learning track by user
const userLearnTracks  = [
  // {tutorial_slug:'', title:'', category:'', date:'', status:''}, ...
]
// quiz records
const userQuizMap = [
  // {slug: '', user: '', ans: ['a','b','c','d']}, ...
]


// ------ category process ------
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
  localStorage.setItem('ueUser', JSON.stringify(userInfoMap))
 }

 export const getUser = () => {
  // retrieve cache first...
  if(Object.keys(userInfoMap).length) return userInfoMap

   // retrive local storage
   let user = localStorage.getItem('ueUser')
   if(user) {
     let ujson = JSON.parse(user)
     userInfoMap.userName = ujson.userName
     userInfoMap.userEmail= ujson.userEmail

     return userInfoMap
   }

   return null
 }


//  ------------ learning track recording ---------------
const initLearningTrack = () => {
  if(userLearnTracks.length) return // only init once
  let saved = JSON.parse(localStorage.getItem('userLearnTracks'))
  if(saved) saved.map(o => userLearnTracks.push(o))
}
// status: start, unlock, quiz, complete
// need to remove repetition?
export const saveLearningTrack = (slug, title, category, date, status) => {
  initLearningTrack() // init first
  userLearnTracks.splice(0, 0, {slug, title, category, date, status}) // insert to first
  localStorage.setItem('userLearnTracks', JSON.stringify(userLearnTracks))
}

export const getLearningTrack = () => JSON.parse(localStorage.getItem('userLearnTracks'))


// ------------- quiz submition records -----------------
const initUserQuiz = () => {
  if(userQuizMap.length) return // only init once
  let saved = JSON.parse(localStorage.getItem('userQuizMap'))
  if(saved) saved.map(o => userQuizMap.push(o))
}

export const saveUserQuiz = (slug, user, ans) => {
  initUserQuiz() // init first
  userQuizMap.splice(0, 0, {slug, user, ans})
  localStorage.setItem('userQuizMap', JSON.stringify(userQuizMap))
}

export const getUserQuizs = (userName) => {
  let searched = []
  let saved = JSON.parse(localStorage.getItem('userQuizMap'))
  saved.map(q => {
    if(q.user==userName) searched.splice(0, 0, q)
  })
  return searched
}

export const getQuiz = (userName, slug) => {
  let searched
  let saved = JSON.parse(localStorage.getItem('userQuizMap'))
  saved.map(q => {
    if(q.user==userName && q.slug==slug) searched = q
  })
  return searched
}
