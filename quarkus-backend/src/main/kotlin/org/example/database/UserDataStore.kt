package org.example.database

import javax.enterprise.context.ApplicationScoped
import org.example.business.bo.UserBo
import org.example.business.exceptions.PersistenceFailedException
import org.example.business.mapper.UserMapper

/**
 * Data store that is used to save and find users in a database.
 */
@ApplicationScoped
class UserDataStore(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) {
    fun findAllUsers(): List<UserBo> = userRepository.listAll().map { userMapper.mapUserEntityToUserBo(it) }

    fun persistUser(userBo: UserBo): UserBo {
        val entity = userMapper.mapUserBoToUserEntity(userBo)
        userRepository.persist(entity)
        if (!userRepository.isPersistent(entity))
            throw PersistenceFailedException(entity)
        return userBo
    }
}
