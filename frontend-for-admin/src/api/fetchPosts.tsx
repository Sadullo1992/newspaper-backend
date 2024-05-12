import { BASE_URL } from '../constants/constants';
import { IArticle, IPost } from '../types/types';

async function fetchPosts(): Promise<IArticle[]> {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data.results;
}

async function fetchPostById(id: string): Promise<IPost> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
}

export { fetchPosts, fetchPostById };
