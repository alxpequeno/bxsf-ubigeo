import { District } from './district.interface';

export interface Province {
    code: string;
    name: string;
    districts?: District[]
}