/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// @2019/02/14
import './src/style/global.css'
// theme.module.css -> theme.css @2019/04/18
import './src/style/theme.css'

import { lazyMiniBusForComp, lazyMiniBusForBrwsr } from './src/hooks/useMiniBus'


export const onRouteUpdate = ({ location, prevLocation }) => {
  // lazyMiniBusForBrwsr(location)
  lazyMiniBusForComp(location)
}
