# Data Structures

 Python Data Structures Exercises - Part 1

This document provides a comprehensive overview of Python's main data structures: **Lists, Tuples, Dictionaries,** and **Sets**.

---

## 1. Lists

A **list** is a mutable, ordered collection of items. Lists are useful for storing data in a specific order, and they can hold multiple data types. Lists are defined using square brackets `[]`.

### Key List Operations
- **Appending**: Add items with `append()`.
- **Removing**: Remove items by value with `remove()` or by index with `pop()`.
- **Sorting**: Sort items using `sort()` for in-place sorting or `sorted()` to get a new sorted list.

### Example: Working with Lists
```python
# Create a list of animals
animals = ["lion", "tiger", "elephant", "giraffe"]
print("Original list:", animals)

# Add a new animal to the end of the list
animals.append("zebra")
print("After appending:", animals)

# Remove an animal from the list by value
animals.remove("tiger")
print("After removing:", animals)

# Sort the list alphabetically
animals.sort()
print("Sorted list:", animals)
```

### Exercise 1: Basic List Operations
1. Create a list called `wildlife` with at least six animal names.
2. Add two more animals to the list.
3. Replace the third animal with `"penguin"`.
4. Remove the last animal from the list.
5. Print the list in alphabetical order without modifying the original list.
6. Count how many times `"elephant"` appears in the list.
7. <details><summary>Solution...</summary>

    ```python
    wildlife = ["lion", "tiger", "bear", "elephant", "zebra", "giraffe"]
    wildlife.extend(["koala", "panda"])
    wildlife[2] = "penguin"
    wildlife.pop()
    print("Alphabetical order:", sorted(wildlife))
    print("Count of 'elephant':", wildlife.count("elephant"))
    ```

    </details>

---
---

## 2. Tuples

A **tuple** is an immutable, ordered collection of items. Tuples are defined with parentheses `()` and are often used for fixed data that should not change.

### Key Tuple Characteristics
- **Immutability**: Tuples cannot be modified after creation.
- **Indexing and Slicing**: Access elements like lists but without modification.

### Example: Using Tuples
```python
# Create a tuple of bird species
birds = ("sparrow", "parrot", "eagle", "penguin")
print("Bird species:", birds)

# Accessing elements by index
print("First bird:", birds[0])
print("Last bird:", birds[-1])

# Tuples are immutable, so the following line would raise an error:
# birds[1] = "canary"
```

### Exercise 2: Tuple Basics
1. Create a tuple called `amphibians` with three amphibian species.
2. Print the second amphibian in the tuple.
3. Attempt to add a new amphibian to the tuple (note the error).
4. Convert the tuple to a list, add a new amphibian, and convert it back to a tuple.
5. <details>
   <summary>Solution...</summary>

    ```python
    amphibians = ("frog", "salamander", "newt")
    print("Second amphibian:", amphibians[1])

    # Adding a new amphibian will raise an error as tuples are immutable
    # amphibians.append("toad")

    # Convert to list to add an item
    amphibians_list = list(amphibians)
    amphibians_list.append("toad")
    amphibians = tuple(amphibians_list)
    print("Updated tuple:", amphibians)
    ```

    </details>

---
---

## 3. Dictionaries

A **dictionary** is a mutable, unordered collection of key-value pairs. Dictionaries are defined using curly braces `{}`, with keys and values separated by colons.

### Key Dictionary Operations
- **Adding/Updating**: Add or update values using `dict[key] = value`.
- **Removing**: Remove items with `pop(key)` or `del dict[key]`.
- **Keys and Values**: Access all keys with `keys()` and all values with `values()`.

### Example: Animal Dictionary

```python
# Create a dictionary with animal categories
animal_classes = {
    "mammals": ["lion", "elephant", "tiger"],
    "birds": ["sparrow", "eagle", "parrot"],
    "reptiles": ["snake", "lizard", "crocodile"]
}
print("Animal classes:", animal_classes)

# Add a new category
animal_classes["amphibians"] = ["frog", "newt"]
print("Updated classes:", animal_classes)

# Access specific category
print("Birds:", animal_classes["birds"])

# Remove a category
animal_classes.pop("reptiles")
print("After removing reptiles:", animal_classes)
```

### Exercise 3: Dictionary Basics
1. Create a dictionary called `habitat` with three habitats (e.g., `"forest"`, `"desert"`, `"ocean"`), each containing a list of animals found there.
2. Add a new habitat with its animals.
3. Print all animals in the `"forest"` habitat.
4. Remove a habitat from the dictionary.
5. Print the dictionary’s keys and values.
6. <details>
   <summary>Solution...</summary>

    ```python
    habitat = {
        "forest": ["deer", "bear", "owl"],
        "desert": ["camel", "scorpion", "fennec fox"],
        "ocean": ["dolphin", "whale", "shark"]
    }
    habitat["savanna"] = ["lion", "elephant", "cheetah"]
    print("Forest animals:", habitat["forest"])
    habitat.pop("desert")
    print("Habitats:", habitat.keys())
    print("All animals:", habitat.values())
    ```

    </details>

---
---

## 4. Sets

A **set** is an unordered, mutable collection of unique items. Sets are defined using curly braces `{}` and do not allow duplicate elements.

### Key Set Operations
- **Adding**: Add items with `add()`.
- **Removing**: Remove items with `discard()` or `remove()`.
- **Set Operations**: Use union (`|`), intersection (`&`), and difference (`-`).

### Example: Animal Set
```python
# Create a set of unique animals
unique_animals = {"lion", "tiger", "zebra", "elephant"}
print("Animals:", unique_animals)

# Add an animal to the set
unique_animals.add("giraffe")
print("After adding giraffe:", unique_animals)

# Remove an animal
unique_animals.discard("tiger")
print("After discarding tiger:", unique_animals)

# Intersection of sets (common animals in both habitats)
savanna_animals = {"lion", "zebra", "elephant", "giraffe"}
forest_animals = {"deer", "bear", "owl", "elephant"}
print("Common animals:", savanna_animals & forest_animals)
```

### Exercise 4: Set Operations
1. Create a set called `farm_animals` with animals like `"cow"`, `"chicken"`, and `"sheep"`.
2. Add `"duck"` and `"goat"` to the set.
3. Create another set called `wild_animals` with `"lion"`, `"tiger"`, and `"bear"`.
4. Find and print the union of `farm_animals` and `wild_animals`.
5. Check if `"cow"` is in the `wild_animals` set.
6. <details>
   <summary>Solution...</summary>

    ```python
    farm_animals = {"cow", "chicken", "sheep"}
    farm_animals.update(["duck", "goat"])
    wild_animals = {"lion", "tiger", "bear"}
    print("Union of animals:", farm_animals | wild_animals)
    print("Is 'cow' a wild animal?", "cow" in wild_animals)
    ```

    </details>

---
---

## 5. Advanced: Nested Data Structures

Python allows nesting of data structures, which means you can have lists of dictionaries, sets of tuples, and other complex combinations.

### Example: Nested Dictionary of Animal Facts
```python
# Dictionary containing animal facts
animal_facts = {
    "lion": {"type": "mammal", "lifespan": 15, "diet": "carnivore"},
    "parrot": {"type": "bird", "lifespan": 50, "diet": "herbivore"},
    "shark": {"type": "fish", "lifespan": 30, "diet": "carnivore"}
}
print("Lion's diet:", animal_facts["lion"]["diet"])
print("Parrot's lifespan:", animal_facts["parrot"]["lifespan"])
```

### Exercise 5: Working with Nested Data Structures
1. Create a dictionary called `zoo` where each key is an animal's name and each value is another dictionary with keys `"class"` (e.g., `"mammal"`, `"bird"`), `"habitat"`, and `"diet"`.
2. Print the habitat of a specific animal.
3. Add a new animal to the `zoo` dictionary with its details.
4. <details>
   <summary>Solution...</summary>


    ```python
    zoo = {
        "lion": {"class": "mammal", "habitat": "savanna", "diet": "carnivore"},
        "parrot": {"class": "bird", "habitat": "tropical", "diet": "herbivore"},
        "shark": {"class": "fish", "habitat": "ocean", "diet": "carnivore"}
    }

    # Accessing specific information
    print("Parrot's habitat:", zoo["parrot"]["habitat"])

    # Adding a new animal
    zoo["elephant"] = {"class": "mammal", "habitat": "savanna", "diet": "herbivore"}
    print("Updated zoo:", zoo)
    ```

    </details>

---

### Example: Nested Lists and Dictionaries

You can also use lists within dictionaries to store multiple related items.

```python
# Example of a dictionary where each animal has a list of traits
animal_traits = {
    "lion": {"class": "mammal", "traits": ["carnivore", "strong", "social"]},
    "elephant": {"class": "mammal", "traits": ["herbivore", "large", "intelligent"]},
    "owl": {"class": "bird", "traits": ["nocturnal", "hunter", "silent"]}
}

# Access the traits of the lion
print("Lion's traits:", animal_traits["lion"]["traits"])
```

### Exercise 6: Complex Nested Structures
1. Create a dictionary called `habitat_info` where each habitat (e.g., `"forest"`, `"ocean"`) contains a list of animal dictionaries. Each animal dictionary should include `"name"`, `"class"`, and `"diet"`.
2. Add two habitats and at least two animals per habitat.
3. Access the diet of an animal within a specific habitat.
4. <details>
   <summary>Solution...</summary>

    ```python
    habitat_info = {
        "forest": [
            {"name": "bear", "class": "mammal", "diet": "omnivore"},
            {"name": "owl", "class": "bird", "diet": "carnivore"}
        ],
        "ocean": [
            {"name": "shark", "class": "fish", "diet": "carnivore"},
            {"name": "whale", "class": "mammal", "diet": "herbivore"}
        ]
    }

    # Access the diet of the bear in the forest
    for animal in habitat_info["forest"]:
        if animal["name"] == "bear":
            print("Bear's diet:", animal["diet"])
    ```

    </details>

---
---

## 6. This section provides additional practice with advanced operations on different data structures: **Lists**, **Dictionaries**, **Sets**, and **Tuples**.


### Exercise 7: Practicing Push, Pop, and Other Operations

For each of the following Parts, create a differently named file i.e. `part1.py`

#### Part 1: Lists - Appending, Removing, and Inserting
1. Create a list called `animals` with the values `["lion", "tiger", "elephant"]`.
2. **Append** `"giraffe"` to the end of the list.
3. **Insert** `"panda"` at the second position in the list.
4. **Pop** the last item from the list and print the item that was removed.
5. Remove `"tiger"` by value from the list.
6. Print the final list.
7.  <details>
    <summary>Solution...</summary>

    ```python
    animals = ["lion", "tiger", "elephant"]
    animals.append("giraffe")
    animals.insert(1, "panda")
    removed_animal = animals.pop()
    print("Removed:", removed_animal)
    animals.remove("tiger")
    print("Final list:", animals)
    ```

    </details>

---

#### Part 2: Dictionaries - Adding, Updating, and Popping Items
1. Create a dictionary called `bird_habitats` with keys `"sparrow"`, `"eagle"`, and `"penguin"` and assign each an appropriate habitat (e.g., `"forest"`, `"mountain"`, `"ice"`).
2. Add a new bird `"parrot"` with habitat `"rainforest"`.
3. Update the habitat of `"sparrow"` to `"grassland"`.
4. **Pop** `"penguin"` from the dictionary and print its habitat.
5. Print the final dictionary.
6. <details>
   <summary>Solution...</summary>

    ```python
    bird_habitats = {"sparrow": "forest", "eagle": "mountain", "penguin": "ice"}
    bird_habitats["parrot"] = "rainforest"
    bird_habitats["sparrow"] = "grassland"
    penguin_habitat = bird_habitats.pop("penguin")
    print("Penguin's habitat:", penguin_habitat)
    print("Final dictionary:", bird_habitats)
    ```

    </details>

---

#### Part 3: Sets - Adding, Discarding, and Popping Elements
1. Create a set called `farm_animals` with `"cow"`, `"chicken"`, and `"sheep"`.
2. **Add** `"duck"` and `"goat"` to the set.
3. **Discard** `"chicken"` from the set.
4. **Pop** an element from the set (note that sets are unordered, so any element could be removed) and print the removed element.
5. Print the final set.
6. <details>
   <summary>Solution...</summary>

    ```python
    farm_animals = {"cow", "chicken", "sheep"}
    farm_animals.add("duck")
    farm_animals.add("goat")
    farm_animals.discard("chicken")
    removed_animal = farm_animals.pop()  # Popped element is random
    print("Removed animal:", removed_animal)
    print("Final set:", farm_animals)
    ```

    </details>

---

#### Part 4: Tuples - Converting to List for Modifications and Back
1. Create a tuple called `ocean_animals` with `("shark", "whale", "dolphin")`.
2. Convert `ocean_animals` to a list.
3. Add `"octopus"` to the list.
4. Remove `"whale"` from the list.
5. Convert the list back to a tuple and print the final tuple.
6. <details>
   <summary>Solution...</summary>

    ```python
    ocean_animals = ("shark", "whale", "dolphin")
    ocean_animals_list = list(ocean_animals)
    ocean_animals_list.append("octopus")
    ocean_animals_list.remove("whale")
    ocean_animals = tuple(ocean_animals_list)
    print("Final tuple:", ocean_animals)
    ```

    </details>
