package org.example.business

import javax.enterprise.context.ApplicationScoped
import org.example.business.mapper.UserMapper
import org.example.database.UserDataStore

@ApplicationScoped
class UserService(private val userDataStore: UserDataStore, private val userMapper: UserMapper) {

    fun getAllUsers() = userDataStore.findAllUsers().map { userMapper.mapUserBoToUserResponseDto(it) }
}
