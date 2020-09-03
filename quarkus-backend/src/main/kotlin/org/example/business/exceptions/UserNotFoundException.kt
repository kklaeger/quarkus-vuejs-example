package org.example.business.exceptions

/**
 * Exception that occurs if a user cannot be found.
 */
class UserNotFoundException(id: String) :
    RuntimeException("User with id $id cannot be found")
