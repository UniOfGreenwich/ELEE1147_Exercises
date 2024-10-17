# Importing Modules

In this section we are looking at importing modules from global repository using `pip` and locally made libraries.

## Understanding Pip and Importing in Python

### What is `pip`?
`pip` is the package installer for Python. It allows you to install and manage additional libraries and dependencies that are not included in the Python standard library. To use `pip`, you typically run commands in the terminal.

### Installing Packages with `pip`
To install a Python package using `pip`, you can use the following command in your terminal or command prompt:
```bash
pip install <package_name>
```
For example, to install the `requests` library, you would run:
```bash
pip install requests
```
To install a specific version of a package, use `==` followed by the version number, like so:
```bash
pip install pandas==1.3.5
```

### How Importing Works in Python
When you use `import` in Python, the interpreter searches for the module in the following order:
1. **Current Working Directory**: It first checks if the module exists in the directory where the Python script is located.
2. **Standard Library**: Next, it checks if the module is part of Python's built-in standard library.
3. **Installed Packages**: Finally, it looks in the `site-packages` directory, where packages installed by `pip` are stored.

### Types of Imports
1. **Standard Imports**: Import the entire module. For example:
   ```python
   import math
   ```
2. **Selective Imports**: Import specific functions or classes from a module. For example:
   ```python
   from math import sqrt, pi
   ```
3. **Aliased Imports**: Create a shorthand name for a module or function. For example:
   ```python
   import pandas as pd
   ```

---------

## Exercise 1: Built-in Modules

**Instructions:**
1. Open a new Python file and name it `exercise1.py`.
2. Import the `math` module.
3. Use the `math.sqrt()` function to find the square root of 16.
4. Use `math.pi` to print the value of Pi.
5. Save and run the script.
6. <details>
   <summary>Solution:</summary>

    ```python
    import math

    # Finding square root
    print("Square root of 16:", math.sqrt(16))

    # Printing the value of Pi
    print("Value of Pi:", math.pi)
    ```

    </details>

---------

## Exercise 2: Using Aliases with Modules

**Instructions:**
1. Open a new Python file named `exercise2.py`.
2. Import the `datetime` module as `dt`.
3. Use `dt.datetime.now()` to print the current date and time.
4. Save and run the script.
5. <details>
   <summary>Solution:</summary>

    ```python
    import datetime as dt

    # Printing current date and time
    print("Current Date and Time:", dt.datetime.now())
    ```

    </details>

-----------

## Exercise 3: Installing and Using External Modules

**Instructions:**
1. Open a new Python file and name it `exercise3.py`.
2. Use `pip` to install the `requests` module by running the following command in your terminal or command prompt:
   ```
   pip install requests
   ```
3. In `exercise3.py`, import the `requests` module and use it to get data from a URL (for example, `https://api.github.com`). Print the status code of the response.
4. Save and run the script.
5. <details>
   <summary>Solution:</summary>

    ```python
    # Make sure you've run `pip install requests` in your terminal before running this code
    import requests

    response = requests.get("https://api.github.com")
    print("Status Code:", response.status_code)
    ```

    </details>

---------

## Exercise 4: Selective Imports and Installing Specific Versions

**Instructions:**
1. Install `pandas` and `matplotlib` libraries with specific versions.
   - In your terminal, run the following commands to install specific versions:
     ```
     pip install pandas==1.3.5
     pip install matplotlib==3.5.1
     ```
2. Open a new Python file named `exercise4.py`.
3. From `pandas`, import only `DataFrame` and `Series` as `df` and `ser`.
4. Print the installed versions of `pandas` and `matplotlib` to verify them.
5. Save and run the script.
6. <details>
   <summary>Solution:</summary>

    ```python
    from pandas import DataFrame as df, Series as ser
    import matplotlib

    # Verifying and printing versions
    print("Pandas version:", df.__module__.split('.')[0])
    print("Matplotlib version:", matplotlib.__version__)
    ```

    </details>

------

## Exercise 5: Basic Data Analysis with Pandas

**Instructions:**
1. Create a new Python file and name it `exercise5.py`.
2. Import `pandas` as `pd`.
3. Create a small DataFrame using the following data:
   ```
   data = {
       "Name": ["Aisha", "Luis", "Chen", "Amara"],
       "Age": [24, 27, 22, 32],
       "City": ["New York", "San Francisco", "Beijing", "Nairobi"]
   }
   ```
4. Print the DataFrame and display summary statistics using `.describe()`.
5. Save and run the script.
6. <details>
   <summary>Solution:</summary>

    ```python
    import pandas as pd

    data = {
        "Name": ["Aisha", "Luis", "Chen", "Amara"],
        "Age": [24, 27, 22, 32],
        "City": ["New York", "San Francisco", "Beijing", "Nairobi"]
    }

    df = pd.DataFrame(data)
    print("DataFrame:")
    print(df)

    print("\nSummary Statistics:")
    print(df.describe())
    ```

    </details>

------

## Exercise 6: Data Visualization with Matplotlib

**Instructions:**
1. Create a new Python file named `exercise6.py`.
2. Import `matplotlib.pyplot` as `plt`.
3. Use the following data to create a bar chart showing the ages of individuals:
   ```
   names = ["Aisha", "Luis", "Chen", "Amara"]
   ages = [24, 27, 22, 32]
   ```
4. Label the axes as "Names" and "Ages" and add a title "Ages of Individuals".
5. Display the plot using `plt.show()`.
6. Save and run the script.
7. <details>
   <summary>Solution:</summary>

    ```python
    import matplotlib.pyplot as plt

    names = ["Aisha", "Luis", "Chen", "Amara"]
    ages = [24, 27, 22, 32]

    plt.bar(names, ages)
    plt.xlabel("Names")
    plt.ylabel("Ages")
    plt.title("Ages of Individuals")
    plt.show()
    ```

    </details>

------

### Using a `requirements.txt` File
A `requirements.txt` file lists all the packages your project depends on, along with their versions. This file is helpful for sharing your project and ensuring others install the exact package versions you used.

To create a `requirements.txt` file with the installed packages and their versions, run:
```bash
pip freeze > requirements.txt
```

The command `pip freeze > requirements.txt` is used to generate a `requirements.txt` file listing all currently installed Python packages along with their versions. Here’s how it works:

- **`pip freeze`**:
   - This part of the command outputs a list of installed packages in your Python environment, with each package version pinned to the specific version currently installed.
   - For example, the output might look like this:
     ```
     pandas==1.3.5
     requests==2.26.0
     matplotlib==3.5.1
     ```
   - The `==` notation ensures that the exact versions are captured, which is crucial for creating a reproducible environment.

- **`>` (Redirect Operator)**:
   - The `>` symbol redirects the output of `pip freeze` to a file instead of displaying it in the terminal.
   - Here, we use `>` to create or overwrite a file called `requirements.txt` with the output from `pip freeze`.

- **Creating `requirements.txt`**:
   - The command `pip freeze > requirements.txt` will save all installed packages and their versions into `requirements.txt`.

### Why Use `requirements.txt`?

- **Reproducibility**: Using a `requirements.txt` file allows others to install the same package versions, ensuring the code runs the same way.
- **Easy Setup**: To install all packages listed in a `requirements.txt` file, simply use:
  ```bash
  pip install -r requirements.txt
  ```

- This will output a file listing all dependencies, which can then be installed with:

    ```bash
    pip install -r requirements.txt
    ```

### Exercise 7: Creating a `requirements.txt` File

**Instructions:**
1. Install the `requests` and `pandas` packages if you haven't already, using:
   ```bash
   pip install requests pandas==1.3.5
   ```
2. In your terminal, create a `requirements.txt` file with the following command:
   ```bash
   pip freeze > requirements.txt
   ```
3. Open the `requirements.txt` file to verify that `requests` and `pandas==1.3.5` are listed.

**Explanation:**
The `requirements.txt` file should now include `requests` and `pandas==1.3.5`, specifying that exact version. This file allows others to replicate your environment with compatible package versions.

-------------

### Exercise 8: Installing from a `requirements.txt` File

**Instructions:**
1. To simulate using the `requirements.txt` file in a new environment, you can uninstall an installed package, like so:
   ```bash
   pip uninstall requests
   ```
2. Use the `requirements.txt` file to reinstall the necessary packages by running:
   ```bash
   pip install -r requirements.txt
   ```
3. Verify the installation by running a script that imports `requests` and `pandas`, ensuring they are correctly installed.

4. <details>
   <summary>Solution (test script):</summary>

    ```python
    import requests
    import pandas as pd

    print("Requests and Pandas installed and working!")
    ```

    This setup ensures that anyone using your code can quickly set up a matching environment by using `pip install -r requirements.txt`.

  </details>

  ----


### Exercise 9: Creating a Data Science Program Using a Provided Dataset with a Requirements File

The following dataset includes 700 entries and 11 columns, covering various user behavior metrics such as "App Usage Time," "Screen On Time," "Battery Drain," "Data Usage," and demographic data ("Age" and "Gender"). 

> **Note:**
>> - Download the dataset here: 
>>    - [user_behavior_dataset.csv](./user_behavior_dataset.csv)
>> - Documentation for each package used:
>>    - pandas: [https://pandas.pydata.org/docs/](https://pandas.pydata.org/docs/)
>>    - numpy: [https://numpy.org/doc/](https://numpy.org/doc/)
>>    - matplotlib: [https://matplotlib.org/stable/index.html](https://matplotlib.org/stable/index.html)
>>    - seaborn: [https://seaborn.pydata.org/](https://seaborn.pydata.org/)

- We are going to load this dataset and analyze key metrics like "App Usage Time (min/day)" and "Screen On Time (hours/day)".
 - Group the data by "Operating System" and "User Behavior Class" to perform a comparative analysis.
- Visualize the distribution of "App Usage Time" by Batter Drain or behavior class using histograms or box plots.

In this exercise, you’ll work with a provided dataset and specify dependencies using a `requirements.txt` file for easy environment setup.

**Instructions:**
1. **Create a `requirements.txt` file**: Open your terminal in the project directory and use the following command to specify versions and create `requirements.txt`:
   ```
   echo "pandas==1.3.5" >> requirements.txt
   echo "numpy==2.1.0" >> requirements.txt
   echo "matplotlib==3.5.1" >> requirements.txt
   echo "seaborn==0.11.2" >> requirements.txt
   ```
2. **Install from `requirements.txt`**: Once created, install dependencies directly from `requirements.txt` by running:
   ```
   pip install -r requirements.txt
   ```
3. **Write the analysis program**: In a Python file (`exercise9.py`), write a program that:
   - Loads the dataset `user_behavior_dataset.csv`.
   - Displays a summary of the dataset and calculates statistics on "App Usage Time (min/day)" and "Screen On Time (hours/day)".
   - Compares "App Usage Time (min/day)" across "Gender" and visualizes the distribution using a box plot.

4. <details>
   <summary>Example Code</summary>


    ```python
    # Import necessary libraries for data analysis and visualization
    import pandas as pd  # For data manipulation
    import numpy as np  # For numerical operations
    import matplotlib.pyplot as plt  # For plotting
    import seaborn as sns  # For enhanced data visualization
    from matplotlib.offsetbox import OffsetImage, AnnotationBbox  # For annotations on plots (if needed)

    # Load the dataset
    data = pd.read_csv('./user_behavior_dataset.csv')

    # Display the first few rows of the dataset
    print(data.head())

    # Display the shape of the dataset (rows, columns)
    print("Dataset shape:", data.shape)

    # Show information about the dataset, including column types and non-null values
    data.info()

    # Display descriptive statistics for numeric columns
    print(data.describe())

    # Check for missing values in the dataset
    print("Missing values per column:\\n", data.isnull().sum())

    # Plot 1: Distribution of App Usage Time
    plt.figure(figsize=(10, 6))
    sns.histplot(data['App Usage Time (min/day)'], kde=True, color="blue")
    plt.title('Distribution of App Usage Time (min/day)')
    plt.xlabel('App Usage Time (min/day)')
    plt.ylabel('Frequency')

    # Plot 2: Battery Drain vs Data Usage by User Behavior Class
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='Battery Drain (mAh/day)', y='Data Usage (MB/day)', hue='User Behavior Class', data=data, palette='plasma')
    plt.title('Battery Drain vs Data Usage by User Behavior Class')
    plt.xlabel('Battery Drain (mAh/day)')
    plt.ylabel('Data Usage (MB/day)')
    plt.legend(title='User Behavior Class')

    # Plot 3: Distribution of Battery Drain for Android vs iOS
    plt.figure(figsize=(10, 6))
    sns.kdeplot(data=data, x='Battery Drain (mAh/day)', hue='Operating System', palette='coolwarm', fill=True)
    plt.title('Distribution of Battery Drain for Android vs iOS')
    plt.xlabel('Battery Drain (mAh/day)')
    plt.ylabel('Density')

    # Plot 4: Number of Apps Installed by User Behavior Class
    plt.figure(figsize=(10, 6))
    sns.boxplot(x='User Behavior Class', y='Number of Apps Installed', data=data, palette='Set2')
    plt.title('Number of Apps Installed by User Behavior Class')
    plt.xlabel('User Behavior Class')
    plt.ylabel('Number of Apps Installed')

    # Plot 5: Pairplot of selected behavioral metrics
    sns.pairplot(data[['App Usage Time (min/day)', 'Screen On Time (hours/day)', 'Battery Drain (mAh/day)', 'Data Usage (MB/day)', 'User Behavior Class']], hue='User Behavior Class', palette='husl')

    # Display all plots
    plt.show()
    ```

    </details>

5. <details>
   <summary>Example of running program:</summary>

    ![](./figures/py_data_example.gif)

    </details>