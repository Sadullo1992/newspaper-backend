import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('admin/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    this.postService.remove(id);
  }
}
