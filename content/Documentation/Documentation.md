# Lab n: Documentation


## Task 1. 

<a href="docs/html/index.html" target="_blank">Output</a>

Using Doxygen or ... we can increase readibility and reusability of the code.  

1. Create a new project in `C++`, name the project Documentation and then remember to rename the program file, `Documentation.cpp` to `Documentation.c`.

2. Modify the code:
   ```c
   #include <stdio.h>

   int main(){

        return 0;

   }
   ```

3. Create a new Header file, `DocumentationExamples.h`,

4. Add the **Guard**

   <details>
   <summary>Code...</summary>

    ```h
    #ifndef DOCUMENTATIONEXAMPLES_H
    #def DOCUMENTATIONEXAMPLES_H

    #include <stdio.h>
    #include <stdbool.h>
    ///
    // This function prints out the head file documentation
    // @param boolean to all documentation
    // @return void
    ///    
    void printDocumentation(bool print);

    ```

   </details>

5. Next create the `DocumentationExample.c` and reproduce the following:

    ```c
    #include DocumentationExample.h   
    void printDocumentation()
    {
        printf("This function prints out the head file documentation\n @param boolean to all documentation\n @return void\n");
    }
    ```

6. So how does the documentation render, appear? Generally by using some documentation tool, in the case of this lab we will use Doxygen.

7. Doxygen uses a configuration file to determine how the comments in the code should be rendered: 

```
# Doxyfile for your project

DOXYFILE_ENCODING      = UTF-8
PROJECT_NAME           = "Calculator Documentation"
PROJECT_NUMBER         = 1.0
PROJECT_BRIEF          = "A simple calculator program with basic operations."

OUTPUT_DIRECTORY       = ./docs
CREATE_SUBDIRS         = NO

# Add all your source files to the INPUT option
INPUT                  = calculator.c \
                         operations.c

RECURSIVE              = NO

EXTRACT_ALL            = YES
EXTRACT_PRIVATE        = YES
EXTRACT_STATIC         = YES
EXTRACT_LOCAL_CLASSES  = YES

GENERATE_LATEX         = NO
GENERATE_HTML          = YES
```
