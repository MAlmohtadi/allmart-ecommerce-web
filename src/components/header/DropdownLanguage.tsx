// react
import { Fragment, useMemo } from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

// application
import Dropdown from './Dropdown';
import languages from '../../i18n';
import { ILanguage } from '../../interfaces/language';
import { useLanguage, useLocaleChange } from '../../store/locale/localeHooks';

interface DropdownLanguageItem {
    title: string;
    language: ILanguage;
    icon: string;
}

function DropdownLanguage() {
    const language = useLanguage();
    const localeChange = useLocaleChange();

    const items: DropdownLanguageItem[] = useMemo(() => (
        languages.map((eachLanguage) => ({
            title: eachLanguage.name,
            language: eachLanguage,
            icon: eachLanguage.icon,
        }))
    ), []);

    const title = (
        <Fragment>
            <FormattedMessage id="topbar.language" defaultMessage="Language" />
            {': '}
            <span className="topbar__item-value">{language.code}</span>
        </Fragment>
    );

    return (
        <Dropdown
            title={title}
            items={items}
            withIcons
            onClick={(item) => localeChange(item.language.locale)}
        />
    );
}

export default DropdownLanguage;
