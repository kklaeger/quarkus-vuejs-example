package org.example.api.dto

import javax.validation.constraints.NotBlank

/**
 * Request object that represents a user.
 */
data class UserRequestDto(
    @field:NotBlank
    val name: String
)
