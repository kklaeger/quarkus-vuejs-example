package org.example.api.dto

import javax.validation.constraints.NotBlank

data class UserResponseDto(
    @field:NotBlank
    val id: String,
    @field:NotBlank
    val name: String
)
