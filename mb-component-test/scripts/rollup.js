#!/usr/bin/env node
/* eslint-disable no-console */

const { buildWithRollup } = require('./rollup-options')
const { fromRoot, copyFileSync, getDirNameList } = require('./function')

const main = async () => {
  const componentNameList = getDirNameList(fromRoot('components/')).filter(name => name !== 'icon')
  console.log(`  - get ${componentNameList.length} component: ${componentNameList.join(', ')}`)
  for (const componentName of componentNameList) {
    await buildWithRollup({ componentName, componentNameList })
    console.log(`  - built component: ${componentName}`)
  }
  // copyFileSync(fromRoot('components'), fromRoot('lib'))
  console.log('  - built index file')
}

main().catch((error) => console.error(error))
