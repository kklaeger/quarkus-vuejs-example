package org.example.api

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import org.example.api.dto.UserResponseDto
import org.example.business.UserService

@Path("/user")
class UserController(
    private val userService: UserService
) {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getAllUsers(): List<UserResponseDto> = userService.getAllUsers()
}
