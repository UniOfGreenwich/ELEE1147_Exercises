# Fork Bombs 

~~~admonish code

```sh
:(){:|:&};:
```

~~~

## Breaking down the oneliner

### 1.  Function Definition

The oneliner, designed as a DNS attack, exponentially floods the process tree via recurisive function calls, how?

Well lets break it down:

~~~admonish code

```sh
#! /usr/bin/env bash
# Minified -> :(){:|:&};:

:() {
        : | : &

}

:
```

~~~

~~~admonish example title='Explanation'

- `:() { ... }:` This defines a function named `:` (a colon). In Bash, function names can be arbitrary characters, and here `:` is used as the function name.

- Inside the function body:
    -  `:| : &`: This is the core of the fork bomb.
        - `:`: Calls the function itself. Since `:` is defined as a function, this recursively calls itself.
        - `|`: The pipe operator. It takes the output of the command on its left (`:`) and uses it as input for the command on its right (another `:`). Since the function `:` is called twice, it creates two processes.
        - `&`: Runs the command in the background. The `&` at the end of the command line means that the function `:` is executed in the background, allowing the script to continue running without waiting for the function to finish.

~~~

### 2. Function Invocation

~~~admonish code

```
:
```

~~~

~~~admonish example title='Explanation'

- This line invokes the function `:`. When this is executed, it starts the recursive process of the function `:` calling itself, which rapidly consumes system resources.

~~~

### 3. Refactoring

We can see below that `myfunc` replaces `:`, so this should be more readable.

~~~admonish code

```sh
#! /usr/bin/env bash
myfunc() {

        my_func | my_func &

}

my_func
```

~~~


### 4. Exploring safely...

 - To explore this safely we are going to set limit within our fork bomb, that when it gets to the seventh iteration the fork will stop and close. Terminating all forked processes attached to the parent process, i.e the first time it is called. 

    ~~~admonish code

    ```sh
    #! /usr/bin/env bash

    fork_bomb(){
            local num=$1
            local name=$2
            printf '%-2d %-5s %s\n' "$num" "$name" 'running' >&2

            if ((num == 6)); then
                    return 0
            fi

            ((num++))
            fork_bomb "$num" 'left' | fork_bomb "$num" 'right' &
    }

    fork_bomb 0 'none'
    ```

    ~~~
    
    ~~~admonish example title='Explanation'

    - The two locally defined variables `num` and `name` keep track of the iteration  and weither it was forked left or right of the pipe. This is for our purpose when viewing it in the terminal, as `printf` would indicate.
    - Saftey net is defined in the `if` block, when `num == 6` each process terminates
    - After the safety net we increment the iteration `((num++))`
    - the main part is the `fork_bomb "$num" 'left'...` which essentially replicates the `:|:&` where the `"$num"` and `left/right` is suppied for tracking. 
    - Lastly, the function is invoked for the first time via `fork_bomb 0 'none'`

    ~~~

- The output would look something like:

    ~~~admonish output

    ```
    $ bash explainable_fork_bomb.sh
    >
    0  none  running
    1  left  running
    1  right running
    2  left  running
    2  right running # happens 4 times
    ... 

    3  left  running ## happens 8 times
    3  right running 
    ...
    4  left  running # happens 16 times
    4  right running
    ...
    5  right running
    5  left  running # happens 32 times
    ...
    6  right running
    6  left  running # happens 64 times
    ```

    ~~~

- We actually prove that processes are spawned exponentially, following the base 2: 

    ~~~admonish output

    ```sh
    $  bash explained_fork_bomb.sh 2>&1 | sort | awk '{print $1}' | uniq -c
    > 
        1 0
        2 1
        4 2
        8 3
        16 4
        32 5
        64 6
    ```

    - Here you can see the first time around layer 0, there is 1 function call.
    - by the time we reach 6, we have 64 aka $2^6$

    ~~~

## Differences Between PID Limit, Max User Processes, and Max Threads

~~~admonish important
The following commands will __only__ work on Linux
~~~

### 1. Process ID (PID) Limit

- **What it is**:  
    The Process ID (PID) is a unique identifier assigned to each running process on the system. The PID limit determines the maximum number of unique PIDs that can be assigned.

- **Configuration**:  
    This limit is set by the `max_pid` parameter in `/proc/sys/kernel`. You can view the maximum PID numerical value with:

    ~~~admonish terminal

    ```bash
    $ cat /proc/sys/kernel/pid_max
    ```

    ~~~

    This value defines the maximum PID number allowed on the system. For example, this means that your a process can have the PID upto the value of `4194304`, this does not mean you can have $2^{22}$ processes.

 - **Why it matters**:

    This limit ensures that the system does not run out of unique PIDs. If the number of processes reaches the PID limit, new processes cannot be created until existing ones exit and their PIDs are recycled.

### 2. Max User Processes (`ulimit -a`)

- **What it is:**

    The maximum number of processes a single user can create is controlled by the ulimit command. This is a user-level limit that restricts the number of processes that any single user can spawn.

    ~~~admonish output

    ```sh
    $ ulimit -a | grep "max user processes"
    >   
    max user processes                  (-u) 63562
    ```

    ~~~

    Incidentally, this obtained from the /proc/self/limits file, produce by the kernel:

    ~~~admonish output

    ```sh
    $ cat /proc/self/limits | grep "Max processes"
    > 
    Limit                     Soft Limit           Hard Limit           Units
    Max processes             63562                63562                processes
    ```

    ~~~

- **Why it matters**:

    This limit is crucial for managing system resources and preventing any single user from monopolizing process creation, which could impact the performance and stability of the system.

## 3. Max Threads (`/proc/sys/kernel/threads-max`)

- **What it is**:

    This parameter defines the maximum number of threads that can be created system-wide. Threads are the smallest unit of execution within a process.

- **Configuration**:

    You can check the current limit with:

    ~~~admonish output

    ```sh
    $ cat /proc/sys/kernel/threads-max
    > 127125
    
    ```

    ~~~

- **Why it matters**:

    This limit ensures that the system doesn’t get overwhelmed with too many threads, which could exhaust memory and other resources. It controls the maximum number of concurrent threads in the system, affecting performance and stability.

