// application
import AppLink from '../shared/AppLink';
import BlockHeader from '../shared/BlockHeader';
import url from '../../services/url';
import { ICategory } from '../../interfaces/category';

export type BlockCategoriesLayout = 'classic' | 'compact';

export interface BlockCategoriesProps {
    title: string;
    categories?: ICategory[];
    layout?: BlockCategoriesLayout;
}

function BlockCategories(props: BlockCategoriesProps) {
    const { title, layout = 'classic', categories = [] } = props;

    const categoriesList = categories.map((category, index) => {
        const classes = `block-categories__item category-card category-card--layout--${layout}`;
        const { children }: { children?: ICategory[] } = category;

        const subcategories = children && children.map((sub, subIndex) => (
            <li key={subIndex}>
                <AppLink href={url.category(sub)}>{sub.name}</AppLink>
            </li>
        ));

        return (
            <div key={index} className={classes}>
                <div className=" category-card__body">
                    <div className=" category-card__image">
                        <AppLink href={url.category(category)}>
                            <img src={category.image} alt="" />
                        </AppLink>
                    </div>
                    <div className=" category-card__content">
                        <div className=" category-card__name">
                            <AppLink href={url.category(category)}>{category.name}</AppLink>
                        </div>
                        <ul className="category-card__links">
                            {subcategories}
                        </ul>
                        <div className="category-card__all">
                            <AppLink href={url.category(category)}>Show All</AppLink>
                        </div>
                        <div className="category-card__products">
                            {`${category.items} Products`}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories block-categories--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-categories__list">
                    {categoriesList}
                </div>
            </div>
        </div>
    );
}

export default BlockCategories;
