// application
import { IAboutUs, IMenu, ITranslation, IBanner, IFooter, ILanguage, ICategory } from "../../interfaces/main";

export const MAIN_NAMESPACE = "main";

export interface MainState {
    init: boolean;
    isLoading: boolean;
    categories: ICategory[];
    banners: IBanner[];
    languages: ILanguage[];
    aboutUs: IAboutUs;
    menuList: IMenu[];
    footer: IFooter;
    translations: ITranslation;
}
