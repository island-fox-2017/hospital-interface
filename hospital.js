const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
})

class Hospital {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.patientData = [];
    this.User = [];
    this.employeeData = [];
  }

  addPatient(data){
    if(data !== undefined){
      this.patientData.push(data)
    } else {
      rl.question('\nTo Add Patient, input: [ID],[Name],[Diagnosis] ex: 1,Donal,masuk angin \n'
      ,(input) =>{
        let newData = input.split(',')
        this.addPatient(new Patient(newData[0],newData[1],newData[2]))
        this.clear()
        console.log(`\nNew Patient Data Added!\n\nId:${newData[0]}\nName:${newData[1]}\nDiagnosis:${newData[2]}\n`)
        this.back()
      })
      }
    }

  addEmployee(data){
    if(data !== undefined){
      this.employeeData.push(data)
    }
    else{
      rl.question('\nPlease input: [Name],[Position],[Username],[Password] ex: John,Office boy,john,john \n'
      ,(input) =>{
        let newData = input.split(',')
        this.addEmployee(new Employee(newData[0],newData[1],newData[2],newData[3]))
        this.clear()
        console.log(`\nNew Employee Data Added!\n\nName:${newData[0]}\nPosition:${newData[1]}\nUsername:${newData[2]}\nPassword:${newData[3]}`)
        this.back()
        })
      }
    }

  welcome(user){
    this.clear()
    console.log(`Welcome ${user[0]}, your Access Level is ${user[2]}`)
    this.menu(user[2])
  }

  menu(user){
    console.log('=============== Please Input Menu NUMBER ===============')
    switch(user){
      case 'Admin' : console.log(' 1.] Logout\n 2.] List_Patients\n 3.] View_Records [patient id]\n 4.] Add_Patient\n 5.] Remove_Patient [patient id]\n 6.] Add_Employee\n 7.] List_Employees\n 8.] Remove Employee [employee_name]');break
      case 'Doctor': console.log(' 1.] Logout\n 2.] List_Patients\n 3.] View_Records [patient id]\n 4.] Add_Patient\n 5.] Remove_Patient [patient id]');break
      case 'Patient': console.log(' 1.] Logout\n 2.] List_Patients\n 3.] View_Records [patient id]');break
      case 'Office Boy': console.log(' 1.] Logout');break
      default: console.log('1.] Logout');break
    }
    this.command()
  }

  command(){
    rl.question('\nYour Input Number: ', (input)=>{
      switch(input.split(' ')[0]){
        case '1': this.User = [];this.clear();this.play();break
        case '2': this.listPatients();this.back();break
        case '3': this.viewRecords(input.split(' ')[1]);break
        case '4': this.addPatient();break
        case '5': this.removePatient(input.split(' ')[1]);break
        case '6': this.addEmployee();break
        case '7': this.listEmployees(); this.back();break
        case '8': this.removeEmployee(input.split(' ')[1]);break
      }
    })
  }

  viewRecords(patientId) {
      this.patientData.forEach((data) => {
        if(data.id.toString() === patientId){
          console.log(`Patient Records, Name : ${data.name}\n--------------------------------------`);
            console.log(`ID: ${data.id}\nName: ${data.name}\nDiagnosis: ${data.diagnosis}`);
          this.back()
        }
      })
  }

  removePatient(id){
    for(let i = 0; i < this.patientData.length;i++){
      if(this.patientData[i].id === id){
        console.log(`${this.patientData[i].name} removed!`)
        this.patientData.splice(i,1)
        this.back()
        }
      }
    for(let j = 0; j < this.patientData.length;j++){
      if(this.patientData[j].id !== id){
        console.log(`Id not match!`)
        this.back()
      }
    }
  }

  removeEmployee(name){
    for(let i =0; i < this.employeeData.length;i++){
      if(this.employeeData[i].name === name){
        console.log(`${this.employeeData[i].name} is being let go..`)
        this.employeeData.splice(i,1)
        this.back()
      }
    }
    for(let j = 0; j < this.employeeData.length;j++){
      if(this.employeeData[j].name !== name){
        console.log(`There is no Employee name ${name}`)
        this.back()
      }
    }
  }

  back(){
    rl.question('\nPress ENTER to go back', (input)=>{
      if(!input){
        this.welcome(this.User)
      }
      else{
        this.back()
      }
    })
  }

  listPatients(){
      this.clear()
      console.log('Patient List\n-------------------------\nID | Patient Name | Diagnosis')
      let id = 0
      this.patientData.forEach((data)=>{
        id++
        console.log(`${id} | ${data.name} | ${data.diagnosis}`)
      })
  }

  listEmployees(){
    this.clear()
    console.log('Employee List\n=========================\nNO | Employee Name | Position')
    let count = 0
    this.employeeData.forEach((data)=>{
    count++
    console.log(`${count}  | ${data.name} | ${data.position}`)
    })
  }

  play(){
    console.log('\n'+`============ Welcome to ${this.name} Hospital ============\n ${this.location}`)
    console.log('===========================================================');
    rl.question('\nLogin as: \n[1]Patient \n[2]Employee \nYour Input: ', (input)=>{
      if(input === '1'){
        this.patientLogin()
      }
      if(input === '2'){
        this.employeeLogin()
      }
      else{
        this.clear()
        this.play()
      }
    })
  }

  patientLogin(){
  this.clear()
  rl.question('Dear Patient, please enter your name: \n', (input)=>{
      this.patientData.forEach((data)=>{
        if(data.name === input){
          this.User.push(input,' ','Patient')
          this.welcome(this.User)
        }
        else{
          console.log(`There is no patient named ${input}`)
          this.play()
        }
      })
    })
  }

  employeeLogin(){
    this.clear()
    rl.question('Enter Your Username:\n', (input)=>{
        this.employeeData.forEach((data)=>{
          if(data.username === input){
            this.User.push(data.name,data.password,data.position)
            this.password()
            }
          })
          if(!this.User){
            this.clear()
            console.log('Username not Match')
            this.employeeLogin()
          }
        })
      }

  password(){
    this.clear()
    rl.question('Enter Password:\n', (input)=>{
        if(input === this.User[1]){
          this.welcome(this.User)
        }
        else{
          console.log('Password not Match')
          this.password()
        }
    })
  }

  clear() {
    console.log("\x1B[2J")
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
  }
}

let hospital = new Hospital('Harapan Jaya','\nJl. Pakubuwono Kav 79-81 \nJakarta Selatan\nDKI JAKARTA\n')
hospital.addPatient(new Patient(1,'raja','sakit gigi'))

hospital.addEmployee(new Employee('Bayu','Admin','bayu','bayu'))
hospital.addEmployee(new Employee('Charice','Doctor','charice','charice'))
hospital.addEmployee(new Employee('Daniel','Office Boy','daniel','daniel'))
hospital.play()
