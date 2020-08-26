package org.example.business.mapper

import javax.enterprise.context.ApplicationScoped
import org.example.api.dto.UserRequestDto
import org.example.api.dto.UserResponseDto
import org.example.business.bo.UserBo
import org.example.database.entity.UserEntity

/**
 * A mapper that maps the different objects to the other layers.
 */
@ApplicationScoped
class UserMapper {
    fun mapUserEntityToUserBo(entity: UserEntity) = UserBo(
        id = entity.id,
        name = entity.name
    )

    fun mapUserBoToUserEntity(bo: UserBo) = UserEntity(
        id = bo.id!!,
        name = bo.name
    )

    fun mapUserBoToUserResponseDto(bo: UserBo) = UserResponseDto(
        id = bo.id!!,
        name = bo.name
    )

    fun mapUserRequestDtoToUserBo(dto: UserRequestDto) = UserBo(name = dto.name)
}
