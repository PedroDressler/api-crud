import {rFile, aFile, wFile} from '../models/apiModel.js';

export async function getGrades(id, pr){
  let jsonData = await rFile();
  const lengthId = jsonData.nextId - 1;
  if(id == undefined) return jsonData;
  jsonData = jsonData.grades.find(item => item.id == id);
  if(jsonData == undefined) return `This {id} is either unregistered or has been deleted! Please input an id below ${lengthId}`;
  if(pr == undefined) return jsonData;

  const extract = (obj, ...keys) => {
    const newObject = Object.assign({});
    Object.keys(obj).forEach((key) => {
       if(keys.includes(key)){
          newObject[key] = obj[key];
          delete obj[key];
       };
    });
    return newObject;
  };

  const newData = extract(jsonData, pr);
  if(Object.keys(newData).length == 0) return `Invalid parameter!`; // Tratamento de erro caso o parâmetro digitado pelo usuário esteje inválido
  return newData;
}

export async function postGrades(body){
  // let jsonData = await rFile();
  // body.timestamp = new Date();
  // body.id = jsonData.nextId
  // await aFile(body)
  // jsonData.nextId++
  // await wFile(jsonData)
  return body
}