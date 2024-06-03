export type Image = {
  alt: string;
  src: string;
};

export type Message = {
  text: string;
  isMine?: boolean;
  images?: Image[];
};
