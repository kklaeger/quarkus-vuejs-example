package org.example.database.entity

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class UserEntity(
    @Id
    var id: String,
    var name: String
)
