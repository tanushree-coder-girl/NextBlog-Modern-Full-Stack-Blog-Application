export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  _id?: any;
  blogSlug: string;
  name: string;
  comment: string;
}
