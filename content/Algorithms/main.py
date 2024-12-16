import matplotlib.pyplot as plt
import imageio

# Bubble Sort function
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                yield arr, (j, arr[j]), (j + 1, arr[j + 1])

# QuickSort function
def quicksort(arr, low, high):
    if low < high:
        pivot = arr[(low + high) // 2]
        i = low
        j = high
        while i <= j:
            while arr[i] < pivot:
                i += 1
            while arr[j] > pivot:
                j -= 1
            if i <= j:
                arr[i], arr[j] = arr[j], arr[i]
                yield arr, (i, arr[i]), (j, arr[j])
                i += 1
                j -= 1
        yield from quicksort(arr, low, j)
        yield from quicksort(arr, i, high)

# Selection Sort function
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        yield arr, (i, arr[i]), (min_idx, arr[min_idx])

# Insertion Sort function
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
            yield arr, (j + 1, arr[j + 1]), (i, key)
        arr[j + 1] = key
        yield arr, (j + 1, key), (i, key)

# Initial array
array1 = [90, 65, 70, 55, 60, 80]

# Create figure and axis
fig, ax = plt.subplots()
ax.set_xlim(0, len(array1))
ax.set_ylim(0, max(array1) + 10)

# Bar plot
bars = ax.bar(range(len(array1)), array1)

# Function to update plot
def update(array, move_from, move_to):
    for i, val in enumerate(array):
        bars[i].set_height(val)
    for annotation in ax.texts:
        annotation.remove()  # Remove existing annotations
    if hasattr(move_from, '__iter__'):
        if len(move_from) == 2 and isinstance(move_from[0], int) and isinstance(move_from[1], int):
            ax.annotate(str(move_from[1]), xy=(move_from[0], move_from[1]), xytext=(move_from[0], move_from[1] - 5), ha='center', color='red')
    if hasattr(move_to, '__iter__'):
        if len(move_to) == 2 and isinstance(move_to[0], int) and isinstance(move_to[1], int):
            ax.annotate(str(move_to[1]), xy=(move_to[0], move_to[1]), xytext=(move_to[0], move_to[1] - 5), ha='center', color='green')
    return bars

# Create frames for Bubble Sort and save as images
frames_bubble = []
for frame, move_from, move_to in bubble_sort(array1.copy()):
    update(frame, move_from, move_to)
    plt.savefig('frame.png')  # Save current frame as PNG image
    frames_bubble.append(imageio.v2.imread('frame.png'))  # Append image to frames list
imageio.mimsave('bubble_sort.gif', frames_bubble, fps=1,loop=0)  # Set frame rate to 1 frame per second

# Create frames for Quick Sort and save as images
frames_quick = []
for frame, move_from, move_to in quicksort(array1.copy(), 0, len(array1)-1):
    update(frame, move_from, move_to)
    plt.savefig('frame.png')  # Save current frame as PNG image
    frames_quick.append(imageio.v2.imread('frame.png'))  # Append image to frames list
imageio.mimsave('quick_sort.gif', frames_bubble, fps=1,loop=0)  # Set frame rate to 1 frame per second

# Create frames for Selection Sort and save as images
frames_selection = []
for frame, move_from, move_to in selection_sort(array1.copy()):
    update(frame, move_from, move_to)
    plt.savefig('frame.png')  # Save current frame as PNG image
    frames_selection.append(imageio.v2.imread('frame.png'))  # Append image to frames list
imageio.mimsave('selection_sort.gif', frames_bubble, fps=1, loop=0)  # Set frame rate to 1 frame per second

# Create frames for Insertion Sort and save as images
frames_insertion = []
for frame, move_from, move_to in insertion_sort(array1.copy()):
    update(frame, move_from, move_to)
    plt.savefig('frame.png')  # Save current frame as PNG image
    frames_insertion.append(imageio.v2.imread('frame.png'))  # Append image to frames list
imageio.mimsave('insertion_sort.gif', frames_bubble, fps=1,loop=0)  # Set frame rate to 1 frame per second


