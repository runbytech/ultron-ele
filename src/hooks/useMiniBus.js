/**
 * a hook function to wrap minibus
 * @2019/05/24
 */
import { useState, useEffect } from 'react'
import * as minibus from '../utils/minibus'


export function useMiniBus(location) {
  useEffect(() => {
    minibus.dispatch(minibus.EVT_LOCATION_CHANGE, {path: location.pathname})
  })
}

export function lazyMiniBusForComp(location) {
  // lazy notfiy the header to update active menu @2019/05/23
  setTimeout(()=>{
    // console.log('lazy dispatch event..', new Date().getTime())
    minibus.dispatch(minibus.EVT_LOCATION_CHANGE, {path: location.pathname})
  }, 0)
}

export function lazyMiniBusForBrwsr(location) {
  // lazy notfiy the header to update active menu @2019/05/24
  setTimeout(()=>{
    // console.log('lazy dispatch event..', new Date().getTime())
    minibus.dispatch(minibus.EVT_LOCATION_CHANGE, {path: location.pathname})
  }, 100)
}