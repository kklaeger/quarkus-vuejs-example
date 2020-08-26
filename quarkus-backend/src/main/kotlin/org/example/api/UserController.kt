package org.example.api

import javax.transaction.Transactional
import javax.validation.Valid
import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response
import org.example.api.dto.UserRequestDto
import org.example.api.dto.UserResponseDto
import org.example.business.UserService
import org.example.business.mapper.UserMapper

/**
 * REST Controller to handle requests regarding the users.
 */
@Path("/user")
class UserController(
    private val userService: UserService,
    private val userMapper: UserMapper
) {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getAllUsers(): List<UserResponseDto> = userService.getAllUsers()

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    fun saveUser(@Valid userRequestDto: UserRequestDto): Response {
        val response = userService.saveUser(userMapper.mapUserRequestDtoToUserBo(userRequestDto))
        return Response.ok(response).status(201).build()
    }
}
