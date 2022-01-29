// application
import { ICategory } from '../../interfaces/category';
import { IAdminSettingsResponse, IBanner } from '../../interfaces/hompage';

export const HOME_NAMESPACE = 'home';

export interface HomeState {
    init: boolean;
    homeIsLoading: boolean;
    categories: ICategory[] | null ;
    banners: IBanner[] | null;
    adminSettingsResponse: IAdminSettingsResponse | null;
}
