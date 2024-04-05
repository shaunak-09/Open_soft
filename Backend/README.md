### Instructions

Follow these instructions to run the server:

- Install the required packages:
    ```sh
    npm install --save
    ```
- Start the server with the following command:
    ```sh
    npm run server
    ```

**Note**: The server runs in port 8080

# Movie API Routes

## Route: POST /create

**Description:** Create a new movie.

**Payload:**
```json
{
    "title": "Example Movie",
    "year": 2023,
    "runtime": 120,
    "released": "2023-03-28",
    "poster": "example_poster.jpg",
    "plot": "Example plot description",
    "fullplot": "Example full plot description",
    "lastupdated": "2023-03-28T12:00:00Z",
    "type": "movie",
    "directors": ["Director 1", "Director 2"],
    "writers": ["Writer 1", "Writer 2"],
    "awards": "Example awards",
    "imdb": {
        "id": "tt1234567",
        "rating": 7.5
    },
    "cast": ["Actor 1", "Actor 2"],
    "countries": ["USA", "UK"],
    "languages": ["English", "Spanish"],
    "genres": ["Action", "Adventure"],
    "tomatoes": {
        "viewer": {
            "rating": 8.0
        }
    },
    "num_mflix_comments": 100,
    "plot_embedding": "example_embedding"
}

```

## Route: GET /movie

**Description:** Fetch a movie by its title.

**Query Parameters:**
```json
{
    "title": "Example Movie"
}
```
## Route: PUT /movie

**Description:** Update a movie by its title.

**Payload:**
```json
{
    "title": "Example Movie",
    "genres": ["New Genre"]
}

```

## Route: GET /id/:id

**Description:** Fetch a movie by its id.

**Path Parameters:**
```json
{
    "id": "ExampleId"
}

```

## Route: GET /language

**Description:** Fetch a movie by its language.

**Query Parameters:**
```json
{
    "language": "Example Language"
}
```

## Route:  GET /genres

**Description:**  Get movies by genre.

**Query Parameters:**
```json
{
   "genre": "Action"
}
```
## Route: GET /gethits

**Description:** Fetch the number of hits for a specific movie.

**Query Parameters:**
```json
{
    "title": "Example Movie"
}
```
## Route: GET /latest

**Description:** Fetch the latest released movies.

**Query Parameters:** NONE

## Route: DELETE /:id


**Description:** Delete a movie by its ID.


**Path Parameters:**
```json
{
    "id": "ExampleId"
}

```
## Route: GET /update-language-and-genre-models

**Description:** Trigger an update for the language and genre models.

**Query Parameters:** NONE



---

# Payment API Routes


## Route: POST /checkout

**Description:** Create a new payment session.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
---
# Profile API Routes

## Route: GET /profile

**Description:** Fetch the profile of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
## Route: DELETE /profile

**Description:** Delete the profile of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
## Route: PUT /profile

**Description:** Update the profile of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Query Parameters:**
```json
{
    "name": "New Name",
    "email": "newemail@example.com"
}
```
---

# Rent API Routes

## Route: POST /rent

**Description:** Rent a movie.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload**
```json
{
    "movieId": "ExampleMovieId"
}
```

## Route: DELETE /rent

**Description:** Return a rented movie.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload**
```json
{
    "movieId": "ExampleMovieId"
}
```

## Route: GET /rent

**Description:** Get the rented movies of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
---

# Review API Routes

## Route: POST /review

**Description:** Post a review for a movie.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload:**
```json

{
"movieId": "ExampleMovieId",
    "review": "This is an example review."
}
```
## Route: DELETE /review

**Description:**  Delete a review.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload:**
```json

{
    "reviewId": "ExampleReviewId"
}
```
## Route: GET /review

**Description:** Get the reviews for a movie.

**Query Parameters:**
```json
{
    "movieId": "ExampleMovieId"
}
```
---

# Subscription API Routes

## Route: POST /subscription

**Description:** Subscribe to a movie.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload:**
```json

{
    "movieId": "ExampleMovieId"
}
```

## Route: GET /subscription

**Description:** Get the subscriptions of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```

## Route:  DELETE /subscription

**Description:** Unsubscribe from a movie.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
**Payload:**
```json

{
    "movieId": "ExampleMovieId"
}
```
---
# Users API Routes

## Route: POST /users

**Description:** Register a new user.

**Payload:**
```json
{
    "name": "Example Name",
    "email": "example@example.com",
    "password": "ExamplePassword"
}
```

## Route: POST /users/login

**Description:** Login a user.

**Payload:**
```json
{
    "email": "example@example.com",
    "password": "ExamplePassword"
}
```
## Route:  GET /users/me

**Description:** Get the profile of the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```

## Route:  POST /users/logout

**Description:** Logout the current user.

**Headers:**
```json
{
    "Authorization": "Bearer token"
}
```
---