import { rFile, wFile } from '../models/apiModel.js';

export async function getGrades(id, pr) {
  let jsonData = await rFile();
  console.log(typeof (jsonData))
  if (id == undefined) return jsonData;
  jsonData = jsonData.grades.find(item => item.id == id);
  if (jsonData == undefined) return `This {id} is either unregistered or has been deleted!`;
  if (pr == undefined) return jsonData;

  const extract = (obj, ...keys) => {
    const newObject = Object.assign({});
    Object.keys(obj).forEach((key) => {
      if (keys.includes(key)) {
        newObject[key] = obj[key];
        delete obj[key];
      };
    });
    return newObject;
  };

  const newData = extract(jsonData, pr);
  if (Object.keys(newData).length == 0) return `Invalid parameter!`; // Tratamento de erro caso o parâmetro digitado pelo usuário esteje inválido
  return newData;
}

export async function postGrades(body) {
  let jsonData = await rFile();
  body.timestamp = String(new Date());
  body.id = jsonData.nextId
  jsonData.grades.push(body)
  console.log(jsonData)
  jsonData.nextId++
  await wFile(jsonData)
  return body
}

export async function putGrades(body, id) { // NÃO FUNCIONANDO
  let jsonData = await rFile();
  body.timestamp = new Date();
  const objData = jsonData.grades.map(item => {
    if (item.id == id) {
      return {
        id: item.id,
        student: body.student,
        subject: body.subject,
        type: body.type,
        value: body.value,
        timestamp: body.timestamp
      }
    }
    else {
      return {
        id: item.id,
        student: item.student,
        subject: item.subject,
        type: item.type,
        value: item.value,
        timestamp: item.timestamp
      }
    }
  })
  await wFile(jsonData[0]);
  return body;
}