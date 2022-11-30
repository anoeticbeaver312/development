# Project Goal

This app provides an interactive dashboard to help workers unionize their workforce. Workers can keep track of the workers in their
bargaining unit and perform simple tasks like adding and removing works from the list. They can also keep track of their status,
such as whether each worker has signed an authorization card or not.

The app keeps track of basic statistics, in this case what percentage of workers have signed authorization cards.

Deployed app: https://development-2cbdgral9-anoetic-beaver-312.vercel.app/

# Components and Props

I use `Next.js` for this project, so there is a `pages` folder with one route, the home page.

Within `components` there are the following components:
- `page-elements/`
  - `DefaultHead`: a default header element that should be in the `<head></head>` of the document.
  - `Header`: a banner that goes at the top of the page.
  - `WorkerListMenu`: a list of the lists the user has created. This takes in a list of the names of 
  the lists as a prop.
- `layout/`
  - `Flex`: a flex container component that takes flexbox parameters as props.
  - `Table`: a table component for rendering the list of workers, or any other tabular data. It takes
  the list of data and headers, as well as functions for updating the data state and adding new data 
  as props.
    - `SortMenu`: handles sorting the table, and takes handlers for ascending and descending sorting
    as props.
- `input/`
  - `Button`: a button component that takes a handler for clicking as a prop, as well as some styling
  parameters.
  - `Dropdown`: a dropdown menu, with props for handling selection and some styling props.
  - `TextField`: a textfield, with props for handling changes and some styling.

# Usability principles

The functionality of this app is quite basic, so I tried to make the layout basic as well. I used two
columns, one for the raw data and one for statistics visualizations. For input, I used a predictable 
flow of input fields on top of a submit button.

