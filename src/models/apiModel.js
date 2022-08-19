import { promises as fs } from 'fs';
const fileName = './grades.json'

export async function rFile() {
  let rawData = await fs.readFile(fileName);
  let data = JSON.parse(rawData);
  return data;
}

export async function wFile(file){
  await fs.writeFile(fileName, JSON.stringify(file, null, 2),  (err) => { if(err) throw err })
}

export async function aFile(dataToAppend){
  await fs.appendFile(fileName, JSON.stringify(dataToAppend, null, 2), (err) => { if(err) throw err })
}