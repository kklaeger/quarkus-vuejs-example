package org.example.database

import javax.enterprise.context.ApplicationScoped
import org.example.business.bo.UserBo
import org.example.business.mapper.UserMapper

@ApplicationScoped
class UserDataStore(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) {
    fun findAllUsers(): List<UserBo> = userRepository.listAll().map { userMapper.mapUserEntityToUserBo(it) }
}
