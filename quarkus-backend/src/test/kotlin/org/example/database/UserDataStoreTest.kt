package org.example.database

import io.mockk.Called
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.example.business.bo.UserBo
import org.example.business.exceptions.PersistenceFailedException
import org.example.business.exceptions.UserNotFoundException
import org.example.business.mapper.UserMapper
import org.example.database.entity.UserEntity
import org.example.utils.annotations.UnitTest
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@UnitTest
class UserDataStoreTest {

    private val userRepository: UserRepository = mockk()
    private val userMapper: UserMapper = mockk()

    private val cut = UserDataStore(userRepository, userMapper)

    private val sampleUserEntity = UserEntity(
        id = "1",
        name = "Test"
    )
    private val sampleUserBo = UserBo(
        id = "1",
        name = "Test"
    )

    @Nested
    inner class FindAllUsers {
        @Test
        fun `find all users`() {
            every { userRepository.listAll() } returns listOf(sampleUserEntity)
            every { userMapper.mapUserEntityToUserBo(sampleUserEntity) } returns sampleUserBo

            val result = cut.findAllUsers()

            assertThat(result).hasSize(1)
            assertThat(result).containsExactly(sampleUserBo)

            verify { userRepository.listAll() }
            verify { userMapper.mapUserEntityToUserBo(sampleUserEntity) }
        }

        @Test
        fun `return empty list if no user exists`() {
            every { userRepository.listAll() } returns emptyList()

            val result = cut.findAllUsers()

            assertThat(result).hasSize(0)

            verify { userRepository.listAll() }
            verify { userMapper.mapUserEntityToUserBo(any()) wasNot Called }
        }
    }

    @Nested
    inner class SaveUser {
        @Test
        fun `save a new user`() {
            every { userRepository.persist(sampleUserEntity) } returns Unit
            every { userRepository.isPersistent(sampleUserEntity) } returns true
            every { userMapper.mapUserBoToUserEntity(sampleUserBo) } returns sampleUserEntity

            val result = cut.persistUser(sampleUserBo)

            assertThat(result).isEqualTo(sampleUserBo)

            verify { userRepository.persist(sampleUserEntity) }
            verify { userMapper.mapUserBoToUserEntity(sampleUserBo) }
        }

        @Test
        fun `save a new user failed`() {
            every { userRepository.persist(sampleUserEntity) } returns Unit
            every { userRepository.isPersistent(sampleUserEntity) } returns false
            every { userMapper.mapUserBoToUserEntity(sampleUserBo) } returns sampleUserEntity

            assertThrows(PersistenceFailedException::class.java) {
                cut.persistUser(sampleUserBo)
            }

            verify { userRepository.persist(sampleUserEntity) }
            verify { userMapper.mapUserBoToUserEntity(sampleUserBo) }
        }
    }

    @Nested
    inner class DeleteUser {
        @Test
        fun `delete a user`() {
            every { userRepository.findById("1") } returns sampleUserEntity
            every { userRepository.delete(sampleUserEntity) } returns Unit
            every { userMapper.mapUserEntityToUserBo(sampleUserEntity) } returns sampleUserBo

            val result = cut.deleteUser("1")

            assertThat(result).isEqualTo(sampleUserBo)

            verify { userRepository.findById("1") }
            verify { userRepository.delete(sampleUserEntity) }
            verify { userMapper.mapUserEntityToUserBo(sampleUserEntity) }
        }

        @Test
        fun `delete a user failed because it not exists`() {
            every { userRepository.findById("1") } throws UserNotFoundException("1")

            assertThrows(UserNotFoundException::class.java) {
                cut.deleteUser("1")
            }

            verify { userRepository.findById("1") }
            verify(exactly = 0) { userRepository.delete("1") }
            verify(exactly = 0) { userMapper.mapUserEntityToUserBo(any()) }
        }
    }
}
