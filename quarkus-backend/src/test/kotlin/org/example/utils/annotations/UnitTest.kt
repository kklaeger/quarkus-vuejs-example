package org.example.utils.annotations

import org.junit.jupiter.api.Tag

@Retention
@Target(AnnotationTarget.CLASS)
@Tag("unit-test")
annotation class UnitTest
