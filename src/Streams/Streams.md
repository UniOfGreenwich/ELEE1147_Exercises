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

## Task 1: Starting out...

In this program you are going to: 

- prompt the user to enter a number.

- read the user input using `scanf()` and checks if the input was successfully read. If an error occurs, `perror()` is used to print an error message, and the program exits with an error code. 

- If the input is successfully read, a simple calculation is performed (squaring the input).

- The result is displayed using `printf()`.


1.  Create a new project in Visual Studio and call it Streams, rename the `Streams.cpp` to `Streams.c`

2. Define two variables both integers called `number` and `result`.
   
3. Prompt the user to enter a number using the standard out function `printf()`
   
4. Next using standard in's `scanf()` read in the users input use the format specifier `%d` and save it to `&number` 

5.  Add some conditional checking to compare the `number` to the value `2`, where the comparison is *`number` **does not equal** `2`*.

6. Inside the conditonal block use the `perror` function to with the string `"Error reading input"`, on the next line use `return 1` to indicate an error using the exit code `1`.

7. Outside of the conditonal block  multiply the `number` by itself and assign the result to `result`, 

8. Finally, print the result using  `printf("The square of %d is: %d\n", number, result);`<p></p>
   
    <details>
    <summary>Code...</summary>

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
        if ( result != 2) {
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

    </details>

9. Run the code and when prompted enter the any number that is **not** `2`. 

    <details>
    <summary>Output...</summary>


    - Notice how the terminal has rendered the error message, this is because error, `2` stream is different to standard out, `1`, stream
    </details>


10. Run a second time and then enter the value `2`

    <details>
    <summary>Output...</summary>


    </details>

-------

## Task 2: Read and Write a File

The program you will write assumes that there is an input file named `input.txt` that stores two integers. The program will then create an output file named `output.txt` with the multiplication result of those two numbers. Error handling is incorporated using `perror()` for file-related errors.

1. Create a new file and places in the resources folder of the solution view, call it `input.txt`, inside the file input **two** numbers seperated by **space** that range from `0` **to** `50000`, save the file.

2. Now modify `main()`, by placing using the ` FILE *inputFile, *outputFile;` at the top of `main()`. 
    
    >**Note**
    >> - `FILE` is not a fundamental C data type; it's a data type defined in the C standard library. It represents a file stream and is used to interact with files in C programs. The `FILE` type is typically defined in the <stdio.h> header file as `struct`
    >>   
    >>    ```c
    >>    typedef struct {
    >>    // Implementation-specific members
    >>    } FILE;
    >>    ```
    >>
    >> - `FILE` is essentially a structure that holds information about an open file, including its **current position**, **status**, and **other details**. When you open a file using functions like `fopen()`, it returns a pointer,`*`, to a `FILE` structure that you use for subsequent file operations.

3. On the next line define three integer variables called, `numOne`, `numTwo` and `result`: 
   
   <details>
   <summary>Code...</summary>
    
    ```c
    int num1, num2, result;
    ```
   
   </details>

4. Create two newlines and the second one you need to reproduce the follwoing: 
   ```c
    // Open input file for reading
    inputFile = fopen("input.txt", "r");
    if (inputFile == NULL) {
        perror("Error opening input file");
        return 1; // Exit with an error code
    }
   ```

    - Here we are using `fopen` to open the `"input.txt"` with in read mode `"r"`

    - A check is made to see if the `inputFile` has any data, does the file exist, this is done with a `NULL` check.

    - If `NULL`, then the `perror` is invoked and outputs `"Error opening input file"` to standard error, and close the application with `return 1,` to indicate an error using an exit code. 

5. If inputFile is not `NULL` then the following code would excute, input the following: 

   ```c
   // Read two integers from the input file
   if (fscanf(inputFile, "%d %d", &numOne, &numTwo) != 2) {
        // Handle input error using perror()
        perror("Error reading input from file");
        fclose(inputFile); // Close the input file
        return 1; // Exit with an error code
    }
   ```

   - `fscanf` is for reading files what `scanf` is for reading from terminal input.

   - `fscanf`  returns the number of successfully read items. In this case, it should return `2` if it successfully reads two integers from the file. The `!= 2` checks if the return value is **not** equal to 2, indicating that the expected number of items was **not** successfully read.

   - `fclose` is invoked because the file was opened, and needs to be closed. This protects the file from curruption when the program closes with `return 1`

6. We should also close the file when successfully read, do this by reproducing the `fclose` code on a new line outside of the closing brace of the `if(...){...`}

7. The calculation can now be performed, multiply `numOne` by `numTwo` and store in `result`

    <details>
    <summary>Code...</details>

    ```c
    fclose(inputFile); // Close the input file

    // Perform multiplication
    result = numOne * numTwo;
    ```

    </details>

8. In a similar fashion to step 4 we need to write to a new file, reproduce the following:

    ```c
    // Open output file for writing
    outputFile = fopen("output.txt", "w");
    if (outputFile == NULL) {
        perror("Error opening output file");
        return 1; // Exit with an error code
    }
    ```

    - `fopen` opens the `"output.txt"` in write mode `"w"`

    - A check is made to see if the `outputFile` has any data, does the file exist, this is done with a `NULL` check.

    - If `NULL`, then the `perror` is invoked and outputs `"Error opening output file"` to standard error, and close the application with `return 1`, to indicate an error using an exit code. 

9. Again, repeating the structure of step 5, we can write to the file the `result` variable. Reproduce the following:

    ```c
    // Write the result to the output file
    if (fprintf(outputFile, "Multiplication result: %d\n", result) < 0) {
        // Handle output error using perror()
        perror("Error writing output to file");
        fclose(outputFile); // Close the output file before exiting
        return 1; // Exit with an error code
    }
    ```

    - `fprintf` is for writing a formatted output to a file. It is similar to `printf`, but it writes to a file stream (`FILE*`).
    
    - `< 0` is a comparison that checks if the return value of fprintf is **less than** 0. `fprintf` returns the number of characters successfully written. If the return value is less than 0, it indicates an error occurred during writing.

    - Again you see `perror()` for standard error and the addition of `fclose()` to close the file.

10. On success the file needs to be close so after the `if(..){..}` add `fclose("outputFile)` and on a new line `printf("Operation completed successfully.\n");`

11. Run the code and you should see the following outputs: 

12. Open the `output.txt` file to see the result of the multiplication.


-----------------------

<details>
<summary>Full Code....</summary>

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

</details>

