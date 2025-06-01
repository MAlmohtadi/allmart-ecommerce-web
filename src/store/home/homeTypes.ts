// application
import { ICategory } from '../../interfaces/category';
import { IAdminSettingsResponse, IBanner } from '../../interfaces/homepage';
import {
    IEshopTranslation,
    ILanguage,
} from "../../interfaces/main";

export const HOME_NAMESPACE = 'home';

export interface HomeState {
    init: boolean;
    homeIsLoading: boolean;
    categories: ICategory[] | null ;
    banners: IBanner[] | null;
    adminSettingsResponse: IAdminSettingsResponse | null;
    translations: IEshopTranslation | null;
    languages: ILanguage[] | null;
}
