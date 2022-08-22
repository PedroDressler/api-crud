import { rFile, wFile } from '../models/apiModel.js';

export async function getGrades(id, pr) {
  let jsonData = await rFile();
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

export async function postGrade(body) {
  let jsonData = await rFile();
  body.timestamp = String(new Date());
  body.id = jsonData.nextId;
  jsonData.grades.push(body);
  jsonData.nextId++;
  await wFile(jsonData);
  return body;
}

export async function putGrade(body, id) { 
  let jsonData = await rFile();
  if(id > jsonData.grades.length) return `Invalid {id}!`;
  body.timestamp = new Date();
  const dataGrades = jsonData.grades.map(item => {
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
  });
  jsonData.grades = dataGrades;
  await wFile(jsonData);
  return body;
}

export async function deleteGrade(id) {
  let jsonData = await rFile();
  jsonData.grades = jsonData.grades.filter(item => item.id != id);
  await wFile(jsonData);
  return `Student's grade nº${id} has been deleted successfully from the grades.json`;
}

export async function sumGrades(st, su) {
  let jsonData = await rFile();
  const student = jsonData.grades.filter(item => item.student.replace(/ /g, '') == st);
  console.log(student)
  if(subject != undefined) student = student.filter(item => item.type == su);
  console.log(student)
}