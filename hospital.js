const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const table = require("cli-table2");
var tableListPatient = new table({
  head : ["ID ", "Name", "Diagnosis"]
});
var tablePatient = new table({
  head : ["ID ", "Name", "Diagnosis"]
});
var tableListEmployee = new table({
  head : ["Name", "Position"]
});
var tableEmployee = new table({
  head : ["Name", "Position", "Username", "Password"]
});
class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  login() {
    console.log("============================================================");
    console.log(`Selamat Datang di ${this.name}\n${this.location}`);
    console.log("============================================================");
    rl.question("Please enter username : ", (answer) => {
      if (this.checkUsername(answer)) {
        return this.validatePassword(answer);
      } else {
        console.log("Username is not exist");
        return this.login();
      }
    })
  }

  validatePassword(username) {
    rl.question("Please enter password : ", (answer) => {
      if (this.checkPassword(answer)) {
        console.log("*************************************************************");
        console.log(`Welcome ${this.findName(username)}! You are logged in as ${this.findPosition(username)}`);
        console.log("*************************************************************");
        return this.displayMenu(username);
      } else {
        console.log("Password incorrect!");
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
    if (this.findPosition(username) === "Administrator") {
      return true;
    }
  }

  validateDoctorOrAdmin(username) {
    if (this.findPosition(username) === "Doctor" || this.findPosition(username) === "Administrator") {
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
    tableListPatient.length = 0;
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
    tablePatient.length = 0;
  }

  addRecord(name, diagnosis) {
    let patient = new Patient("0"+(Number(this.patients[this.patients.length-1].id)+1).toString(), name, diagnosis);
    this.patients.push(patient);
    console.log("Patient has been succesfully added !");
    console.log("============================================================");
  }

  removeRecord(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id) {
        this.patients.splice(i, 1);
        console.log("Patient has been succesfully removed !");
      }
    }
    console.log("============================================================");
  }

  listEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      tableListEmployee.push(
        [this.employees[i].name, this.employees[i].position]
      );
    }
    console.log(tableListEmployee.toString());
    tableListEmployee.length = 0
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
    tableEmployee.length = 0;
  }

  addEmployee(name, position, username, password) {
    let employee = new Employee(name, position, username, password);
    this.employees.push(employee);
    console.log("Employee has been successfully added !");
    console.log("============================================================");
  }

  removeEmployee(name) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name === name) {
        this.employees.splice(i, 1);
        console.log("Employee has been successfully removed !");
      }
    }
    console.log("============================================================");
  }

  noAccess(username) {
    console.log("You do not have access authorization");
    console.log("============================================================");
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

    rl.question("Choose from the options above :", (line) => {
      if (line.trim() === "1") {
        if (this.validateDoctorOrAdmin(username)) {
          this.listPatients();
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === "2") {
        if (this.validateDoctorOrAdmin(username)) {
          line = line.split(" ");
          this.viewRecords(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === "3") {
        if (this.validateDoctorOrAdmin(username)) {
          line = line.split(" ");
          this.addRecord(line[1], line[2]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === "4") {
        if (this.validateDoctorOrAdmin(username)) {
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
        console.log("You have logged out successfully");
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

//Insert default patients
let patient1 = new Patient("01", "Adith Widya Pradipta", "Sakit jiwa");
let patient2 = new Patient("02", "Ihsan Biantoro", "Kebotakan");
let patient3 = new Patient("03", "Efandis Yudiantoro", "Kelamin berubah");

//Insert default employees
let employee1 = new Employee("Fajar", "Doctor", "ahfa", "1234");
let employee2 = new Employee("Gani", "Doctor", "gani", "1234");
let employee3 = new Employee("Rahmat", "Administrator", "mamat", "1234");
let employee4 = new Employee("Guerero", "OB", "guerero", "1234");
console.log()
let hospital = new Hospital("Rumah Sakit Alexis", "Jl. Ahmad Yani No. 07", [employee1, employee2, employee3, employee4], [patient1, patient2, patient3]);
hospital.login();
