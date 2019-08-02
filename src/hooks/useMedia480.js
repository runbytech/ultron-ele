/**
 * Only query media width 480 to check screen size
 * @2019/05/30
 */
import { useState, useEffect } from 'react'

 export default function uesMedia480() {

  const con = "(max-width: 480px)"
  const mq = (typeof window != 'undefined')?window.matchMedia(con):null
  const [mobile, setMobile] = useState(mq?mq.matches:false)
  const handler = x => setMobile(x.matches)

  useEffect(()=>{
    if(mq) mq.addListener(handler)

    return () => mq.removeListener(handler)
  })

  return mobile

 }

 export const useMedia4804Comp = () => {

  const con = "(max-width: 480px)"
  const mq = (typeof window != 'undefined')?window.matchMedia(con):null
  return mq?mq.matches:false

 }