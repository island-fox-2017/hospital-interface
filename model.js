const Classes = require('./hospital');
const Hospital = Classes[0]
const Patient = Classes[1]
const Employee = Classes[2]

class Model {
  constructor() {
    this._data= new Hospital('Rumah Sakit ABC','Pondok Indah', this.dataEmployees(),this.dataPatients())
  }

  get data(){
    return this._data;
  }

  dataPatients(){
    let data=[]
    data.push(new Patient(1,'andi','alergi'));
    data.push(new Patient(2,'budi','sakit perut'));
    data.push(new Patient(3,'gani','encok'));
    return data
  }

  dataEmployees(){
    let data=[]
    // let a = new Employee('a', 'b', 'c','d');
    // console.log(a);
    data.push(new Employee('rusli','Dokter','rusli','123'));
    data.push(new Employee('abdul','Admin','abdul','123'));
    data.push(new Employee('gani','Office Boy','gani','123'));
    return data;
  }
}

module.exports = Model;

// let model = new Model()
// 
// console.log(model.data);
