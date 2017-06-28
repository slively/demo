package com.demo.config

import com.opentable.db.postgres.embedded.EmbeddedPostgres
import org.postgresql.ds.PGSimpleDataSource
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import java.io.File

@Configuration
@Profile("default")
class DefaultConfig {

    @Bean
    fun dataSource(): PGSimpleDataSource {
        val pg = EmbeddedPostgres.builder()
					.setPort(5435)
					.setCleanDataDirectory(true)
					.setDataDirectory(File(System.getProperty("user.dir")+ "/build/pg"))
					.start()
        val ds = PGSimpleDataSource()

        ds.url = pg.getJdbcUrl("postgres", "postgres")
				ds.portNumber = pg.port

        return ds
    }
}
