package org.example.business.exceptions

import org.example.database.entity.UserEntity

/**
 * Exception that occurs if a user cannot be persisted.
 */
class PersistenceFailedException(entity: UserEntity) :
    RuntimeException("User $entity cannot be persisted")
