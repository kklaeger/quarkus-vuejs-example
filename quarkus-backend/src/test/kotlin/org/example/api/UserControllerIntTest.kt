package org.example.api

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import io.quarkus.test.Mock
import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import javax.enterprise.inject.Produces
import javax.ws.rs.core.MediaType
import org.example.api.dto.UserRequestDto
import org.example.api.dto.UserResponseDto
import org.example.business.UserService
import org.example.business.bo.UserBo
import org.example.business.mapper.UserMapper
import org.example.utils.annotations.IntegrationTest
import org.hamcrest.CoreMatchers.`is`
import org.junit.jupiter.api.Test

val userService: UserService = mockk()
val userMapper: UserMapper = mockk()

@IntegrationTest
@QuarkusTest
class UserControllerIntTest {

    @Produces
    @Mock
    fun userService(): UserService = userService

    @Produces
    @Mock
    fun userMapper(): UserMapper = userMapper

    private val sampleUserBo = UserBo(
        id = "1",
        name = "Test"
    )
    private val sampleUserResponseDto = UserResponseDto(
        id = "1",
        name = "Test"
    )
    private val sampleUserRequestDto = UserRequestDto(
        name = "Test"
    )

    @Test
    fun `get all users`() {
        every { userService.getAllUsers() } returns listOf(sampleUserResponseDto)

        given()
            .`when`().get("/user")
            .then()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .body("$.size()", `is`(1),
                "[0].id", `is`("1"),
                "[0].name", `is`("Test"))

        verify { userService.getAllUsers() }
    }

    @Test
    fun `return empty list if no user exists`() {
        every { userService.getAllUsers() } returns emptyList()

        given()
            .`when`().get("/user")
            .then()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .body("$.size()", `is`(0))

        verify { userService.getAllUsers() }
    }

    @Test
    fun `save a new user`() {
        every { userService.saveUser(sampleUserBo) } returns sampleUserResponseDto
        every { userMapper.mapUserRequestDtoToUserBo(sampleUserRequestDto) } returns sampleUserBo

        val requestBody = """
                {
                  "name": "Test"
                }
            """

        given().contentType(ContentType.JSON)
            .body(requestBody)
            .post("/user")
            .then()
            .statusCode(201)
            .contentType(MediaType.APPLICATION_JSON)
            .body("id", `is`("1"),
                "name", `is`("Test"))

        verify { userService.saveUser(sampleUserBo) }
    }

    @Test
    fun `delete a user`() {
        every { userService.deleteUser("1") } returns sampleUserResponseDto
        every { userMapper.mapUserRequestDtoToUserBo(sampleUserRequestDto) } returns sampleUserBo

        given().contentType(ContentType.JSON)
            .delete("/user/1")
            .then()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .body("id", `is`("1"),
                "name", `is`("Test"))

        verify { userService.deleteUser("1") }
    }
}
