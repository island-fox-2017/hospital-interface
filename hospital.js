'use strict'

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const table = require('cli-table2');
var colors = require('./node_modules/colors/safe');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

let tableListPatient = new table({
  head : ['ID', 'Name', 'Diagnosis']
});
let tablePatient = new table({
  head : ['ID', 'Name', 'Diagnosis']
});

let tableListEmployee = new table({
  head : ['Name', 'Position']
});
let tableEmployee = new table({
  head : ['Name', 'Position', 'Username', 'Password']
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  //  ------------------- Login & Validation ----------------
  login() {
    console.log('\x1B[2J\x1B[0f');
    // console.log('\x1B[2J');
    console.log('--------------------------------------------------------------');
    console.log(`Selamat Datang di\n${this.name}\n${this.location}`);
    console.log('--------------------------------------------------------------');
    console.log(`------ ${colors.info('Silahkan login, atau tekan Ctrl + C untuk keluar')} ------`);
    console.log('--------------------------------------------------------------');

    rl.question('Username:  ', answer => {
      if (this.checkUsername(answer)) {
        return this.validatePassword(answer);
      } else {
        console.log('Username not exist');
        return this.login();
      }
    })
  }

  checkUsername(username) {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      if (username === this.employees[i].username) {
        return true;
      }
    }
  }

  checkPassword(password) {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      if (password === this.employees[i].password) {
        return true;
      }
    }
  }

  validatePassword(username) {
    rl.question('Password:  ', answer => {
      if(this.checkPassword(answer)) {
        console.log('\x1B[2J\x1B[0f');
        console.log('--------------------------------------------------------------');
        console.log(colors.debug(`Selamat datang kembali ${this.findName(username)}.\nAnda login sebagai ${this.findPosition(username)}.`));
        console.log('--------------------------------------------------------------');
         return this.displayMenu(username);
      } else {
        console.log(colors.error('Password anda salah.'));
        return this.login();
      }
    })
  }

  findName(username) {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].username;
      }
    }
  }

  findPosition(username) {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      if (username === this.employees[i].username) {
        return this.employees[i].position;
      }
    }
  }

  validateAdmin(username) {
    if (this.findPosition(username) === 'Administrator') {
      return true;
    }
  }

  validateDokterOrAdmin(username) {
    if (this.findPosition(username) === 'Administrator' || this.findPosition(username) === 'Dokter') {
      return true;
    }
  }
  //  -------------------- end of Login ---------------------

  //  ----------------------- Patients -----------------------
  listPatients() {
    for (var i = 0; i <= this.patients.length - 1; i++) {
      let patId = this.patients[i].id;
      let patName = this.patients[i].name;
      let patDiag = this.patients[i].diagnosis;
      tableListPatient.push([patId, patName, patDiag]);
    }

    console.log(tableListPatient.toString());
    tableListPatient.length = 0;
  }

  viewRecords(id) {
    let ada = false;
    for (var i = 0; i <= this.patients.length - 1; i++) {
      let patId = this.patients[i].id;
      let patName = this.patients[i].name;
      let patDiag = this.patients[i].diagnosis;
      if (patId === id) {
        ada = true;
        tablePatient.push([patId, patName, patDiag]);
      }
    }

    if (ada) {
      console.log(tablePatient.toString());
    } else {
      console.log('pasien tidak ditemukan');
    }

    tablePatient.length = 0;
  }

  addRecord(name, diagnosis) {
    let patient = new Patient('0'+(Number(this.patients[this.patients.length - 1].id)+1).toString(), name, diagnosis);
    this.patients.push(patient);
    console.log('Berhasil menambah pasien baru.');
  }

  removeRecord(id) {
    for (var i = 0; i <= this.patients.length - 1; i++) {
      if (this.patients[i].id === id) {
        this.patients.splice(i, 1);
        console.log('Catatan pasien berhasil dihapus');
      } else {
        console.log('Data tidak ditemukan');
        break;
      }
    }
  }
  //  ------------------- end of Patients -------------------

  //  ---------------------- Employees ----------------------
  listEmployees() {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      let empName = this.employees[i].name;
      let empPost = this.employees[i].position
      tableListEmployee.push([empName, empPost])
    }
    console.log(tableListEmployee.toString());
    tableListEmployee.length = 0;
  }

  viewEmployee(name) {
    let ada = false;
    for (var i = 0; i <= this.employees.length - 1; i++) {
      let empName = this.employees[i].name;
      let empPost = this.employees[i].position;
      let empUsr = this.employees[i].username;
      let empPass = this.employees[i].password;
      if (empName === name) {
        ada = true;
        tableEmployee.push([empName, empPost, empUsr, empPass]);
      }
    }
    if (ada) {
      console.log(tableEmployee.toString());
    } else {
      console.log('karyawan tidak ditemukan');
    }
    tableEmployee.length = 0;
  }

  addEmployee(name, position, username, password) {
    let employee = new Employee(name, position, username, password);
    this.employees.push(employee);
    console.log('Berhasil menambah karyawan baru.');
  }

  removeEmployee(name) {
    for (var i = 0; i <= this.employees.length - 1; i++) {
      if (this.employees[i].name === name) {
        this.employees.splice(i, 1);
        console.log('Catatan karyawan berhasil dihapus.');
      } else {
        console.log('Data tidak ditemukan');
        break;
      }
    }
  }

  noAccess(username) {
    console.log('\x1B[2J\x1B[0f');
    console.log(colors.error('Anda tidak memiliki wewenang akses.'));
    return this.displayMenu(username);
  }
  //  ------------------ end of Employees -------------------

  //  ------------------------ Menus ------------------------
  displayMenu(username) {
    console.log(`Pilihan :
    [1] Lihat daftar catatan seluruh pasien
    [2] Lihat catatan pasien
    [3] Tambah catatan pasien
    [4] Hapus catatan pasien
    [5] Lihat daftar catatan seluruh karyawan
    [6] Lihat catatan karyawan
    [7] Tambah catatan karyawan
    [8] Hapus catatan karyawan
    [9] Logout
    [0] Exit
      `);

    rl.question(colors.warn('Silahkan masukkan pilihan anda :'), (line) => {
      if (line.trim() === '1') {
        if (this.validateDokterOrAdmin(username)) {
          this.listPatients();
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '2') {
        if (this.validateDokterOrAdmin(username)) {
          line = line.split(' ');
          this.viewRecords(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '3') {
        if (this.validateDokterOrAdmin(username)) {
          line = line.split(' ');
          this.addRecord(line[1], line[2]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '4') {
        if (this.validateDokterOrAdmin(username)) {
          line = line.split(' ');
          this.removeRecord(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '5') {
        if (this.validateAdmin(username)) {
          line = line.split(' ');
          this.listEmployees();
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '6') {
        if (this.validateAdmin(username)) {
          line = line.split(' ');
          this.viewEmployee(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '7') {
        if (this.validateAdmin(username)) {
          line = line.split(' ');
          this.addEmployee(line[1], line[2], line[3], line[4]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '8') {
        if (this.validateAdmin(username)) {
          line = line.split(' ');
          this.removeEmployee(line[1]);
          return this.displayMenu(username);
        } else {
          this.noAccess(username);
        }
      } else if (line.trim()[0] === '9') {
        console.log('You have logged out successfully');
        return this.login();
      } else if (line.trim()[0] === '0') {
        rl.close();
      }
    }); // ---------- end of rl.question
  }
  //  -------------------- end of Menus ---------------------
} // ------------ end of class Hospital ------------

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}// ------------ end of class Patient ------------

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
  }
}// ------------ end of class Employee ------------

let azis = new Patient('01', 'Azis', 'Gangguan pembicaraan');
let nunung = new Patient('02', 'Nunung', 'Obesitas');
let bolot = new Patient('03', 'Bolot', 'Gangguan pendengaran');

let mimin = new Employee('Admin', 'Administrator', 'mimin', 'abc123');
let momod = new Employee('Moderator', 'Administrator', 'momod', '321cba');

let sule = new Employee('Sule', 'Dokter', 'sule', 'prikitiw');

let kacung = new Employee('Kacung', 'OB', 'kacung', 'kcg123');

let hospital = new Hospital('Hospital Korban Lelaki', 'Jl. Antah-berantah No. 77', [mimin, momod, sule, kacung], [azis, nunung, bolot]);
hospital.login();
