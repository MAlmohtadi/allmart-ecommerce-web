// application
import AppLink from '../shared/AppLink';
import BlockHeader from '../shared/BlockHeader';
import url from '../../services/url';
import { ICategory, ISubCategory } from '../../interfaces/homepage';

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
        const { subCategories }: { subCategories?: ISubCategory[] } = category;

        const subcategories = subCategories && subCategories.map((sub, subIndex) => (
            <li key={subIndex}>
                <AppLink href={url.categoryWithSubCategory(category.id, sub.id)}>{sub.name}</AppLink>
            </li>
        ));

        return (
            <div key={index} className={classes}>
                <div className=" category-card__body">
                    <div className=" category-card__image">
                        <AppLink href={url.category(category.id)}>
                            <img src={category.imageUrl} alt="" />
                        </AppLink>
                    </div>
                    <div className=" category-card__content">
                        <div className=" category-card__name">
                            <AppLink href={url.category(category.id)}>{category.name}</AppLink>
                        </div>
                        <ul className="category-card__links">
                            {subcategories}
                        </ul>
                        <div className="category-card__all">
                            <AppLink href={url.category(category.id)}>عرض الكل</AppLink>
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
