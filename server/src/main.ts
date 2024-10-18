import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT

  // ** Swagger ** //
  const config = new DocumentBuilder()
    .setTitle('Backend Template')
    .setDescription('REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  // ** CORS ** //
  const allowList = ['http://localhost:5173', 'http://localhost:3000']
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('CORS: Not allowed'), false)
      }
    },
  })

  // ** Helmet ** //
  app.use(helmet())

  // ** PORT ** //
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/')
  })
}

bootstrap().catch((err) => console.log(err))
