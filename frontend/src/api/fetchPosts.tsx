import { BASE_URL } from '../constants/constants';
import { IArticle, IPost, IResponse } from '../types/types';

async function fetchPosts(currentPage = 1): Promise<IResponse<IArticle[]>> {
  const response = await fetch(`${BASE_URL}/posts/?page=${currentPage}`);
  const data = await response.json();
  return data;
}

async function fetchPostById(id: string): Promise<IPost> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
}

export { fetchPosts, fetchPostById };
