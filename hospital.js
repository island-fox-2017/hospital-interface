const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const table = require("cli-table2");

var tableListPatient = new table({
  head : ["ID ", "Nama           ", "Diagnosis              "]
});

var tablePatient = new table({
  head : ["ID ", "Nama           ", "Diagnosis              "]
});

var tableListEmployee = new table({
  head : ["Nama           ", "Position              "]
});

var tableEmployee = new table({
  head : ["Nama           ", "Position              ", "Username          ", "Password        "]
})


class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
  
  login() {
    console.log("============================================================");
    console.log(`Selamat Datang di ${this.name}\n${this.location}`);
    console.log("============================================================");
    rl.question("Masukkan Username anda : ", (answer) => {
      if (this.checkUsername(answer)) {
        this.validatePassword(answer);
      } else {
        console.log("Username anda belum terdaftar di Database!");
        return this.login();
      }
    })
  }
  
  validatePassword(username) {
    rl.question("Masukkan Password anda : ", (answer) => {
      if (this.checkPassword(answer)) {
        console.log("*************************************************************");
        console.log(`Welcome ${this.findName(username)}`);
        console.log(`Anda login sebagai ${this.findPosition(username)}`);
        console.log("*************************************************************");
        return this.displayMenu(username);
      } else {
        console.log("Password Salah!!");
        return this.login();
      }
    })
  }
  
  checkUsername(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return true;
      }
    }
  }
  
  checkPassword(password) {
    for (let i = 0; i < this.employees.length; i++) {
      if (password === this.employees[i].password) {
        return true;
      }
    }
  }
  
  findName(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].username;
      }
    }
  }
  
  findPosition(username) {
    for (let i = 0; i < this.employees.length; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].position;
      }
    }
  }
  
  validateAdmin(username) {
    if (this.findPosition(username) === "admin") {
      return true;
    }    
  }
  
  validateDoctor(username) {
    if (this.findPosition(username) === "doctor") {
      return true;
    }
  }
  
  listPatients() {
    for (let i = 0; i < this.patients.length; i++) {
      tableListPatient.push(
        [this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis]
      );
    }
    console.log(tableListPatient.toString());
    // tableListPatient.length = 0;
  }
  
  viewRecords(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id) {
        tablePatient.push(
          [this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis]
        );
        console.log(tablePatient.toString());
      }
    }
    // tablePatient.length = 0;
  }
  
  addRecord(name, diagnosis) {
    let patient = new Patient("0"+(Number(this.patients[this.patients.length-1].id)+1).toString(), name, diagnosis);
    this.patients.push(patient);
    console.log(`Anda telah berhasil menambah patient !`);
    console.log("-------------");
  }
  
  removeRecord(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].length === id) {
        this.patients.splice(i, 1);
        console.log(`Anda telah berhasil menghapus patient !`);
        console.log("-------------");
      }
    }
  }
  
  listEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      tableListEmployee.push(
        [this.employees[i].name, this.employees[i].position]
      );
    }
    console.log(tableListEmployee.toString());
    // tableListEmployee.length = 0;
  }
  
  viewEmployee(name) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name.toLowerCase() === name.toLowerCase()) {
        tableEmployee.push(
          [this.employees[i].name, this.employees[i].position, this.employees[i].username, this.employees[i].password]
        );
        console.log(tableEmployee.toString());
      }
    }
    // tableEmployee.length = 0;
  }
  
  addEmployee(name, position, username, password) {
    let employee = new Employee(name, position, username, password);
    this.employees.push(employee);
    console.log("Anda telah berhasil menambah employee !");
    console.log("-------------");
  }
  
  removeEmployee(name) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name === name) {
        this.employees.splice(i, 1);
        console.log("Anda telah berhasil menghapus employee !");
        console.log("-------------");
      }
    }
  }
  
  noAccess(username) {
    // if (this.findPosition(username) !== "admin" || this.findPosition(username) !== "doctor") {
    //   console.log("Anda tidak mempunyai akses ke Menu");
    //   return this.displayMenu(username);
    // }
    console.log("ANDA TIDAK ADA AKSES KE MENU TERSEBUT");
    console.log("-------------");;
    return this.displayMenu(username);
  }
  
  displayMenu(username) {
    console.log("Options : ");
    console.log("[1] List All Patients");
    console.log("[2] View Patients (Patient ID)");
    console.log("[3] Add Patient (Patient Name) (Patient Diagnosis)");
    console.log("[4] Remove Patient (Patient ID)");
    console.log("[5] List Employees");
    console.log("[6] View Employee (Employee Name)");
    console.log("[7] Add Employee (Employee Name) (Position) (Username) (Password)");
    console.log("[8] Remove Employee (Employee Name)");
    console.log("[9] Logout");
    
    rl.question("Choose from options below :", (line) => {
      console.log("-------------");
      if (line.trim() === "1") {
        if (this.validateAdmin(username) || this.validateDoctor(username)) {
          this.listPatients();
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "2") {
        if (this.validateAdmin(username) || this.validateDoctor(username)) {
          line = line.split(" ");
          this.viewRecords(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
          
      } else if (line.trim()[0] === "3") {
        if (this.validateAdmin(username) || this.validateDoctor(username)) {
          line = line.split(" ");
          this.addRecord(line[1], line[2]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "4") {
        if (this.validateAdmin(username) || this.validateDoctor(username)) {
          line = line.split(" ");
          this.removeRecord(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "5") {
        if (this.validateAdmin(username)) {
          line = line.split(" ");
          this.listEmployees();
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "6") {
        if (this.validateAdmin(username)) {
          line = line.split(" ");
          this.viewEmployee(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "7") {
        if (this.validateAdmin(username)) {
          line = line.split(" ");
          this.addEmployee(line[1], line[2], line[3], line[4]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "8") {
        if (this.validateAdmin(username)) {
          line = line.split(" ");
          this.removeEmployee(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
        
      } else if (line.trim()[0] === "9") {
        console.log("Anda telah berhasil logged out");
        return this.login();
      }
      
    });
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

let bastian = new Patient("01", "Bastian", "Gatal-gatal");
let rahardian = new Patient("02", "Rahardian", "Influenza");
let saok = new Patient("03", "Saok", "Pegal Linu");

let fathin = new Employee("Fathin", "doctor", "fathin", "kbi");
let fathan = new Employee("Fathan", "doctor", "fathan", "abi");
let etty = new Employee("Etty", "admin", "etty", "hil");

let edi = new Employee("Edi", "OB", "edi", "edi");

let hospital = new Hospital("Rumah Sakit Sakit Dahulu Bersenang senang Kemudian", "Jl. Ahmad Yani No. 07", [fathin, fathan, etty, edi], [bastian, rahardian, saok]);
hospital.login();
