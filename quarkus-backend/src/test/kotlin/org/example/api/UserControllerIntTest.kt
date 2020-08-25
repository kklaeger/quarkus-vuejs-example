package org.example.api

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import io.quarkus.test.Mock
import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import javax.enterprise.inject.Produces
import javax.ws.rs.core.MediaType
import org.example.api.dto.UserResponseDto
import org.example.business.UserService
import org.example.utils.annotations.IntegrationTest
import org.hamcrest.CoreMatchers.`is`
import org.junit.jupiter.api.Test

val userService: UserService = mockk()

@IntegrationTest
@QuarkusTest
class UserControllerIntTest {

    @Produces
    @Mock
    fun userService(): UserService = userService

    private val sampleUserResponseDto = UserResponseDto(
        id = "1",
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
}
