package org.example.business.bo

import javax.persistence.Id

/**
 * A Business object for a user.
 */
data class UserBo(
    @Id
    val id: String? = null,
    val name: String
)
