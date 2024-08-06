import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './admin/category/category.module';
import { ImageModule } from './admin/image/image.module';
import { MagazineModule } from './admin/magazine/magazine.module';
import { PostModule } from './admin/post/post.module';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { MagazinesModule } from './resources/magazines/magazines.module';
import { PostsModule } from './resources/posts/posts.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    PostModule,
    CategoryModule,
    CategoriesModule,
    MagazineModule,
    MagazinesModule,
    PrismaModule,
    ImageModule,
    LoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
