const readline = require('readline');
const employees = [
  { id: 'E101', name: 'Alice' },
  { id: 'E102', name: 'Bob' },
  { id: 'E103', name: 'Charlie' }
];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function displayMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  rl.question('Enter your choice: ', handleChoice);
}
function handleChoice(choice) {
  switch (choice) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees();
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
      rl.close();
      return;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
      break;
  }
}
function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter employee ID: ', (id) => {
      const newEmployee = { id, name };
      employees.push(newEmployee);
      console.log(`Employee ${name} (ID: ${id}) added successfully.`);
      displayMenu();
    });
  });
}
function listEmployees() {
  console.log('\nEmployee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. Name: ${emp.name}, ID: ${emp.id}`);
    });
  }
  displayMenu();
}
function removeEmployee() {
  rl.question('Enter employee ID to remove: ', (idToRemove) => {
    const initialLength = employees.length;
    const employeeIndex = employees.findIndex(emp => emp.id === idToRemove);
    if (employeeIndex !== -1) {
      const removedEmployee = employees.splice(employeeIndex, 1)[0];
      console.log(`Employee ${removedEmployee.name} (ID: ${removedEmployee.id}) removed successfully.`);
    } else {
      console.log(`Employee with ID ${idToRemove} not found.`);
    }
    displayMenu();
  });
}
displayMenu();