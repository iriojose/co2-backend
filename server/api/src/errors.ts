//ERROR HANDLERS
//MESSAGGES AND CODES

/**
 * Ok response, all ok and the response its correct
 * @field message: OK
 * @field code: 200
 */
export const Ok = {
    message: "Ok",
    code: 200
}
/**
 * Created response, was created a new resource on the API
 * @field message: Record created
 * @field code: 201
 */
export const Created = {
    message: "Record created",
    code: 201
}

/**
 * Update response, was updated a resource on the API
 * @field message: Record updated
 * @field code: 201
 */
export const Update = {
    message: "Record updated",
    code: 201
}

/**
 * Deleted response, was deleted a resource on the API
 * @field message: Record deleted
 * @field code: 200
 */
export const Deleted = {
    message: "Record deleted",
    code: 200
}

/**
 * Empty response, the result of the request its empty
 * @field message: This etity is empty
 * @field code: 200
 */
export const Empty = {
    message: "This entity is empty",
    code: 200
}

/**
 * Invalid ID response, the given id is not on the correct format
 * @field message: The given id is not valid
 * @field code: 400
 */
export const InvalidID = {
    message: "The given id is not valid",
    code: 400
}

/**
 * Bad request response, The request was incorrect, the data or the query was incorrect
 * @field message: Bad Request
 * @field code: 400
 */
export const BadRequest = {
    message: "Bad Request",
    code: 400
}

/**
 * Unauthorized response, the given credentials are invalids or not credentials on the request
 * @field message: The credentials are ivalids
 * @field code: 401
 */
export const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}

/**
 * Forbidden response, the user haven't permisions to use this route
 * @field message: You are not allowed to use this route
 * @field code: 403
 */
export const Forbidden = {
    message: "You are not allowed to use this route",
    code: 403
}

/**
 * Element not found response, the element wanted doesnt exist on the API
 * @field message: the element not exist
 * @field code: 404
 */
export const ElementNotFound = {
    message: "The element not exist",
    code: 404
}

/**
 * Route not found, the route requested doesnt exist
 * @field message: The rout not exist
 * @field code: 404
 */
export const RouteNotFound = {
    message: "The route not exist",
    code: 404
}

/**
 * Bad format response, the format of the data is not the correct
 * @field message: Format incorrect
 * @field code: 406
 */
export const BadFormat = {
    message: "Format incorrect",
    code: 406
}

/**
 * Conflict response, there's a conflict between the resources sent and the existing ones
 * @field message: This entity already exists
 * @field code: 409
 */
export const Conflict = {
    message: "This entity already exists",
    code: 409 
}

/**
 * Internal server error response, something happened on the server
 * @field message: Internal server error
 * @field code: 500
 */
export const InternalServerError = {
    message: "Internal server error",
    code: 500
}
