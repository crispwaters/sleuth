import { faker } from '@faker-js/faker'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT_FOLDER = './test'

const coinFlip = () => Math.random() >= 0.5
const randomInt = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min

const generate = async(pathname, maxDepth) => {
  if (maxDepth <= 0) {
    await fs.writeFile(path.join(pathname, 'index.js'), '')
    return
  }

  const nChildren = randomInt(10 + maxDepth, maxDepth)
  for (let n=0; n<nChildren; n++) {
    if (coinFlip()) {
      const directory = faker.word.noun()
      const fullPath = path.join(pathname, directory)
      await fs.mkdir(fullPath)
      await generate(fullPath, maxDepth - 1)
    } else {
      const file = faker.system.commonFileName()
      await fs.writeFile(path.join(pathname, file), '')
    }
  }
}

try {
  await fs.access(ROOT_FOLDER)
  await fs.rm(ROOT_FOLDER, {recursive: true})
} finally {
  await fs.mkdir(ROOT_FOLDER)
  await generate(ROOT_FOLDER, 4)
}

