# Lab 8: Streams

You have been using the `stdio.h` for nearly every lab, and will use it for nearly every program you will ever create in C.

**St**andar**d** **I**nput and **O**utput enables the program to take inputs and produce outputs. These two categories are broken numerically as: 
    
- Standard **In** is numerically defined as `0`

| Function  | Description       |
|-----------|-------------------|
| `getc()`    | Get character     |
| `getchar()` | Get character     |
| `gets()`    | Get string        |
| `fscanf()`  | Formatted input   |
| `scanf()`   | Formatted input   |
| `ungetc()`  | Unget character   |


- Standard **Out** is numerically dedined as `1`

| Function  | Description       |
|-----------|-------------------|
| `putc()`    | Put character     |
| `putchar()` | Put character     |
| `puts()`    | Put string        |
| `fprintf()` | Formatted output  |
| `printf()`  | Formatted output  |


- Standard **Error** is numerically defined as `2`

| Function  | Description         |
|-----------|---------------------|
| `perror()`  | Print error message |

-------------------

## C Task 1: Starting out...

~~~admonish todo title='In this program you are going to:'

- prompt the user to enter a number.

- read the user input using `scanf()` and checks if the input was successfully read. If an error occurs, `perror()` is used to print an error message, and the program exits with an error code. 

- If the input is successfully read, a simple calculation is performed (squaring the input).

- The result is displayed using `printf()`.

~~~

1. Create a new directory called Streams, name the child file inside the Streams directory `streams.c`

2. Define two variables both integers called `number` and `result`.
   
3. Prompt the user to enter a number using the standard out function `printf()`
   
4. Next using standard in's `scanf()` read in the users input use the format specifier `%d` and save it to `&number` 

5.  Add some conditional checking to compare the `number` to the value `2`, where the comparison is *`number` **does not equal** `2`*.

6. Inside the conditonal block use the `perror` function to with the string `"Error reading input"`, on the next line use `return 1` to indicate an error using the exit code `1`.

7. Outside of the conditonal block  multiply the `number` by itself and assign the result to `result`, 

8. Finally, print the result using  `printf("The square of %d is: %d\n", number, result);`<p></p>
   
    ~~~admonish code collapsible=true title='Suppressed Code... [27 lines]'

    ```c
    #include <stdio.h>

    int main() {
        // Declare variables for input and result
        int number;
        int result;

        // Prompt the user for input
        printf("Enter a number: ");

        // Read user input
        scanf("%d", &number)

        // compare user inputted value
        if ( number != 2) {
            // Handle input error using perror()
            perror("Error reading input");
            return 1; // Exit with an error code
        }

        // Perform a simple calculation (for example, squaring the input)
        result = number * number;

        // Display the result
        printf("The square of %d is: %d\n", number, result);

        return 0; // Exit successfully
    }
    ```

    ~~~

9. Run the code and when prompted enter the any number that is **not** `2`. 

    ~~~admonish output collapsible=true

    - Notice how the terminal has rendered the error message, this is because error, `2` stream is different to standard out, `1`, stream

    ~~~


10. Run a second time and then enter the value `2`

-------

## C Task 2: Read and Write a File

The program you will write assumes that there is an input file named `input.txt` that stores two integers. The program will then create an output file named `output.txt` with the multiplication result of those two numbers. Error handling is incorporated using `perror()` for file-related errors.

### 1. Prepare Input File

Create a new file and places in the resources folder of the solution view, call it `input.txt`, inside the file input **two** numbers seperated by **space** that range from `0` **to** `50000`, save the file.

### 2. Define Main Function

Now modify `main()`, by placing using the ` FILE *inputFile, *outputFile;` at the top of `main()`. 
    
~~~admonish info

- `FILE` is not a fundamental C data type; it's a data type defined in the C standard library. It represents a file stream and is used to interact with files in C ograms. The `FILE` type is typically defined in the <stdio.h> header file as `struct`

    ```c
    typedef struct {
    // Implementation-specific members
    } FILE;
    ```

- `FILE` is essentially a structure that holds information about an open file, including its **current position**, **status**, and **other details**. When you open a file using functions like `fopen()`, it returns a pointer,`*`, to a `FILE` structure that you use for subsequent file operations.

~~~

### 3. Initialise Variables

On the next line define three integer variables called, `numOne`, `numTwo` and `result`: 
   
~~~admonish code collapsible=true title='Suppressed Code... [1 line]'

```c
int num1, num2, result;
```

~~~

### 4. Open Input File

Create two newlines and the second one you need to reproduce the follwoing: 

~~~admonish code

```c
// Open input file for reading
inputFile = fopen("input.txt", "r");
if (inputFile == NULL) {
    perror("Error opening input file");
    return 1; // Exit with an error code
}
```

~~~

~~~admonish example title='Explanation of code'

- Here we are using `fopen` to open the `"input.txt"` with in read mode `"r"`

- A check is made to see if the `inputFile` has any data, does the file exist, this is done with a `NULL` check.

- If `NULL`, then the `perror` is invoked and outputs `"Error opening input file"` to standard error, and close the application with `return 1,` to indicate an error using an exit code.

~~~

### 5. Validating Input File

If `inputFile` is not `NULL` then the following code would excute, input the following: 

~~~admonish code

```c
// Read two integers from the input file
if (fscanf(inputFile, "%d %d", &numOne, &numTwo) != 2) {
    // Handle input error using perror()
    perror("Error reading input from file");
    fclose(inputFile); // Close the input file
    return 1; // Exit with an error code
}
```

~~~


~~~admonish example title='Explanation of code'

- `fscanf` is for reading files what `scanf` is for reading from terminal input.

- `fscanf`  returns the number of successfully read items. In this case, it should return `2` if it successfully reads two integers from the file. The `!= 2` checks if the return value is **not** equal to 2, indicating that the expected number of items was **not** successfully read.

- `fclose` is invoked because the file was opened, and needs to be closed. This protects the file from curruption when the program closes with `return 1`

~~~

### 6. Perform Multiplication

The calculation can now be performed, multiply `numOne` by `numTwo` and store in `result`

~~~admonish code collapsible=true title='Suppressed Code... [3 lines]'

```c
fclose(inputFile); // Close the input file

// Perform multiplication
result = numOne * numTwo;
```

~~~

### 7. Write to Output File

In a similar fashion to the `inputFile` we need to write to a new file, reproduce the following:

~~~admonish code

```c
// Open output file for writing
outputFile = fopen("output.txt", "w");
if (outputFile == NULL) {
    perror("Error opening output file");
    return 1; // Exit with an error code
}
```

~~~

~~~admonish example title='Explanation of code'

- `fopen` opens the `"output.txt"` in write mode `"w"`

- A check is made to see if the `outputFile` has any data, does the file exist, this is done with a `NULL` check.

- If `NULL`, then the `perror` is invoked and outputs `"Error opening output file"` to standard error, and close the application with `return 1`, to indicate an error using an exit code. 

~~~

### 5. Validating Output File

Again, repeating the structure of step 5, we can write to the file the `result` variable. Reproduce the following:

~~~admonish code

```c
// Write the result to the output file
if (fprintf(outputFile, "Multiplication result: %d\n", result) < 0) {
    // Handle output error using perror()
    perror("Error writing output to file");
    fclose(outputFile); // Close the output file before exiting
    return 1; // Exit with an error code
}
```

~~~

~~~admonish example title='Explanation of code'

- `fprintf` is for writing a formatted output to a file. It is similar to `printf`, but it writes to a file stream (`FILE*`).

- `< 0` is a comparison that checks if the return value of fprintf is **less than** 0. `fprintf` returns the number of characters successfully written. If the return value is less than 0, it indicates an error occurred during writing.

- Again you see `perror()` for standard error and the addition of `fclose()` to close the file.

~~~

### 7. Print Success Message

On success the file needs to be close so after the `if(..){..}` add `fclose("outputFile)` and on a new line `printf("Operation completed successfully.\n");`

~~~admonish code

```c
fclose("outputFile);
printf("Operation completed successfully.\n");
```

~~~

### 8. Run the Program

Compile and run the code.


### 9. Verify the Output

Open the `output.txt` file to see the result of the multiplication.


-----------------------


## C Full code

~~~admonish code collapsible=true title='Full code... [56 lines] '

```c
#include <stdio.h>

int main() {
    FILE *inputFile, *outputFile;
    int numOne, numTwo, result;

    // Open input file for reading
    inputFile = fopen("input.txt", "r");
    if (inputFile == NULL) {
        perror("Error opening input file");
        return 1; // Exit with an error code
    }

    // Read two integers from the input file
    if (fscanf(inputFile, "%d %d", &numOne, &numTwo) != 2) {
        // Handle input error using perror()
        perror("Error reading input from file");
        fclose(inputFile); // Close the input file
        return 1; // Exit with an error code
    }

    fclose(inputFile); // Close the input file

    // Perform multiplication
    result = numOne * numTwo;

     // Open output file for writing
    outputFile = fopen("output.txt", "w");
    if (outputFile == NULL) {
        perror("Error opening output file");
        return 1; // Exit with an error code
    }

    // Write the result to the output file
    if (fprintf(outputFile, "Multiplication result: %d\n", result) < 0) {
        // Handle output error using perror()
        perror("Error writing output to file");
        fclose(outputFile); // Close the output file before exiting
        return 1; // Exit with an error code
    }

    fclose(outputFile); // Close outputFile file2

    printf("Operation completed successfully.\n");

    return 0; // Exit successfully
}
```

~~~

--- 

## Python Task 1: Starting out...

~~~admonish info title='In this program you are going to:'

- prompt the user to enter a number.

- read the user input using `input()` and checks if the input was successfully read. If an error occurs, `except` is used to print an error message, and the program exits with an error code. 

- If the input is successfully read, a simple calculation is performed (squaring the input).

- The result is displayed using `print(f"")`.

~~~

1. Create a new file called `streams.py`

2. At the top of the file put `import` `sys` package

3. Next you need to create a `try:`-`except:` block

4. Inside `try:` create a variable called `user_input` and assign to it the output of the following function `input("Enter a number: ")`

5. Next convert the `user_input` to a `float` using the `float(...)` function, assign this to `number`

6. On the next line square the `number`... and assign it to `result`

7. Now you we need to output the `result` to the user. Use `print(f"")` notation 

    ~~~admonish code collapsible=true title='`try` code... [14 lines] '
    ```py
    import sys  # Import for handling exit

    try:
        # Prompt the user to enter a number
        user_input = input("Enter a number: ")

        # Convert the input to a float
        number = float(user_input)

        # Perform the calculation (square the number)
        result = number ** 2

        # Display the result
        print(f"The square of {number} is {result}")
    ```
    ~~~

8. Next we need to add the `except:` incase there was an error inside `try:`

9. Using `print()` return an appropriate error message 

10. Finally, use the `sys` package and use the module `exit(1)`

    ~~~admonish code collapsible=true title='Full code... [18 lines]'
    import sys  # Import for handling exit

    try:
        # Prompt the user to enter a number
        user_input = input("Enter a number: ")

        # Convert the input to a float
        number = float(user_input)

        # Perform the calculation (square the number)
        result = number ** 2

        # Display the result
        print(f"The square of {number} is {result}")

    except ValueError:
        # Handle invalid input
        print("Error: Invalid input. Please enter a valid number.")
        sys.exit(1)  # Exit the program with an error code
    ```
    ~~~

11. Run the code and supply and numerical value, and then again with an alpha symbol.

## Python Task 2: Read and Write a File

This lab assumes an input file named `input.txt` containing two integers. The program will create an output file named `output.txt` to store the multiplication result of those integers. Proper error handling is implemented for file-related issues.

---

### 1. Define Main Function

1. Create a new file called `read_write.py`

2. Begin by defining a `main()` function in Python.

```python
import sys

def main():
```

---

### 2. Initialise Variables

Define variables to hold the two numbers and the result of their multiplication.

```python
num_one = 0
num_two = 0
result = 0
```

---

### 3. Open Input File

Use a `try...except` block to handle potential errors when opening the file.

```python
try:
    with open("input.txt", "r") as input_file:
        # Read two integers from the file
        try:
            num_one, num_two = map(int, input_file.read().split())
        except ValueError:
            print("Error: Could not read two integers from input file.", file=sys.stderr)
            return
except FileNotFoundError:
    print("Error: Input file not found.", file=sys.stderr)
    return
except IOError as e:
    print(f"Error opening input file: {e}", file=sys.stderr)
    return
```

~~~admonish example title='Explanation of code'

- `open` opens the file in read mode (`"r"`).
- `map(int, ...)` converts the space-separated values into integers.
- Errors such as file not found or value parsing are handled gracefully.
- The `except` blocks ensure that specific errors are caught and informative messages are printed. For instance:

    - `FileNotFoundError`: This occurs when the file does not exist in the specified - location.

    - `IOError`: This handles other input/output-related errors, such as permission - issues or hardware problems.

    - `ValueError`: This handles scenarios where the file content is not properly formatted as two integers
~~~

---

### 4. Perform Multiplication

Multiply the two numbers and store the result.

```python
result = num_one * num_two
```

---

### 5. Write to Output File

Use another `try...except` block to handle potential issues when writing to the output file.

```python
try:
    with open("output.txt", "w") as output_file:
        # Write the result to the output file
        output_file.write(f"Multiplication result: {result}\n")
except IOError as e:
    print(f"Error writing to output file: {e}", file=sys.stderr)
    return
```
~~~admonish example title='Explanation of code'

- `open` opens the file in write mode (`"w"`).
- Errors during writing are caught and printed to standard error.

~~~

---

### 6. Print Success Message

Inform the user that the operation completed successfully.

```python
    print("Operation completed successfully.")
```

---

### 7. Run the Program

Call the `main()` function to execute the code.

```python
if __name__ == "__main__":
    main()
```

---

### 8. Verify the Output

1. Run the program.
2. Open `output.txt` to verify that it contains the correct multiplication result.


### 9. Full Code here

~~~admonish code collapsible=true title='Full code... [35 lines]'
```py
import sys

def main():
    num_one = 0
    num_two = 0
    result = 0

    try:
        with open("input.txt", "r") as input_file:
            # Read two integers from the file
            try:
                num_one, num_two = map(int, input_file.read().split())
            except ValueError:
                print("Error: Could not read two integers from input file.", file=sys.stderr)
                return
    except FileNotFoundError:
        print("Error: Input file not found.", file=sys.stderr)
        return
    except IOError as e:
        print(f"Error opening input file: {e}", file=sys.stderr)
        return

    result = num_one * num_two

    try:
        with open("output.txt", "w") as output_file:
            # Write the result to the output file
            output_file.write(f"Multiplication result: {result}\n")
    except IOError as e:
        print(f"Error writing to output file: {e}", file=sys.stderr)
        return
    
    print("Operation completed successfully.")

if __name__ == "__main__":
    main()
```

~~~