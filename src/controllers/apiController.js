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
  body.timestamp = new Date();
  body.id = jsonData.nextId;
  jsonData.grades.push(body);
  jsonData.nextId++;
  await wFile(jsonData);
  return body;
}

export async function putGrade(body, id) { 
  let jsonData = await rFile();
  if(id > jsonData.grades.length) return `Id {${id}} does not exists!`;
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

export async function sumGrades(id, sub) {
  const jsonData = await rFile();
  let student = getStudent(jsonData, id, sub);
  student = student.map(item => { return item.value }).reduce((accumulator, val) => { return accumulator + val; }, 0);
  return { total: student };
}

export async function modoGrades(id, sub) {
  const jsonData = await rFile();
  let student = getStudent(jsonData, id, sub);
  const size = student.length;
  student = student.map(item => { return item.value }).reduce((accumulator, val) => { return accumulator + val; }, 0);
  student /= size;
  return { media: student };
}

export async function ThreeBests(sub) {
  const jsonData = await rFile();
  let student = jsonData.grades.filter(item => item.subject == sub);
  student = student.sort((a,b) => b.value - a.value)
  student.splice(3, student.length - 3)
  student = student.map(item => { 
    return {
      id: item.id, name: item.student, grade: item.value 
    }
  });
  return { subject: sub, students: student }
}

function getStudent(data, id, sub) {
  const idStu = data.grades.find(item => item.id == id);
  let student = data.grades.filter(item => item.student == idStu.student);
  if(sub != undefined) student = student.filter(item => item.subject == sub);
  return student;
}
