import { ILinkProps } from './link-props';

export interface ILinkMain {
    name: string;
    link?: string | ILinkProps;
    props?: {
        target?: '_blank';
    };
}

export interface INestedLink extends ILinkMain {
    children?: this[];
}
