# EFA-DebugChallenge-ProjOne-COMPLETE BUILD

**Complete Project Build**

- This project will have 3 different APIs that will be called upon.  Each API will have a slightly increased level of difficulty to incorporate into solving, such as the first will not require a key, another will, and the third will need referencing.  Within this project, students will need to fix bugs withing the HTML, CSS, and JS files that are provided.  By the end of the project, they will have a completed app built that will allow them to search a location (by city) to display weather details in a card, three random restaurant locations, if applicable, display if those results don't appear, and generate a random quote at the bottom of the page.

**What this Challenge expects**

- API Keys are still new concepts but it should be understood that they exist and what, generally, how they are used.  Students will be expected to obtain their own FREE API Keys to incorporate into this project in order to get it to work.  This particular build has the keys stored into a keys.js file that has been tagged in the .gitignore so they do not exist in ANY way within the project.  Students can either set their keys within each respected script file or house them in a stored file like this current build.

**What this Challenge is NOT meant to be**

- As much as we all want to make beautiful pages, the focus of this is to practice debugging and working with outside APIs.  Because no two API docs are built the same, it's important to seek out solutions to our specific problems regarding these aspects.

**What SHOULD NOT be altered**

- Although this is a small "playground" to tinker in, there are two main things that should NOT be altered.  This is the MODAL and ASSETS Folder.  No issues will be housed within these branches of code / file names.  However, this doesn't mean that naming conventions may have issues elsewhere in other files.

--------------------------------------------------------------------------------

**Documentation Links**
- Programming Quotes API
    - https://github.com/skolakoda/programming-quotes-api

- Weatherstack API
    - https://weatherstack.com/documentation

- Zomato API
    - https://developers.zomato.com/api#headline1

--------------------------------------------------------------------------------

**ERRORS / CONCEPTS within Files**

- Errors in JS files are denoted with <//? #) description of error>
- Errors in CSS files are detailed in each file.

**Basic Errors:**
- index.html has 3 errors and main.css has 1* error (no imports for other stylesheets).

**Programming Quote:**
- This will populate a random quote at the bottom of the screen.  Users will be able to click a button to fetch a new quote.
- Simple fetch()
- There are a total of 10* errors (6 breaking JS / 2 needing backtracked for Silver & Gold / 2 breaking CSS)

**Weather Stack:**
- Requires API Key
- The user will need to input a US city, click submit and populate a Bootstrap card with various sets of information.
- Async/Await - Fired upon user submission
- There are a total of 14* errors (13 breaking JS / 1 helper JS / 3 breaking CSS)

**Zomato:**
- Requires API Key set into headers
- When the user searches a city for the weather, this will pass that information through search criteria to pull an id.  The id will be used to search a set of collections of a max of 3 different random restaurants in the area.  These will be built using DOM manipulation an displayed under the weather card.
- Async/Await - passed information from API 2 and sorted through two different sources.
- There are a total of 12 errors (10 breaking JS / 2 breaking CSS) *needs to be called in startSearch() in quotes.js
