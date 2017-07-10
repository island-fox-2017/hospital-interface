const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const t = require('cli-table2') //t for table

var tListPatient = new t({
  head: ['ID', 'Name', 'Diagnosis']
})

var tPatient = new t({
  head: ['ID', 'Name', 'Diagnosis']
})

var tListEmployee = new t({
  head: ['Name', 'Position']
})

var tEmployee = new t({
  head: ['Name', 'Position', ]
})

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  login() {
    console.log("----------------------------------------------------------");
    console.log(`Selamat Datang di ${this.name}\n${this.location}`);
    console.log("----------------------------------------------------------");
    rl.question('USERNAME : ', (answer) => {
      if (this.checkUsername(answer)) {
        return this.validatePassword(answer)
      } else {
        console.log('Username doesn\'t exist!');
        return this.login()
      }
    })
  }

  checkUsername(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return true
      }
    }
  }

  checkPassword(password) {
    for (let i = 0; i < this.employees.length; i++) {
      if (password === this.employees[i].password) {
        return true
      }
    }
  }

  validatePassword(username) {
    rl.question('PASSWORD : ', (answer) => {
      if (this.checkPassword(answer)) {
        console.log("----------------------------------------------------------");
        console.log(`Welcome ${this.findName(username)}! You log in as ${this.findPosition(username)}`);
        console.log("----------------------------------------------------------");
        return this.displayMenu(username)
      } else {
        console.log('Password is incorrect. Please, Try again!');
        return this.login()
      }
    })
  }

  findName(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].username
      }
    }
  }

  findPosition(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].position
      }
    }
  }

  validateAdmin(username) {
    if (this.findPosition(username) === 'Administrator') {
      return true
    }
  }

  validateDoctorOrAdmin(username) {
    if (this.findPosition(username) === 'Doctor' || this.findPosition(username) === 'Administrator') {
      return true
    }
  }

  listPatients() {
    for (let i = 0; i < this.patients.length; i++) {
      tListPatient.push(
        [this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis]
      )
    }
    console.log(tListPatient.toString());
    tListPatient.length = 0;
  }

  viewRecords(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id) {
        tPatient.push(
          [this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis]
        )
        console.log(tPatient.toString());
      }
    }
    tPatient.length = 0;
  }

  addRecord(name, diagnosis) {
    let patient = new Patient('0' + (Number(this.patients[this.patients.length - 1].id) + 1).toString(), name, diagnosis)
    this.patients.push(patient)
    console.log('Patient has been succesfully added');
    console.log("----------------------------------------------------------");
  }

  removeRecord(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id) {
        this.patients.splice(i, 1)
        console.log('Patient has been succesfully deleted');
      }
    }
    console.log("----------------------------------------------------------");

  }

  listEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      tListEmployee.push(
        [this.employees[i].name, this.employees[i].position]
      )
    }
    console.log(tListEmployee.toString());
    tListEmployee.length = 0
  }

  viewEmployee(name) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name.toLowerCase() === name.toLowerCase()) {
        tEmployee.push(
          [this.employees[i].name, this.employees[i].position, this.employees[i].username, this.employees[i].password]
        )
        console.log(tEmployee.toString());
      }
    }
    tEmployee.length = 0
  }

  addEmployee(name, position, username, password) {
    let employee = new Employee(name, position, username, password)
    this.employees.push(employee)
    console.log('Employee has been successfully added');
    console.log("----------------------------------------------------------");
  }

  removedEmployee(name) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name === name) {
        this.employees.splice(i, 1)
        console.log('Employee has been successfully deleted');
      }
    }
    console.log("----------------------------------------------------------");
  }

  noAccess(username) {
    console.log('YOU DOESN\'T HAVE ACCESS RIGHT');
    console.log("----------------------------------------------------------");
    return this.displayMenu(username)
  }

  displayMenu(username) {
    console.log('Options : ');
    console.log('[1] List All Patients');
    console.log('[2] View Patient (Input: 2(space)Patient ID)');
    console.log('[3] Add Patient (Input: Patient Name(space) Patient Diagnosis)');
    console.log('[4] Remove Patient (Input: 4(space)Patient ID)');
    console.log('[5] List Employees');
    console.log('[6] View Employee (Input: Employee Name)');
    console.log('[7] Add Employee (Input: Employee Name(space)Position');
    console.log('[8] Remove Employee (Input: Employee Name)');
    console.log('[9] Log out');

    rl.question('Choose menu from the options below :', (line) => {
      if (line.trim() === '1') {
        if (this.validateDoctorOrAdmin(username)) {
          this.listPatients()
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '2') {
        if (this.validateDoctorOrAdmin(username)) {
          line = line.split(' ')
          this.viewRecords(line[1])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '3') {
        if (this.validateDoctorOrAdmin(username)) {
          line = line.split(' ')
          this.addRecord(line[1], line[2])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '4') {
        if (this.validateDoctorOrAdmin(username)) {
          line = line.split(' ')
          this.removedRecord(line[1])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '5') {
        if (this.validateAdmin(username)) {
          line.split(' ')
          this.listEmployees()
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '6') {
        if (this.validateAdmin(username)) {
          line = line.split(' ')
          this.viewEmployee(line[1])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '7') {
        if (this.validateAdmin(username)) {
          line = line.split(' ')
          this.addEmployee(line[1], line[2], line[3], line[4])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '8') {
        if (this.validateAdmin(username)) {
          line = line.split(' ')
          this.removedEmployee(line[1])
          return this.displayMenu(username)
        } else {
          this.noAccess(username)
        }
      } else if (line.trim()[0] === '9') {
        console.log('You have logged out successfully');
        return this.login()
      }
    })
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}


let patient1 = new Patient('01', 'Andy', 'tipus')
let patient2 = new Patient('02', 'Bianka', 'demam')
let patient3 = new Patient('03', 'Cherryl', 'sinusitis')

let employee1 = new Employee('Donnie', 'Doctor', 'donnie', 'don')
let employee2 = new Employee('Emiryan', 'Doctor', 'emiryan', 'emi')
let employee3 = new Employee('Farah', 'Administrator', 'farah', 'far')
let employee4 = new Employee('Ginanjar', 'Office Boy', 'ginanjar', 'gin')

console.log();
let hospital = new Hospital('Rumah Sakit Cepat Sembuh', 'Jl. Hainan Raya Nomor 1', [employee1, employee2, employee3, employee4], [patient1, patient2, patient3])
hospital.login()
