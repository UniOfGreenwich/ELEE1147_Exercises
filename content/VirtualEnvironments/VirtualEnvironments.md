# Virtual Environments

In this section you are going to build a virtual environment using `python`, and then learn how to use an `install.sh` to automate this process.


## Step 1: Verify Python is installed

1.  Open VSCode, and open the terminal and run

    ~~~admonish terminal

    ```
    python3 --version
    ```
    ~~~

    ~~~admonish example title="Explanation"

    This command checks if Python 3 is installed on your system. If it returns a version number, you're good to go. 

    ~~~

    On some systems, you may need to run:

    ~~~admonish terminal

    ```
    python --version
    ```
    ~~~

    ~~~admonish tip

    You can also use the shell command called... `command`

    ```
    command -v python
    ```
    ~~~


## Step 2: Create a Virtual Environment

1. Choose a name for your virtual environment (for example, `myenv`) and run:

    ~~~admonish terminal
    
    ```
    python3 -m venv myenv
    ```

    ~~~

    This command creates a directory named myenv containing a self-contained Python installation.

    ~~~admonish info

    Think of this as creating a special folder where all the tools (Python libraries) you use for your project are kept, so they don't interfere with tools for other projects.

    ~~~


## Step 3: Activate the Virutal Envionment

1. Activation is necessary so that when you install packages, they go into this isolated environment rather than your system-wide Python installation.

    - Linux/MacOS :

        ~~~admonish terminal

        ```
        source myenv/bin/activate
        ```
        ~~~

    - On Windows (Command Prompt):

        ~~~admonish terminal

        ```
        myenv\Scripts\activate.bat
        ```
        ~~~

    - On Windows (Bash):

        ~~~admonish terminal

        ```
        source myenv/Scripts/activate
        ```
        ~~~

    - On Windows (Powershell):

        ~~~admonish terminal

        ```
        source myenv/Scripts/activate.ps1
        ```
        ~~~

2. After activation, your command prompt should change (usually showing the environment name), indicating that you're now working inside `myenv`

    ~~~admonish info

    Activating the environment is like stepping into your dedicated workspace where all the tools you install won't mix with others outside of this space.

    ~~~

3. You can verify by runnning `pip list`, you should only have one package

    ~~~admonish terminal
    
    ```
    $ pip list
    Package Version
    ------- -------
    pip     24.3.1
    ```
    ~~~

## Step 4: Install Packages

1. Once your virtual environment is activated, you can install any packages you need. For example:

    ~~~admonish terminal

    ```
    pip install numpy pandas requests
    ```

    ~~~

2. If you later decide to track these dependencies, you can create a `requirements.txt` file by running:

    ~~~admonish terminal

    ```
    pip freeze > requirements.txt
    ```

    ~~~

## Step 5: Deactivate the Virtual Environment

1. When you’re finished working, simply run:

    ~~~admonish terminal

    ```
    deactivate
    ```

    ~~~

    This returns you to your system's default Python environment.


    ~~~admonish note

    Using virtual environments ensures that your project dependencies remain isolated and consistent across different development environments, a best practice in professional Python development

    ~~~

## Step 6: Install.sh

### Step 6.1: Initial Setup and OS Detection

1. Create a new file outside of the venv/ called `install.sh`

2. Begin your script with a shebang and error handling, then detect the operating system.

    ~~~admonish code

    ```sh
    #!/usr/bin/env bash
    set -e

    # Detect the operating system.
    OS_TYPE=$(uname -s)
    echo "Detected OS: $OS_TYPE"
    ```
    ~~~

    ~~~admonish example title="Explanation"
    
    The shebang `#!/usr/bin/env` bash tells your system to run the script with Bash. The `set -e` command makes the script exit immediately if any command fails. `uname -s` fetches the OS type.

    ~~~

### Step 6.2: Checking for Python Installation

1. Ensure that Python (preferably Python 3) is installed before proceeding.

    ~~~admonish code

    ```sh
    # Check if Python 3 is available.
    if command -v python3 &> /dev/null; then
        PYTHON=python3
    elif command -v python &> /dev/null; then
        PYTHON=python
    else
        echo "Python is not installed. Please install Python and try again."
        exit 1
    fi

    echo "Using Python executable: $PYTHON"
    ```

    ~~~

    ~~~admonish example title="Explanation"
    
    This block checks for the presence of python3 or falls back to python. If neither is available, the script exits with an error.

    ~~~

### Step 6.3: Creating the Virtual Environment

1. Define a directory for your virtual environment and create it if it doesn’t already exist.

    ~~~admonish code

    ```sh
    # Define the directory for the virtual environment.
    ENV_DIR="venv"

    # Create the virtual environment if it doesn't already exist.
    if [ -d "$ENV_DIR" ]; then
        echo "Virtual environment directory '$ENV_DIR' already exists."
    else
        echo "Creating virtual environment in '$ENV_DIR'..."
        $PYTHON -m venv "$ENV_DIR"
    fi
    ```

    ~~~

    ~~~admonish example title="Explanation"
    
    The variable `ENV_DIR` specifies the folder (named `venv`) where the virtual environment will be created. The script checks if the folder exists and creates it if not.

    ~~~

### Step 6.4: Determining the pip Executable Path

1. Determine the correct path to the `pip` executable based on the operating system.

    ~~~admonish code

    ```sh
    # Determine the correct pip executable based on OS.
    if [ "$OS_TYPE" = "Darwin" ] || [ "$OS_TYPE" = "Linux" ]; then
        PIP="$ENV_DIR/bin/pip"
    elif [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == CYGWIN* || "$OS_TYPE" == MSYS* ]]; then
        PIP="$ENV_DIR\\Scripts\\pip.exe"
    else
        echo "Unknown OS. Cannot determine pip path."
        exit 1
    fi

    ```
    ~~~

    ~~~admonish example title="Explanation"
    
    This code sets the `PIP` variable to point to the correct executable path for `pip`, depending on whether you’re on Linux/macOS or Windows.

    ~~~

### Step 6.5: Installing Packages from requirements.txt

1. If a `requirements.txt` file exists in the directory, use it to install `pip` packages. If you remember we had one from [Step 4](#step-4-install-packages).

    ~~~admonish code

    ```sh
    # Check if requirements.txt exists and install the packages if it does.
    if [ -f "requirements.txt" ]; then
        echo "Installing pip packages from requirements.txt..."
        $PIP install -r requirements.txt
    else
        echo "requirements.txt not found. Skipping package installation."
    fi

    echo "Pip package installation complete."
    ```
    ~~~

    ~~~admonish example title="Explanation"

    This block checks for a `requirements.txt` file and, if found, installs all packages listed in it using `pip`.

    ~~~

### Step 6.6: Displaying Activation Instructions

1. Provide the user with the correct command to activate the virtual environment

    ~~~admonish code

    ```sh
    # Provide activation instructions based on the OS.
    if [ "$OS_TYPE" = "Darwin" ] || [ "$OS_TYPE" = "Linux" ]; then
        echo "To activate the virtual environment, run:"
        echo "  source $ENV_DIR/bin/activate"
    elif [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == CYGWIN* || "$OS_TYPE" == MSYS* ]]; then
        echo "For Windows, run:"
        echo "  $ENV_DIR\\Scripts\\activate"
    else
        echo "Unknown OS. Please activate the virtual environment manually."
    fi

    echo "Setup complete."
    ```
    ~~~

    ~~~admonish example title="Explanation"

    The final section outputs the appropriate activation command for the user, depending on their operating system..

    ~~~


### Step 6.7: Installer code

~~~admonish code collapsible=true title='install.sh full code'

```sh
#!/usr/bin/env bash

# Exit immediately if any command fails.
set -e

# Detect the operating system.
OS_TYPE=$(uname -s)
echo "Detected OS: $OS_TYPE"

# Check if Python 3 is available.
if command -v python3 &> /dev/null; then
    PYTHON=python3
elif command -v python &> /dev/null; then
    PYTHON=python
else
    echo "Python is not installed. Please install Python and try again."
    exit 1
fi

echo "Using Python executable: $PYTHON"

# Define the directory for the virtual environment.
ENV_DIR="venv"

# Create the virtual environment if it doesn't already exist.
if [ -d "$ENV_DIR" ]; then
    echo "Virtual environment directory '$ENV_DIR' already exists."
else
    echo "Creating virtual environment in '$ENV_DIR'..."
    $PYTHON -m venv "$ENV_DIR"
fi

# Determine the correct pip executable based on OS.
if [ "$OS_TYPE" = "Darwin" ] || [ "$OS_TYPE" = "Linux" ]; then
    PIP="$ENV_DIR/bin/pip"
elif [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == CYGWIN* || "$OS_TYPE" == MSYS* ]]; then
    PIP="$ENV_DIR\\Scripts\\pip.exe"
else
    echo "Unknown OS. Cannot determine pip path."
    exit 1
fi

# Check if requirements.txt exists and install the packages if it does.
if [ -f "requirements.txt" ]; then
    echo "Installing pip packages from requirements.txt..."
    $PIP install -r requirements.txt
else
    echo "requirements.txt not found. Skipping package installation."
fi

echo "Pip package installation complete."

# Provide activation instructions based on the OS.
if [ "$OS_TYPE" = "Darwin" ] || [ "$OS_TYPE" = "Linux" ]; then
    echo "To activate the virtual environment, run:"
    echo "  source $ENV_DIR/bin/activate"
elif [[ "$OS_TYPE" == MINGW* || "$OS_TYPE" == CYGWIN* || "$OS_TYPE" == MSYS* ]]; then
    echo "For Windows, run:"
    echo "  $ENV_DIR\\Scripts\\activate"
else
    echo "Unknown OS. Please activate the virtual environment manually."
fi

echo "Setup complete."

```

~~~