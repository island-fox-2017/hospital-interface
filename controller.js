const Model = require('./model')
const View = require('./view')

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:'>>'
});
rl.setMaxListeners(0);

var Table = require('cli-table');

class Controller {
  constructor() {
    this._model = new Model()
    this._view = new View()
    this.data = this;
    this.employees=this._model.data.employees
    // console.log(this.employees);
    this.patients=this._model.data.patients
    // console.log(this.patients);
  }

  get model(){
    return this._model;
  }

  get view(){
    return this._view;
  }

  findUsername(username){
    let dataEmployees= this._model.data.employees
    for(let i=0; i<dataEmployees.length; i++){
      if(dataEmployees[i].username===username)
      {
        return true;
      }
    }
    return false
  }

  findPassword(username,password){
    let dataEmployees= this._model.data.employees
    for(let i=0; i<dataEmployees.length; i++){
      if(dataEmployees[i].username===username && dataEmployees[i].password===password)
      {
        return true;
      }
    }
    return false
  }

  findPosition(username,password){
    let dataEmployees = this._model.data.employees
    for(let i=0; i<dataEmployees.length; i++){
      if(dataEmployees[i].username===username && dataEmployees[i].password===password)
        return dataEmployees[i].position;
    }
  }


  init(){
      this._view.header();
      // console.log(this._model.data.patients);
      rl.question(this._view.askUsername(),(answer) => {
        if(this.findUsername(answer)){
          this.password(answer);
        }
        else{
          this._view.errorUsername();
          this.init();
        }
      });
  }

  password(username){

      rl.question(this._view.askPassword(),(answer) => {
          if(this.findPassword(username,answer))
          {
            this.main(username,answer);
          }
          else{
            this._view.errorPassword();
            this.password(username);
          }
      });
  }


  main(username,password){

    let position=this.findPosition(username,password)
    this._view.header();
    this._view.welcome(username,position);
    if(position==='Admin'){
      this._view.menu();
      this.mainProcess();
    }
    else if(position ==='Dokter'){
      this._view.menuDoctor();
      this.doctorProcess();
    }
    else {
      this._view.menuOb();
      this.obProcess();
    }

  }

  mainProcess(){
    let type='admin'

    rl.question('>>',(input) => {

      switch (input) {

        case '1': this._view.menu();
                  this.showEmployees();
                  this.mainProcess();
                  break;

        case '2': this._view.menu();
                  this.showEmployees();
                  this.addEmployees()
                  this.mainProcess();
                  break;

        case '3': this._view.menu();
                  this.showEmployees();
                  this.deleteEmployees();
                  break;

        case '4': this._view.menu();
                  this.showPatients();
                  this.mainProcess();
                  break;

        case '5': this._view.menu();
                  this.showPatients();
                  this.addPatients(type)
                  break;

        case '6': this._view.menu();
                  this.showPatients();
                  this.deletePatients(type)
                  this.mainProcess();
                  break;

        case '7': this.init();
                  break;

        default:  this._view.menu();
                  console.log('\nWrong command!\n');
                  this.mainProcess();
                  break;;
      }
    });
  }

  doctorProcess(){
    let type ='doctor'
    rl.question('>>',(input) => {

      switch (input) {

        case '1': this._view.menuDoctor();
                  this.showPatients();
                  this.doctorProcess();
                  break;

        case '2': this._view.menuDoctor();
                  this.showPatients();
                  this.addPatients(type);
                  this.doctorProcess();
                  break;

        case '3': this._view.menuDoctor();
                  this.showPatients();
                  this.deletePatients(type)
                  this.doctorProcess();
                  break;

        case '4': this.init();
                  break;

        default:  this._view.menuDoctor();
                  console.log('\nWrong command!\n');
                  this.doctorProcess();
                  break;
      }
    });
  }

  obProcess(){

    rl.question('>>',(input) => {

      switch (input) {

        case '1': this.init();
                  break;

        default:  this._view.menuOb();
                  console.log('\nWrong command!\n');
                  this.obProcess();
                  break;;
      }
    });
  }

  showEmployees(){
    let dataEmployees =this.employees;
    let table = new Table({
        head: ['No', 'Nama','Position' ],
        colWidths: [5, 20,15]
    });

    for(let i=0; i<dataEmployees.length;i++){
      table.push([i+1,dataEmployees[i].name,dataEmployees[i].position])
    }

    this._view.displayTable('employees',table);
  }

  showPatients(){
    let dataPatients =this.patients;
    let table = new Table({
        head: ['No', 'Nama','Diagnosis' ],
        colWidths: [5, 10,15]
    });

    for(let i=0; i<dataPatients.length;i++){
      table.push([i+1,dataPatients[i].name,dataPatients[i].diagnosis])
    }

    this._view.displayTable('patiens',table);
  }

  addEmployees(){
    rl.question('>> Name: ', (input) => {
      if (input.length === 0) {
        console.log(`Do not WhiteSpace!`);
        this.addEmployees();
      }
      else if(input===" "){
        console.log(`Do not WhiteSpace!`);
        this.addEmployees();
      }else{
        rl.question('>> Position: ', (input2) => {
          if (input.length === 0) {
            console.log(`Do not WhiteSpace!`);
            
            this.addEmployees();
          }
          else if(input2===" "){
            console.log(`Do not WhiteSpace!`);
            this.addEmployees();
          }else{
            rl.question('>> Username: ', (input3) => {
              if (input.length === 0) {
                console.log(`Do not WhiteSpace!`);
                this.addEmployees();
              }
              else if(input3===" "){
                console.log(`Do not WhiteSpace!`);
                this.addEmployees();
              }
              else{
                rl.question('>> Password: ', (input4) => {
                  if (input.length === 0) {
                    console.log(`Do not WhiteSpace!`);
                    this.addEmployees();
                  }
                  else if(input4===" "){
                    console.log(`Do not WhiteSpace!`);
                    this.addEmployees();
                  }else{
                        this.employees.push({name:input,position:input2,username:input3,password:input4})
                        this.showEmployees();
                        console.log('data ditambahkan!\n');
                        this.mainProcess();
                        
                      
                    }
                });
              }
            });
          }
        });
      }
    });
  }

  addPatients(type){
    let data = this.data;
    rl.question('>> Id: ', (input) => {
      if (input.length === 0) {
        console.log(`not yet input id`);
        this.addPatients(type);
      }else if(input < 1){
        console.log(`id must > 0 number`);
        this.addPatients(type);
      }
      else if (input <= data.patients.length && input > 0){
        console.log(`id already used`);
        this.addPatients(type);
      }
      else if(input===" "){
        console.log(`Do not WhiteSpace!`);
        this.addPatients(type);
      }else{
        rl.question('>> Name: ', (input2) => {
          if (input.length === 0) {
            console.log(`Do not WhiteSpace!`);
            this.addPatients(type);
          }
          else if(input2===" "){
            console.log(`Do not WhiteSpace!`);
            this.addPatients(type);
          }else{
            rl.question('>> Diagnosis: ', (input3) => {
              if (input.length === 0) {
                console.log(`Do not WhiteSpace!`);
                this.addPatients(type);
              }
              else if(input3===" "){
                console.log(`Do not WhiteSpace!`);
                this.addPatients(type);
              }else{
                data.patients.push({id:+input,name:input2,diagnosis:input3})
                this.showPatients();
                console.log('data ditambahkan!\n');
                if(type=='admin')
                  this.mainProcess();
                else this.doctorProcess();
              }
            });
          }
        });
      }
    });
  }

  deleteEmployees(){
    console.log(this.employees)
    console.log('\ndelete Data:')
    rl.question('>> Name: ',(input) => {

      for(let i=0; i< this.employees.length;i++)
        if(input===this.employees[i].name)
          this.employees.splice(i,1);
      this.showEmployees();
      this.mainProcess();
    });

  }

  deletePatients(type){
    console.log('\ndelete Data:')
    rl.question('>> Id: ',(input) => {
      for(let i=0; i< this.patients.length;i++){
        if(+input===+this.patients[i].id){
          this.patients.splice(i,1);
          this.showPatients();
    }else if (this.patients.length ===1){
        this.patients.splice(i,1);
        this.showPatients();
    }else if(+input!==+this.patients[i].id){
      console.log(`id pasien tidak ditemukan`);
      this.showPatients();
    }else if(!this.patients[this.patients.length-1]){
      console.log(`tidak ada pasien`);
      this.showPatients();
    }
      if(type='admin')
        this.mainProcess();
      else this.doctorProcess();
    }
    });

  }

}
const run = new Controller();

run.init();
run.mainProcess();

module.exports = Controller;
