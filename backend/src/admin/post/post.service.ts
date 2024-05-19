import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService extends DatabaseService<Post> {}
