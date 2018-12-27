import { Province } from './province.inteface';

export interface Region {
    code: string;
    name: string;
    provinces?:Province[]
}