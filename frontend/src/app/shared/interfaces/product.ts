export interface Product {
  id?: string,
  name?: string,
  description?: string,
  color?: string,
  date_added?: number | {
    nanoseconds: number,
    seconds: number,
  },
  images?: [],
  in_stock?: boolean,
  last_updated?: string | number,
  price?: number,
  switch_type?: string
}
