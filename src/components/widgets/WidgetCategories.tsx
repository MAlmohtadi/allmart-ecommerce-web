// application
import AppLink from '../shared/AppLink';
import ArrowRoundedRight6x9Svg from '../../svg/arrow-rounded-right-6x9.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import url from '../../services/url';
import { ICategory } from '../../interfaces/category';

type RenderCategoryFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

export type WidgetCategoriesLocation = 'blog' | 'shop';

export interface WidgetCategoriesProps {
    categories?: ICategory[];
    location?: WidgetCategoriesLocation;
}

function WidgetCategories(props: WidgetCategoriesProps) {
    const { categories = [], location = 'blog' } = props;
    const categoriesList = categories.map((category) => {
        const renderCategory: RenderCategoryFn = ({ toggle, setItemRef, setContentRef }) => {
            const { children }: { children?: ICategory[] } = category;
            let expander;
            let childrenItems;

            if (children && children.length > 0) {
                expander = (
                    <button
                        className="widget-categories__expander"
                        type="button"
                        aria-label="Expand"
                        onClick={toggle}
                    />
                );

                childrenItems = (
                    <div className="widget-categories__subs" ref={setContentRef}>
                        <ul>
                            {children.map((sub) => (
                                <li key={sub.id}>
                                    <AppLink href={url.category(sub)}>{sub.name}</AppLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }

            return (
                <li className="widget-categories__item" ref={setItemRef}>
                    <div className="widget-categories__row">
                        <AppLink href={url.category(category)}>
                            <ArrowRoundedRight6x9Svg className="widget-categories__arrow" />
                            {category.name}
                        </AppLink>
                        {expander}
                    </div>
                    {childrenItems}
                </li>
            );
        };

        return <Collapse key={category.id} toggleClass="widget-categories__item--open" render={renderCategory} />;
    });

    return (
        <div className={`widget-categories widget-categories--location--${location} widget`}>
            <h4 className="widget__title">Categories</h4>
            <ul className="widget-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

export default WidgetCategories;
