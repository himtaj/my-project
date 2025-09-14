class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    displayInfo() {
      return `Name: ${this.name}, Age: ${this.age}`;
    }
  }
  
  class Student extends Person {
    constructor(name, age, grade) {
      super(name, age);
      this.grade = grade;
    }
    displayInfo() {
      return super.displayInfo() + `, Grade: ${this.grade}`;
    }
  }
  class Teacher extends Person {
    constructor(name, age, subject) {
      super(name, age);
      this.subject = subject;
    }
    displayInfo() {
      return super.displayInfo() + `, Subject: ${this.subject}`;
    }
  }
  const student1 = new Student("Alice", 20, "A");
  const teacher1 = new Teacher("Mr. John", 40, "Math");
  
  function showStudent() {
    document.getElementById("output").innerText =
      "Student Info: " + student1.displayInfo();
  }
  function showTeacher() {
    document.getElementById("output").innerText =
      "Teacher Info: " + teacher1.displayInfo();
  }