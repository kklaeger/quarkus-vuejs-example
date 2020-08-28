package org.example

import io.quarkus.runtime.ShutdownEvent
import io.quarkus.runtime.StartupEvent
import javax.enterprise.context.ApplicationScoped
import javax.enterprise.event.Observes
import javax.transaction.Transactional
import org.example.database.UserRepository
import org.example.database.entity.UserEntity
import org.jboss.logging.Logger

/**
 * Initializes the application by adding sample users to the database.
 */
@ApplicationScoped
class AppInitializer(private val userRepository: UserRepository) {
    @Transactional
    fun init(@Observes ev: StartupEvent?) {
        LOGGER.info("Creating dummy data...")
        userRepository.persist(UserEntity("1", "John Doe"))
        userRepository.persist(UserEntity("2", "Peter Miller"))
        userRepository.persist(UserEntity("3", "Jenny Jackson"))
        userRepository.persist(UserEntity("4", "Alice Johnson"))
    }

    fun cleanUp(@Observes ev: ShutdownEvent?) {
        LOGGER.info("Removing dummy data...")
        userRepository.deleteAll()
    }

    companion object {
        private val LOGGER = Logger.getLogger("ListenerBean")
    }
}
