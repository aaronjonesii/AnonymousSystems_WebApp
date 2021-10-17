export interface Post {
  id?: string;
  author?: string,
  title?: string,
  content?: string,
  likes?: number,
  date_added?: string | number | Date,
  last_updated?: string | number | Date,
  comments?: PostComment[],
}
export interface PostComment {
  commentBy?: string,
  comment?: string,
  likes?: number,
  date_added?: string | number | Date,
  last_updated?: string | number | Date,
}
