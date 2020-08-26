package org.example.business.mapper

import org.assertj.core.api.Assertions.assertThat
import org.example.api.dto.UserRequestDto
import org.example.api.dto.UserResponseDto
import org.example.business.bo.UserBo
import org.example.database.entity.UserEntity
import org.example.utils.annotations.UnitTest
import org.junit.jupiter.api.Test

@UnitTest
class UserMapperTest {

    private val cut = UserMapper()

    private val sampleUserEntity = UserEntity(
        id = "1",
        name = "Test"
    )
    private val sampleUserBo = UserBo(
        id = "1",
        name = "Test"
    )
    private val sampleUserRequestDto = UserRequestDto(
        name = "Test"
    )
    private val sampleUserResponseDto = UserResponseDto(
        id = "1",
        name = "Test"
    )

    @Test
    fun `maps a userEntity to a userBo`() {
        val result = cut.mapUserEntityToUserBo(sampleUserEntity)
        assertThat(result).isEqualTo(sampleUserBo)
    }

    @Test
    fun `maps a userBo to a userEntity`() {
        val result = cut.mapUserBoToUserEntity(sampleUserBo)
        assertThat(result).isEqualTo(sampleUserEntity)
    }

    @Test
    fun `maps a userBo to a userResponseDto`() {
        val result = cut.mapUserBoToUserResponseDto(sampleUserBo)
        assertThat(result).isEqualTo(sampleUserResponseDto)
    }

    @Test
    fun `maps a userRequestDto to a userBo`() {
        val result = cut.mapUserRequestDtoToUserBo(sampleUserRequestDto)
        assertThat(result.name).isEqualTo(sampleUserBo.name)
    }
}
