package org.example.business.mapper

import org.assertj.core.api.Assertions.assertThat
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
    private val sampleUserResponseDto = UserResponseDto(
        id = "1",
        name = "Test"
    )

    @Test
    fun `maps an userEntity to an userBo`() {
        val result = cut.mapUserEntityToUserBo(sampleUserEntity)
        assertThat(result).isEqualTo(sampleUserBo)
    }

    @Test
    fun `maps an userBo to an userResponseDto`() {
        val result = cut.mapUserBoToUserResponseDto(sampleUserBo)
        assertThat(result).isEqualTo(sampleUserResponseDto)
    }
}
