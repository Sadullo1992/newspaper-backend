import { BASE_URL } from '../constants/constants';
import { Post, IResponse } from '../types/types';

async function fetchPosts(currentPage = 1): Promise<IResponse<Post[]>> {
  const response = await fetch(`${BASE_URL}/posts/?page=${currentPage}`);
  const data = await response.json();
  return data;
}

async function fetchPostById(id: string): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
}

export { fetchPosts, fetchPostById };
