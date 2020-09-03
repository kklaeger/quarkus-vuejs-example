package org.example.business

import java.util.UUID
import javax.enterprise.context.ApplicationScoped
import org.example.api.dto.UserResponseDto
import org.example.business.bo.UserBo
import org.example.business.mapper.UserMapper
import org.example.database.UserDataStore

/**
 * Service class for the business functionality of the users.
 */
@ApplicationScoped
class UserService(private val userDataStore: UserDataStore, private val userMapper: UserMapper) {

    fun getAllUsers() = userDataStore.findAllUsers().map { userMapper.mapUserBoToUserResponseDto(it) }

    fun saveUser(userBo: UserBo): UserResponseDto {
        val userBoWithId = userBo.copy(id = UUID.randomUUID().toString())
        val createdUser = userDataStore.persistUser(userBoWithId)
        return userMapper.mapUserBoToUserResponseDto(createdUser)
    }

    fun deleteUser(id: String): UserResponseDto {
        return userMapper.mapUserBoToUserResponseDto(userDataStore.deleteUser(id))
    }
}
