package org.example.database

import io.quarkus.hibernate.orm.panache.kotlin.PanacheRepositoryBase
import javax.enterprise.context.ApplicationScoped
import org.example.database.entity.UserEntity

/**
 * Repository to store the users.
 */
@ApplicationScoped
class UserRepository : PanacheRepositoryBase<UserEntity, String>
