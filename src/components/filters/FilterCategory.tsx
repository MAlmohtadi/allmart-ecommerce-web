// @ts-nocheck
// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import { ICategory } from '../../interfaces/main';
import { useRouter } from 'next/router';
import url from '../../services/url';

interface Props{
    categories?: ICategory[]
}
function FilterCategory(props: Props) {
    const { categories } = props;
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const categoriesList = categories?.map((category) => {
        const itemClasses = classNames('filter-categories__item filter-categories__item--child'
        // ,
        //  {
        //     'filter-categories__item--current': data.value === category.slug,
        // }
        );

        return (
            <Fragment key={category.id}>
                {/* {getCategoryParents(category).map((parent) => (
                    <li key={parent.id} className="filter-categories__item filter-categories__item--parent">
                        <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
                        <AppLink href={url.category(parent)}>{parent.name}</AppLink>
                    </li>
                ))} */}
                <li className={itemClasses}>
                    <AppLink href={url.exportCategory(category.id,locale)}>{category.name}</AppLink>
                </li>
                {/* {category.children && category.children.map((child) => (
                    <li key={child.id} className="filter-categories__item filter-categories__item--child">
                        <AppLink href={url.category(child)}>{child.name}</AppLink>
                    </li>
                ))} */}
            </Fragment>
        );
    });

    // if (data.value) {
    //     categoriesList.unshift(
    //         <li key="[shop]" className="filter-categories__item filter-categories__item--parent">
    //             <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
    //             <AppLink href={url.catalog()}>All Products</AppLink>
    //         </li>,
    //     );
    // }

    return (
        <div className="filter-categories">
            <ul className="filter-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

export default FilterCategory;
