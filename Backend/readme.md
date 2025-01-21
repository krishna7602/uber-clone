# User Registration Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object with the following structure:

```json
{
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "email": "string",
    "password": "string"

    
/**
 * @api {post} /users/login Login User
 * @apiName LoginUser
 * @apiGroup User
 * 
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 * 
 * @apiSuccess {Object} user User object.
 * @apiSuccess {String} token Authentication token.
 * 
 * @apiError {Object[]} errors Validation errors.
 * @apiError {String} message Error message.
 * 
 * @apiExample {json} Request-Example:
 *     {
 *       "email": "user@example.com",
 *       "password": "password123"
 *     }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "_id": "60c72b2f9b1e8b001c8e4b8a",
 *         "email": "user@example.com",
 *         "firstName": "John",
 *         "lastName": "Doe"
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errors": [
 *         {
 *           "msg": "Invalid value",
 *           "param": "email",
 *           "location": "body"
 *         }
 *       ]
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "User not found"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Incorrect Password"
 *     }
 */
}
```

### Validation Rules
- `fullName.firstName`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**:
    ```json
    {
        "user": {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "email": "string",
            "createdAt": "string",
            "updatedAt": "string"
        },
        "token": "string"
    }
    ```

### Error
- **Status Code**: `400 Bad Request`
### GET /users/profile

- **Description**: Retrieves the profile information of the authenticated user.
- **Authentication Required**: Yes
- **Response Body**:
    - `user`: Object containing user details.

### POST /users/logout

- **Description**: Logs out the authenticated user by clearing the authentication token and blacklisting it.
- **Authentication Required**: Yes
- **Response Body**:
    - `message`: Confirmation message indicating successful logout.

## Example Request
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}'
```

## Example Response
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```