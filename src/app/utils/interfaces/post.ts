export interface Post {
  id?: string;
  author?: string;
  author_name?: string;
  author_nickname?: string;
  tags?: Tag[];
  category?: Category;
  title: string;
  symbol?: string;
  byline?: string;
  background_image?: string;
  slug?: string;
  content: string;
  read_time?: number;
  last_updated?: string;
  date_added?: string | number | Date;
  publish_on?: string | number | Date;
  status?: "DRAFT" | "PUBLISHED" | "PRIVATE" | "ARCHIVED";
  public?: boolean;
  featured?: boolean;
  roles: {
    [key: string]: "owner" | "writer" | "reader" | "commenter",
  };
}

export interface Tag {
  name: string;
}

export interface Category {
  name: string;
}

export interface Comment {
  user?: string;
  content?: string;
  date_added?: string | number | Date;
  last_updated?: string | number | Date;
}

export const dummyPost: Post = {
  title: '',
  content: '',
  public: true,
  roles: {},
};
