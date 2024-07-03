import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PostsModule } from './resources/posts/posts.module';
import { PostModule } from './admin/post/post.module';
import { CategoryModule } from './admin/category/category.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { MagazineModule } from './admin/magazine/magazine.module';
import { MagazinesModule } from './resources/magazines/magazines.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './admin/image/image.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule,
    PostModule,
    CategoryModule,
    CategoriesModule,
    MagazineModule,
    MagazinesModule,
    PrismaModule,
    ImageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
