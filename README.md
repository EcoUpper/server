# Project 2: EcoUpper

## The team: Edna Vidal, Erik Arvid Hosszu, Óscar Mesejo, Juan David Valencia 

### Let's talk about EcoUpper

[Link to EcoUpper] (https://Ecoupper.app)

Introducing EccoUpper: the Ultimate Sustainability App!

Are you ready to embark on an eco-adventure like no other? Say goodbye to wastefulness and embrace the power of sustainability with EcoUpper, the app that's here to revolutionize the way we care our planet! 

Welcome to **EcoUpper**, where ecology meets innovation and sustainability becomes a way of life. With our app, you'll have the keys to unlock a world of environmental goodness and make a real impact. 

First up, our home page with the news section on the latest articles on ecology and climate change, no account needed. But you will want to join the community for even more exciting features. 

Once you sign up and become a part of the EcoUpper family, you will gain access to the **market page**. Here, users generously give away clothing, food, and more, all for free. It is a sustainble treasure trove where where waste becomes a thing of the past. 

But that's not all. Our **events page** is a buzzing hub of activity, where you can discover and contribute to events dedicated to tackling climate change and embracing all things eco friendly.

Also, in the **posts page**, the platform for sharing our eco-thoughts and adventures. Whetther it's breathtaking places to visit, insightful discussions on climate change, or tips for sustainable living, this is where you can connect and inspire others. 

To fully enjoy all the characteristics of **EcoUpper**, simply sign up, become a user and you'll unlock the true potential of our app and join a community of passionate individuals committed to protecting our planet.

### Wireframe

[Link to PP] ()


### Routes 

| Route                                | HTTP Verb | Description                                                                                                      |
| ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `/db/users`                                  | GET       | This route is used to fetch user data from a database. It is an HTTP GET route that returns a list of users. To use the route, simply make an HTTP GET request to the route URL and the server will respond with a list of user data in the response.|
| `/db/users/new`                            | POST      | This route is used to create a new user in the database. It is an HTTP POST route that accepts user data in the request body and adds it to the database. To create a new user with this route, make an HTTP POST request to the route URL with the user data in the request body.|
| `/db/users/:userId`                            | GET      | This route is used to fetch a specific user's data from the database. It is an HTTP GET route that accepts a dynamic parameter `userId` in the  URL and returns the corresponding user data. To fetch a specific user's data, make an HTTP GET request to the route URL with the `userId` as a parameter.|
| `/db/users/:userId`                             | PUT       | This route is used to update a specific user's data in the database. It is an HTTP PUT route that accepts a dynamic parameter `userId` in the URL and the updated user data in the request body. To update a specific user's data, make an HTTP PUT request to the route URL with the `userId` as a parameter and the updated user data in the request body.|
| `/db/users/:userId`                            | POST      | This route is used to create a new user or update an existing user in the database. It is an HTTP POST route that accepts a dynamic parameter `userId` in the URL. If the `userId` exists, it will update the user's data. Otherwise, it will create a new user with the given `userId`.|
| `/db/items/`            | GET       | This route is used to fetch all items from the database. It is an HTTP GET route that does not require any parameters. To fetch all the items, make an HTTP GET request to the route URL.|                                                                                   
| `/db/items/new`                | POST      | This route is used to create a new item in the database. It is an HTTP POST route that does not require any parameters. The item data should be included in the request body. To create a new item, make an HTTP POST request to the route URL.|
| `/db/items/:itemId`         | GET     | This route is used to fetch a specific item from the database. It is an HTTP GET route that accepts a dynamic parameter `itemId` in the URL. the `itemId` is used to identify the item to be fetched. To fectch the specific item, make an HTTP GET request to the route URL with the `itemId` as a parameter.|
| `/db/items/:itemId`        | PUT       | This route is used to update a specific item in the database. It is an HTTP PUT route that that accepts a dynamic parameter `itemId` in the  URL. The `itemId` is used to identify the item to be updated. The updated item data should be included in the request body. To update an specific item, make an HTTP PUT request to the route URL with the `ìtemId` as a parameter and the updated item data in the request body. 
| `/db/items/:itemId` | POST      | This route is used to create a new item or update a specific item in the database. It is an HTTP POST route that accepts a dynamic parameter `itemId` in the  URL. The `itemId` is used to identify the item to be created or updated. The item data should be included in the request body. To create o update a specific item, make an HTTP POST request to the route URL with the `itemId` as a parameter and the item data in the request body.|
| `/db/items/owner/:userId` | GET      | This route is used to fetch all items owned by a specific user from the database. It is an HTTP GET route that accepts a dynamic parameter `userId` in the URL. The `userId` is used to identify the owner of the items to be fetched. To fetch all items by a specific user, make an HTTP GET request to the route URL with the `userId` as a parameter.|
| `/db/proposals/:itemId` | GET      | This route is used to fetch all proposals related to a specific item from the database. It is an HTTP GET route that accepts a dynamic parameter `itemId` in the URL. The `itemId` is used to identify the item for which the proposals should be fetched. To fetch all proposals related to a specific item, make an HTTP GET request to the route URL with the `itemId` as a parameter.|
| `/db/proposals/:itemId/new` | POST      | This route is used to create a new proposal item within the `proposals` resource in the database. The `:itemId` parameter should be replaced with the actual ID of the item you want to create.                                                   |
| `/db/proposals/:propId` | PUT      | This is an HTTP PUT request route used for updating a specific proposal item. By making a PUT request to this route and replacing `:propId` with the ID of the proposal item to update, you can modify the specific item within the database.                                               |
| `/db/posts` | GET    | This route is used to retrieve a list of posts from the database. To use the route, simply make an HTTP GET request to the route URL and the server will respond with a list of posts in the response.|
| `/db/posts/new` | POST      | This HTTP POST request route is used to create a new post in the database. To use it, make a POST request to create a new post, the server will process the request and save the new post in the database. 
| `/db/posts/:postId` | PUT      | This route is used to update an existing post in the database. The `:postId` segment in the route is a placeholder for the given identifier of the post that you want to update.|
| `/db/posts/:postId` | POST      | It will post all of the details of the form such as delete or edit.                                                  |
| `/db/posts/:userId` | GET    | It will render the page containing the posts made by each user in the profile using their respective IDs.|         
| `/db/events` | GET      | This route is used to retrieve events from the server with no parameters.                                                |
| `/db/events/new` | POST    | This route is used to create a new event in the database. 
| `/db/events/:userId` | GET     | This route is used to retrieve events associated with a specific user from the database. The `userId` is a dynamic parameter representing the unique identifier of the user.|
| `/api/news` | GET     | This route is used to retrieve news articles from an API with no specific parameters.|

### Models 

| Model                               | Description                                                                                                      |
| ------------------------------------| ---------------------------------------------------------------------------------------------------------------- |
| User                        | It includes the properties and structure of the user object (name, e-mail, profile image)|
| Item                        | It includes the properties and structure of the item object (description, status, category(clothing, food, other), giver, pick up at.)|
| User                        | It includes the properties and structure of the post object (description, image)
| User                        | It includes the properties and structure of the proposal object (date, starting time)|
| User                        | It includes the properties and structure of the event object (title, date, location, description)|
