/**
 * Mini Bus
 * minimal event dispatcher used in components communication
 * alternative for redux in Gatsby
 * 
 * @2019/05/23
 */

 const callbacks = {
  //  eventname: listenersArray
 };

 export const EVT_LOCATION_CHANGE = 'LOCATION_CHANGE'
 export const EVT_POST_CLICK      = 'POST_CLICK'

 export const addEventListener = (event, listener) => {
   if(callbacks[event] && !callbacks[event].includes(listener)) 
    return callbacks[event].push(listener)

   callbacks[event] = []
   callbacks[event].push(listener)
 }

 export const dispatch = (event, obj) => {
   if(!callbacks[event]) return

   callbacks[event].forEach(listener => {
    listener(obj)
   });
 }

 export const removeEventListener = (event, listener) => {
  if(!callbacks[event]) return

  let index = callbacks[event].indexOf(listener)
  callbacks[event].splice(index, 1)
 }

 export const trace = () => console.log(callbacks)