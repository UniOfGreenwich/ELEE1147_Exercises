
# Python Object-Oriented Programming (OOP)

## Technical Explanation of Python's Class System

### 1. Classes and Objects
In Python, a **class** is a blueprint for creating objects (instances).
- A **class** defines attributes (data) and methods (behavior) that its instances will have. 
- An **object** is an instance of a class that contains specific values for its attributes.

---

## Exercise Instructions: Creating and Running Files

Each exercise includes steps on saving the code in separate files, organizing code within `main()` functions, and running each file.

---

## Part 1: Basic Classes and Instances

### Exercise 1: Creating a Simple Class
1. **Create a Python file** named `animal.py`.
2. Define a class `Animal` with attributes: `name`, `species`, and `diet`.
3. Add an `__init__` method and a `describe()` method to describe the animal.

4. **Add a `main()` function** at the bottom to create an instance of `Animal` and call `describe()`.
5. **Run the file** by opening a terminal in the directory where `animal.py` is saved, and execute:
   ```bash
   python animal.py
   ```
6. <details>
   <summary>Solution Code for animal.py...</summary>

    ```python
    class Animal:
        def __init__(self, name, species, diet):
            self.name = name
            self.species = species
            self.diet = diet

        def describe(self):
            print(f"{self.name} is a {self.species} and is a {self.diet}.")

    def main():
        lion = Animal("Lion", "Panthera leo", "carnivore")
        lion.describe()

    if __name__ == "__main__":
        main()
    ```

    </details>

---

## Part 2: Creating a Module with Multiple Classes and Data Structures

### Exercise 2: Building an Animal Module
1. **Create a Python file** named `zoo_module.py`.
2. Define two classes, `Animal` and `Zoo`, within this file.

### Instructions:
1. In `zoo_module.py`, initialize `Zoo` with a `name` attribute and an empty list `animals`.
2. Write methods to **add an animal**, **list animals**, and **find an animal by name**.
3. Add a `main()` function at the bottom to demonstrate creating `Zoo` and `Animal` instances and calling the methods.
4. **Run the file** by opening a terminal and executing:
   ```bash
   python zoo_module.py
   ```
5. <details>
   <summary>Solution Code for zoo_module.py...</summary>

    ```python
    class Animal:
        def __init__(self, name, species, diet):
            self.name = name
            self.species = species
            self.diet = diet

        def describe(self):
            return f"{self.name} is a {self.species} and is a {self.diet}."

    class Zoo:
        def __init__(self, name):
            self.name = name
            self.animals = []

        def add_animal(self, animal):
            self.animals.append(animal)

        def list_animals(self):
            for animal in self.animals:
                print(animal.describe())

        def find_animal(self, name):
            for animal in self.animals:
                if animal.name == name:
                    print(animal.describe())
                    return animal
            print(f"{name} not found in the zoo.")

    def main():
        city_zoo = Zoo("City Zoo")
        lion = Animal("Lion", "Panthera leo", "carnivore")
        giraffe = Animal("Giraffe", "Giraffa", "herbivore")
        city_zoo.add_animal(lion)
        city_zoo.add_animal(giraffe)
        city_zoo.list_animals()
        city_zoo.find_animal("Lion")

    if __name__ == "__main__":
        main()
    ```

    </details>

---

## Part 3: Inheritance and Method Overriding

### Exercise 3: Specialized Animal Classes
1. **Create a Python file** called `specialized_animals.py`.
2. Define `Animal`, `Mammal`, and `Bird` classes in this file.

### Instructions:
1. In `specialized_animals.py`, initialize `Mammal` and `Bird` classes with their unique attributes (e.g., `can_swim`, `can_fly`).
2. Override the `describe()` method in both subclasses.
3. Write a `main()` function to demonstrate creating instances and calling `describe()` for both `Mammal` and `Bird`.
4. **Run the file** by executing:
   ```bash
   python specialized_animals.py
   ```
5. <details>
   <summary>Solution Code for specialized_animals.py...</summary>
   
    ```python
    class Animal:
        def __init__(self, name, species, diet):
            self.name = name
            self.species = species
            self.diet = diet

        def describe(self):
            print(f"{self.name} is a {self.species} and is a {self.diet}.")

    class Mammal(Animal):
        def __init__(self, name, species, diet, can_swim):
            super().__init__(name, species, diet)
            self.can_swim = can_swim

        def describe(self):
            swim_ability = "Yes" if self.can_swim else "No"
            print(f"{self.name} is a {self.species} and is a {self.diet}. Can it swim? {swim_ability}")

    class Bird(Animal):
        def __init__(self, name, species, diet, can_fly):
            super().__init__(name, species, diet)
            self.can_fly = can_fly

        def describe(self):
            fly_ability = "Yes" if self.can_fly else "No"
            print(f"{self.name} is a {self.species} and is a {self.diet}. Can it fly? {fly_ability}")

    def main():
        elephant = Mammal("Elephant", "Loxodonta", "herbivore", can_swim=False)
        eagle = Bird("Eagle", "Aquila", "carnivore", can_fly=True)
        elephant.describe()
        eagle.describe()

    if __name__ == "__main__":
        main()
    ```

    </details>

---
---

## Creating a University Course Management System

### Objective
Create a modularised system to manage university courses, instructors, and students. This exercise will help you build interconnected classes and organize them into modules.

---

### Instructions

1. **Create a new folder** called `university_management` to store your files for this project.

2. Inside this folder, **create three Python files**:
   - `course.py`: For the `Course` class
   - `student.py`: For the `Student` class
   - `instructor.py`: For the `Instructor` class

### Class Descriptions

- **Course Class** (in `course.py`)
  - **Attributes**:
    - `course_name`: Name of the course
    - `course_code`: Unique identifier for the course
    - `instructor`: Assigned instructor (use an instance of `Instructor`)
    - `students`: A list to hold instances of enrolled `Student` objects
  - **Methods**:
    - `add_student(student)`: Adds a `Student` instance to the course.
    - `list_students()`: Lists all students enrolled in the course.
    - `get_course_info()`: Returns course details including instructor name.

- **Student Class** (in `student.py`)
  - **Attributes**:
    - `student_name`: Name of the student
    - `student_id`: Unique identifier for the student
    - `courses`: A list to hold enrolled courses
  - **Methods**:
    - `enroll(course)`: Adds a `Course` instance to the student's course list.
    - `list_courses()`: Lists all courses the student is enrolled in.

- **Instructor Class** (in `instructor.py`)
  - **Attributes**:
    - `instructor_name`: Name of the instructor
    - `instructor_id`: Unique identifier for the instructor
    - `courses`: A list to hold assigned courses
  - **Methods**:
    - `assign_course(course)`: Adds a `Course` instance to the instructor's course list.
    - `list_courses()`: Lists all courses the instructor teaches.

### Example Usage
In the `university_management` folder, create a main script file (`main.py`) to test your classes and methods.

```python
from course import Course
from student import Student
from instructor import Instructor

def main():
    # Create instructor and course
    instructor = Instructor("Dr. Smith", "I123")
    course = Course("Computer Science 101", "CS101", instructor)

    # Assign course to instructor
    instructor.assign_course(course)

    # Create students and enroll them in the course
    student1 = Student("Alice", "S001")
    student2 = Student("Bob", "S002")
    course.add_student(student1)
    course.add_student(student2)

    # Enroll students in course
    student1.enroll(course)
    student2.enroll(course)

    # Display course info
    print(course.get_course_info())
    course.list_students()

    # Display courses for instructor and students
    instructor.list_courses()
    student1.list_courses()
    student2.list_courses()

if __name__ == "__main__":
    main()
```

### Running the Program
1. **Save each class in the specified files** (`course.py`, `student.py`, `instructor.py`) in the `university_management` folder.
2. **Run the main script** by navigating to the `university_management` folder and executing:
   ```bash
   python main.py
   ```

3.  <details>
    <summary>Solution Code</summary>

    - `course.py`
        ```python
        class Course:
            def __init__(self, course_name, course_code, instructor):
                self.course_name = course_name
                self.course_code = course_code
                self.instructor = instructor
                self.students = []

            def add_student(self, student):
                self.students.append(student)

            def list_students(self):
                print(f"Students in {self.course_name}:")
                for student in self.students:
                    print(f"- {student.student_name}")

            def get_course_info(self):
                return f"Course: {self.course_name} ({self.course_code}), Instructor: {self.instructor.instructor_name}"
        ```

    - `student.py`
        ```py
        class Student:
            def __init__(self, student_name, student_id):
                self.student_name = student_name
                self.student_id = student_id
                self.courses = []

            def enroll(self, course):
                self.courses.append(course)

            def list_courses(self):
                print(f"{self.student_name}'s enrolled courses:")
                for course in self.courses:
                    print(f"- {course.course_name}")
        ```

    - `instructor.py`

        ```py
        class Instructor:
            def __init__(self, instructor_name, instructor_id):
                self.instructor_name = instructor_name
                self.instructor_id = instructor_id
                self.courses = []

            def assign_course(self, course):
                self.courses.append(course)

            def list_courses(self):
                print(f"Courses taught by {self.instructor_name}:")
                for course in self.courses:
                    print(f"- {course.course_name}")
        ```

    </details>

---

This exercise demonstrates how to design interconnected classes in Python and organize them within modules for a modularized university management system.

