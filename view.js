const Classes = require('./hospital');

class View {
  constructor() {
  }

  //header interface
  header(){
    console.log(`\nSelamat Datang di Rumah Sakit ABC`)
    console.log('=====================================\n');

  }
  //end of header interface

  //Username and Password interface
  askUsername(){
    return 'Masukan username : ';
  }

  errorUsername(){
    console.log('username salah! silahkan coba lagi!')
  }

  askPassword(){
    return 'Masukan password : ';
  }

  errorPassword(){
    console.log('password salah! silahkan coba lagi!')
  }
  //end of username and password interface

  //Menu interface
  welcome(name,position){
    console.log(`Welcome,${name}. Your access level is: ${position}`);
  }
  menu(){
    console.log('\nWhat would you like to do?')
    console.log('options:')
    console.log('1. Display Employees')
    console.log('2. Add Employee')
    console.log('3. Remove Employee')
    console.log('4. Display Patiens')
    console.log('5. Add Patiens')
    console.log('6. Remove Patiens')
    console.log('7. Quit')

  }
  menuDoctor(){
    console.log('\nWhat would you like to do?')
    console.log('options:')
    console.log('1. Display Patiens')
    console.log('2. Add Patiens')
    console.log('3. Remove Patiens')
    console.log('4. Quit')
  }

  menuOb(){
    console.log('\nWhat would you like to do?')
    console.log('options:')
    console.log('1. Quit')
  }
  //end of Menu interface

  //show patients
  displayTable(type,table){

    if(type==='patiens'){
      console.log('\n\n============ PATIENTS ============')
      console.log(table.toString());
    }
    else{
      console.log('\n\n================ EMPLOYEES ================')
      console.log(table.toString());
    }
  }

}
module.exports = View;
