
# Python Object-Oriented Programming (OOP)


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

## Creating a University Module Management System

### Objective
Create a modularised system to manage university Modules, instructors, and students. This exercise will help you build interconnected classes and organize them into modules.

---

### Instructions

1. **Create a new folder** called `university_management` to store your files for this project.

2. Inside this folder, **create three Python files**:
   - `module.py`: For the `Module` class
   - `student.py`: For the `Student` class
   - `instructor.py`: For the `Instructor` class

### Class Descriptions

- **module Class** (in `module.py`)
  - **Attributes**:
    - `module_name`: Name of the module
    - `module_code`: Unique identifier for the module
    - `instructor`: Assigned instructor (use an instance of `Instructor`)
    - `students`: A list to hold instances of enrolled `Student` objects
  - **Methods**:
    - `add_student(student)`: Adds a `Student` instance to the module.
    - `list_students()`: Lists all students enrolled in the module.
    - `get_module_info()`: Returns module details including instructor name.

- **Student Class** (in `student.py`)
  - **Attributes**:
    - `student_name`: Name of the student
    - `student_id`: Unique identifier for the student
    - `Module`: A list to hold enrolled Module
  - **Methods**:
    - `enroll(module)`: Adds a `module` instance to the student's module list.
    - `list_Module()`: Lists all Module the student is enrolled in.

- **Instructor Class** (in `instructor.py`)
  - **Attributes**:
    - `instructor_name`: Name of the instructor
    - `instructor_id`: Unique identifier for the instructor
    - `Module`: A list to hold assigned Module
  - **Methods**:
    - `assign_module(module)`: Adds a `module` instance to the instructor's module list.
    - `list_Module()`: Lists all Module the instructor teaches.

### Example Usage
In the `university_management` folder, create a main script file (`main.py`) to test your classes and methods.

```python
from module import Module
from student import Student
from instructor import Instructor

def main():
    # Create instructor and module
    instructor = Instructor("Insert someone here", "I123")
    module = module("Programming For Engineers", "ELEE1147", instructor)

    # Assign module to instructor
    instructor.assign_module(module)

    # Create students and enroll them in the module
    student1 = Student("Insert a student name here", "S001")
    student2 = Student("Insert a student name here", "S002")
    module.add_student(student1)
    module.add_student(student2)

    # Enroll students in module
    student1.enroll(module)
    student2.enroll(module)

    # Display module info
    print(module.get_module_info())
    module.list_students()

    # Display Module for instructor and students
    instructor.list_Module()
    student1.list_Module()
    student2.list_Module()

if __name__ == "__main__":
    main()
```

### Running the Program
1. **Save each class in the specified files** (`module.py`, `student.py`, `instructor.py`) in the `university_management` folder.
2. **Run the main script** by navigating to the `university_management` folder and executing:
   ```bash
   python main.py
   ```

3.  <details>
    <summary>Solution Code</summary>

    - `module.py`
        ```python
        class module:
            def __init__(self, module_name, module_code, instructor):
                self.module_name = module_name
                self.module_code = module_code
                self.instructor = instructor
                self.students = []

            def add_student(self, student):
                self.students.append(student)

            def list_students(self):
                print(f"Students in {self.module_name}:")
                for student in self.students:
                    print(f"- {student.student_name}")

            def get_module_info(self):
                return f"module: {self.module_name} ({self.module_code}), Instructor: {self.instructor.instructor_name}"
        ```

    - `student.py`
        ```py
        class Student:
            def __init__(self, student_name, student_id):
                self.student_name = student_name
                self.student_id = student_id
                self.Module = []

            def enroll(self, module):
                self.Module.append(module)

            def list_Module(self):
                print(f"{self.student_name}'s enrolled Module:")
                for module in self.Module:
                    print(f"- {module.module_name}")
        ```

    - `instructor.py`

        ```py
        class Instructor:
            def __init__(self, instructor_name, instructor_id):
                self.instructor_name = instructor_name
                self.instructor_id = instructor_id
                self.Module = []

            def assign_module(self, module):
                self.Module.append(module)

            def list_Module(self):
                print(f"Module taught by {self.instructor_name}:")
                for module in self.Module:
                    print(f"- {module.module_name}")
        ```

    </details>

---
---

## OOP Approach to Analyzing User behaviour Data

In this exercise, you will create a program using Object-Oriented Programming (OOP) principles to analyse a dataset of user behaviour on mobile devices. The data is stored in a CSV file called `user_behaviour_dataset.csv`, which contains various attributes such as user ID, device model, operating system, app usage time, and user behaviour class.

You will:

1. **Read the data from the CSV file** -> [user_behavior_dataset.csv](./user_behavior_dataset.csv)
2. **Design appropriate classes and objects** to represent users and their behaviour.
3. **Implement methods to analyse the data**, such as finding the average app usage time or identifying trends in user behaviour.

### Dataset Description

The CSV file `user_behaviour_dataset.csv` contains the following columns:

- `User ID`: Unique identifier for the user.
- `Device Model`: Model of the user's device.
- `Operating System`: Operating system used by the user (Android or iOS).
- `App Usage Time (min/day)`: Average app usage time per day in minutes.
- `Screen On Time (hours/day)`: Average screen on time per day in hours.
- `Battery Drain (mAh/day)`: Daily battery usage in mAh.
- `Number of Apps Installed`: The total number of apps installed on the device.
- `Data Usage (MB/day)`: Daily data usage in MB.
- `Age`: Age of the user.
- `Gender`: Gender of the user (Male or Female).
- `User Behavior Class`: A class assigned to the user based on their behavior (1 to 5).

## Task Instructions

### Step 1: Define Classes

You need to create at least the following classes:

1. **User**:
    - This class represents an individual user.
    - Attributes: `user_id`, `device_model`, `operating_system`, `app_usage_time`, `screen_on_time`, `battery_drain`, `num_apps_installed`, `data_usage`, `age`, `gender`, `user_behavior_class`.
    - Methods:
        - `__str__()`: Return a string representation of the user.
        - `get_app_usage_time()`: Return the app usage time in minutes.
        - `get_battery_drain()`: Return the battery drain in mAh.
        - `get_user_behavior_class()`: Return the behavior class.

2. **Dataset**:
    - This class will manage the list of users and provide methods for analyzing the data.
    - Attributes: `users` (list of User objects).
    - Methods:
        - `add_user(user)`: Adds a user to the dataset.
        - `get_avg_app_usage_time()`: Calculate and return the average app usage time across all users.
        - `get_users_by_behavior_class(class_number)`: Return a list of users belonging to a specific behavior class.
        - `get_highest_battery_drain()`: Return the user with the highest battery drain.
        - `get_avg_screen_time_by_os()`: Calculate the average screen on time by operating system.

### Step 2: Reading the Data

You need to read the data from `user_behaviour_dataset.csv` and create `User` objects to populate the `Dataset` class. To read the CSV file, you can use Python's `csv` module.

Example:

```python
import csv

def read_data(file_path):
    users = []
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            user = User(
                user_id=row['User ID'],
                device_model=row['Device Model'],
                operating_system=row['Operating System'],
                app_usage_time=int(row['App Usage Time (min/day)']),
                screen_on_time=float(row['Screen On Time (hours/day)']),
                battery_drain=int(row['Battery Drain (mAh/day)']),
                num_apps_installed=int(row['Number of Apps Installed']),
                data_usage=int(row['Data Usage (MB/day)']),
                age=int(row['Age']),
                gender=row['Gender'],
                user_behavior_class=int(row['User Behavior Class'])
            )
            users.append(user)
    return users
```

### Step 3: Analyzing the Data

Once the data is loaded into the Dataset class, implement the following analysis tasks:

1. Average App Usage Time: Calculate the average app usage time across all users.
2. Behavior Class Distribution: Calculate how many users belong to each behavior class (1 to 5).
3. User with Highest Battery Drain: Find the user with the highest battery drain.
4. Average Screen On Time by OS: Calculate the average screen on time for Android and iOS users separately.

### Step 4: Test Your Program

After implementing the classes and methods, you should test your program by calling the various methods in the `Dataset` class. Print out the results of each analysis.

#### Example test:

```python
if __name__ == "__main__":
    # Read data from CSV
    users = read_data('user_behaviour_dataset.csv')

    # Create Dataset object
    dataset = Dataset(users)

    # analyse data
    print("Average App Usage Time (min/day):", dataset.get_avg_app_usage_time())
    print("Users by Behavior Class 4:", dataset.get_users_by_behavior_class(4))
    print("User with Highest Battery Drain:", dataset.get_highest_battery_drain())
    print("Average Screen On Time by OS:", dataset.get_avg_screen_time_by_os())
```

### Step 5: Extend the Program

Once you have completed the initial analysis, you can extend the program by adding additional features such as:

- Identifying the most common device models or operating systems.
- Visualising the data (e.g., plotting the average app usage time vs. age or gender).
- Adding a method to export the analysis results to a new CSV file.


### Solution

<details>
<summary>Code here... [115 lines]</summary>

```python
import csv
from collections import defaultdict

# Define the User class
class User:
    def __init__(self, user_id, device_model, operating_system, app_usage_time, screen_on_time,
                 battery_drain, num_apps_installed, data_usage, age, gender, user_behavior_class):
        self.user_id = user_id
        self.device_model = device_model
        self.operating_system = operating_system
        self.app_usage_time = app_usage_time
        self.screen_on_time = screen_on_time
        self.battery_drain = battery_drain
        self.num_apps_installed = num_apps_installed
        self.data_usage = data_usage
        self.age = age
        self.gender = gender
        self.user_behavior_class = user_behavior_class

    def __str__(self):
        return f"User ID: {self.user_id}, Device: {self.device_model}, OS: {self.operating_system}, " \
               f"App Usage: {self.app_usage_time} min/day, Screen Time: {self.screen_on_time} hrs/day, " \
               f"Battery Drain: {self.battery_drain} mAh/day, Apps Installed: {self.num_apps_installed}, " \
               f"Data Usage: {self.data_usage} MB/day, Age: {self.age}, Gender: {self.gender}, " \
               f"Behavior Class: {self.user_behavior_class}"

    def get_app_usage_time(self):
        return self.app_usage_time

    def get_battery_drain(self):
        return self.battery_drain

    def get_user_behavior_class(self):
        return self.user_behavior_class

    def get_screen_on_time(self):
        return self.screen_on_time


# Define the Dataset class
class Dataset:
    def __init__(self, users):
        self.users = users

    def add_user(self, user):
        self.users.append(user)

    def get_avg_app_usage_time(self):
        total_usage = sum(user.get_app_usage_time() for user in self.users)
        return total_usage / len(self.users) if self.users else 0

    def get_users_by_behavior_class(self, class_number):
        return [user for user in self.users if user.get_user_behavior_class() == class_number]

    def get_highest_battery_drain(self):
        return max(self.users, key=lambda user: user.get_battery_drain())

    def get_avg_screen_time_by_os(self):
        os_data = defaultdict(lambda: {'total_screen_time': 0, 'user_count': 0})
        for user in self.users:
            os_data[user.operating_system]['total_screen_time'] += user.get_screen_on_time()
            os_data[user.operating_system]['user_count'] += 1
        avg_screen_time = {os: data['total_screen_time'] / data['user_count'] for os, data in os_data.items()}
        return avg_screen_time


# Function to read the data from the CSV file
def read_data(file_path):
    users = []
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            user = User(
                user_id=row['User ID'],
                device_model=row['Device Model'],
                operating_system=row['Operating System'],
                app_usage_time=int(row['App Usage Time (min/day)']),
                screen_on_time=float(row['Screen On Time (hours/day)']),
                battery_drain=int(row['Battery Drain (mAh/day)']),
                num_apps_installed=int(row['Number of Apps Installed']),
                data_usage=int(row['Data Usage (MB/day)']),
                age=int(row['Age']),
                gender=row['Gender'],
                user_behavior_class=int(row['User Behavior Class'])
            )
            users.append(user)
    return users


# Main function to test the program
if __name__ == "__main__":
    # Read data from CSV
    users = read_data('user_behaviour_dataset.csv')

    # Create Dataset object
    dataset = Dataset(users)

    # Analyze data
    print("Average App Usage Time (min/day):", dataset.get_avg_app_usage_time())
    
    # Example: Get users by behavior class 4
    behavior_class = 4
    users_in_class_4 = dataset.get_users_by_behavior_class(behavior_class)
    print(f"\nUsers in Behavior Class {behavior_class}:")
    for user in users_in_class_4:
        print(user)

    # Example: User with highest battery drain
    highest_battery_user = dataset.get_highest_battery_drain()
    print(f"\nUser with Highest Battery Drain: {highest_battery_user}")

    # Example: Average screen on time by OS
    avg_screen_time_by_os = dataset.get_avg_screen_time_by_os()
    print("\nAverage Screen On Time by Operating System:")
    for os, avg_time in avg_screen_time_by_os.items():
        print(f"{os}: {avg_time:.2f} hours/day")
```

#### Explanation of the Code

1. `User` Class:

    - The `User` class holds individual user data with attributes such as user_id, device_model, app_usage_time, and more.
    - It has methods like `get_app_usage_time()`, `get_battery_drain()`, and `get_user_behavior_class()` to retrieve relevant data.

2. `Dataset` Class:

    - The `Dataset` class manages a collection of User objects.
    - It contains methods like:
        - `get_avg_app_usage_time()`: Calculates the average app usage time across all users.
        - `get_users_by_behavior_class()`: Filters users based on their behavior class.
        - `get_highest_battery_drain()`: Identifies the user with the highest battery drain.
        - `get_avg_screen_time_by_os()`: Computes the average screen on time by operating system.

3. `read_data` Function:

    - This function reads the CSV file and converts each row into a `User` object.
    - It returns a list of `User` objects.

4. Main Program:

    - The `main` block reads the dataset from the CSV file and performs various analyses, such as calculating the average app usage time, filtering users by behavior class, finding the user with the highest battery drain, and calculating average screen time by OS.

</details>

