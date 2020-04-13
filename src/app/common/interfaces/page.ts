import { IUser } from './user';
import { IImage } from './image';

export interface IPage {
  id: string;
  name: string;
  title: string;
  content: string;
  description: string;
  author?: IUser;
  isPublished: boolean;
  createdOn: Date;
  gallery: IImage[];
}
