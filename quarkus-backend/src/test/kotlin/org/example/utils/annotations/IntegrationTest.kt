package org.example.utils.annotations

import org.junit.jupiter.api.Tag

@Retention
@Target(AnnotationTarget.CLASS)
@Tag("integration-test")
annotation class IntegrationTest
