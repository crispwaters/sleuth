import fs from 'node:fs/promises'
import path from 'node:path'
/**
 * Finds all the files with the provided filename
 * @param {string} directory full path to the directory to check
 * @param {string} filename name of target file (e.g., index.js)
 * @returns {string[]} Full path to all matching files
 */
export const findByFilename = async (directory, filename) => {
  const files = await fs.readdir(directory)
  const results = []
  for (const file of files) {
    const fullpath = path.join(directory, file)
    const stats = await fs.stat(fullpath)
    if (stats.isDirectory()) {
      if (file === 'node_modules') continue
      results.push(...await findByFilename(fullpath, filename))
    } else {
      if (file === filename) results.push(fullpath)
    }
  }
  return results
}