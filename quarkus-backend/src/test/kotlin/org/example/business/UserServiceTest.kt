package org.example.business

import io.mockk.Called
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.example.api.dto.UserResponseDto
import org.example.business.bo.UserBo
import org.example.business.mapper.UserMapper
import org.example.database.UserDataStore
import org.example.utils.annotations.UnitTest
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@UnitTest
class UserServiceTest {

    private val userDataStore: UserDataStore = mockk()
    private val userMapper: UserMapper = mockk()

    private val cut = UserService(userDataStore, userMapper)

    private val sampleUserBo = UserBo(
        id = "1",
        name = "Test"
    )
    private val sampleUserResponseDto = UserResponseDto(
        id = "1",
        name = "Test"
    )

    @Nested
    inner class GetAllUsers {
        @Test
        fun `get all users`() {
            every { userDataStore.findAllUsers() } returns listOf(sampleUserBo)
            every { userMapper.mapUserBoToUserResponseDto(sampleUserBo) } returns sampleUserResponseDto

            val result = cut.getAllUsers()

            assertThat(result).hasSize(1)
            assertThat(result).containsExactly(sampleUserResponseDto)

            verify { userDataStore.findAllUsers() }
            verify { userMapper.mapUserBoToUserResponseDto(sampleUserBo) }
        }

        @Test
        fun `return empty list if no user exists`() {
            every { userDataStore.findAllUsers() } returns emptyList()

            val result = cut.getAllUsers()

            assertThat(result).hasSize(0)

            verify { userDataStore.findAllUsers() }
            verify { userMapper.mapUserBoToUserResponseDto(any()) wasNot Called }
        }
    }
}
