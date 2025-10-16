export interface Board {
  _id: string;
  title: string;
  members: string[];
}

export interface List {
  _id: string;
  title: string;
  board: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;
}