/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// @2019/02/14
import './src/style/global.css'
// theme.module.css -> theme.css @2019/04/18
import './src/style/theme.css'
// add mobile screen support @2019/05/27
import './src/style/responsive.css'

import { lazyMiniBusForComp,  } from './src/hooks/useMiniBus'


export const onRouteUpdate = ({ location, prevLocation }) => {
  lazyMiniBusForComp(location)
}
