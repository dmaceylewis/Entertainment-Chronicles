# Entertainment Chronicles

## What is the Entertainment Chronicles?
Entertainment Chronicles is an app that organizes different versions of entertainment like books, movies, and tv series into collections by chronological order.

## Setup: Follow these steps exactly

1. Clone this repository
2. `cd` into the directory it creates
3. Open another terminal window and `cd` into the directory labeled "Entertainment-Chronicles" and run `Start Entertainment-Chronicles.sln`
4. Create the EChronicles database:
### Please open this file or paste to a new SQL query and execute the following code (skip this step if completed in a previous PR):

- [SQL Table Creation Data](https://github.com/dmaceylewis/Entertainment-Chronicles/blob/main/SQL/EChronicles_Create_DB.sql)
- [SQL Seed Data](https://github.com/dmaceylewis/Entertainment-Chronicles/blob/main/SQL/EChronicles_Seed_Data.sql)

5. Open another terminal window and `cd` into "Entertainment-Chronicles/client" and run:
- `npm create vite@latest . -- --template react`
- `npm i react-router-dom` 
- then run `npm install`
- Test to make sure react is working with `npm run dev`

### Login

Upon first running the application, you will be prompted with a login screen. If you want to use an existing account, enter `me@example.com` into the text box and click login. This will take you to the home landing page.

### Home Page

After logging in, you will be brought to the home landing page of Entertainment Chronicles that displays a brief description of the app

### Collections

Clicking on the `Collections` tab in the navbar will bring you to the "Collections List" page. This page will display all collections with buttons to view, edit, and delete a collection.
At the top, there's a button to `Add New Collection` which will direct you to a form to create a new collection.

Clicking on the `eye icon` will direct you to that collection view where you can see all series within.
Clicking on the `pencil icon` will direct you to edit the collection.
Clicking on the `trash can icon` will direct you to delete the collection.

#### Add New Collection

This page displays a "Create a Collection" form where you enter a collection name.
Clicking `Add` will create the collection adding it to the database and directing you to the "Add a Series" form page.
Clicking `Cancel` will direct you back to the Collection List page.

#### Add a Series

This page displays the "Add a Series" form page where you can select which collection you are adding to from a dropdown menu and enter a series name and the series order.
Clicking `Add` will create the new series in that collection and direct you to that collection view page.

### Collection View

This page displays all series within a collection and all books, movies, and/or tv shows within a series.
Under the collection name, there are 3 options to select: 
- `Edit Collection`
  *edit collection name form*
- `Delete Collection`
  *delete collection, series, and everything within*
- `Add New Series`
  *add new series name and order to collection*

Beside each series name are 3 icons to click on: 
- Add: `plus icon`
  *add items (book, movie, and/or tv show) form*
- Edit: `pencil icon`
  *edit series name form*
- Delete: `trash can icon`
  *delete series*

On each book/movie/tv show card, there are 2 options to click on: 
- Edit: `pencil icon` 
- Delete: `trash can icon`. 
 
### Add Items to a Series

Clicking on the `plus icon` beside the series name directs you to the "Add to Series" page where you can select from a dropdown menu whether you want to add a book, movie, or tv show and the respective form will appear below.
Each form allows you to select which series you are adding to.
