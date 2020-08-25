package org.example.business.mapper

import javax.enterprise.context.ApplicationScoped
import org.example.api.dto.UserResponseDto
import org.example.business.bo.UserBo
import org.example.database.entity.UserEntity

@ApplicationScoped
class UserMapper {
    fun mapUserEntityToUserBo(entity: UserEntity) = UserBo(entity.id, entity.name)

    fun mapUserBoToUserResponseDto(bo: UserBo) = UserResponseDto(bo.id, bo.name)
}
