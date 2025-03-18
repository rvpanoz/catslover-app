type Image = {
  id: string;
  url: string;
};

export type Favourite = {
  id: string;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: Image;
};
