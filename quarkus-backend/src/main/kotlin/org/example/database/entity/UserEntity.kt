package org.example.database.entity

import javax.persistence.Entity
import javax.persistence.Id

/**
 * The entity that is used to store users in a database.
 */
@Entity
data class UserEntity(
    @Id
    var id: String,
    var name: String
)
