import { findByFilename } from './findByFilename.js'

const files = await findByFilename('./', 'index.js')
console.log(files)