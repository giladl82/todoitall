# Todo it all

I once read this post called [Every time you build a to-do list app, a puppy 🐕 dies](https://medium.freecodecamp.org/every-time-you-build-a-to-do-list-app-a-puppy-dies-505b54637a5d).
So I'd like to apologize to all puppies out there, but this is an example of a simple Todo app.

**I actually built four todo apps.**

- One as a _Class_ component using _State_.
- One as a _Class_ component using _Redux_.
- One as a _Hook_ function component using _State_.
- One as a _Hook_ function component using the _Context_ API and the _useReducer_ hook.

I wanted to see and show the differences in implementations and in testing each type of component.

## Clone the project

```bash
git clone https://github.com/giladl82/todoitall.git
```

## Install dependencies

```bash
npm install
```

## Start the project

```bash
npm run start
```

## Run tests

```bash
npm run test
```

## Folder structure

```
src
├── App          // Container for all examples
├── Classes      // Class component examples
│   ├── Redux
│   └── State
├── Hooks        // Hooks example
│   ├── Reducer
│   └── State
└── state
```

##### Still need to be done:

1. Write test to the reducer / actions.
2. Write test to the custom hook _"useStore"_.
