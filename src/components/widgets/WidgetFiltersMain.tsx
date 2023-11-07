// react
import { ReactNode, useCallback } from 'react';

// third-party
import classNames from 'classnames';

// application
import ArrowRoundedDown12x7Svg from '../../svg/arrow-rounded-down-12x7.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import Filter, { FilterChangeValueEvent } from '../filters/Filter';
import { serializeFilterValue, isDefaultFilterValue } from '../../services/filters';
import {
    useShopFilters,
    useShopFilterValues,
    useShopResetFiltersThunk,
    useShopSetFilterValueThunk,
} from '../../store/shop/shopHooks';
import { ICategory } from '../../interfaces/main';
import FilterCategory from '../filters/FilterCategory';

type WidgetFiltersProps = {
    title?: ReactNode;
    offcanvas?: 'always' | 'mobile';
    categories?: ICategory[]
};

type RenderFilterFn = CollapseRenderFn<HTMLDivElement, HTMLDivElement>;

function WidgetFiltersMain(props: WidgetFiltersProps) {
    const { title, offcanvas = 'mobile',categories } = props;
    // const filters = useShopFilters();
    // const values = useShopFilterValues();

    // const shopSetFilterValue = useShopSetFilterValueThunk();
    const shopResetFilters = useShopResetFiltersThunk();

    // const handleValueChange = useCallback(({ filter, value }: FilterChangeValueEvent) => {

    // }, []);

    // const filtersList = categories?.map((filter) => {
        // const renderFilter: RenderFilterFn = ({ toggle, setItemRef, setContentRef }) => (
        //     <div className="filter filter--opened" ref={setItemRef}>
        //         <button type="button" className="filter__title" onClick={toggle}>
        //             {filter.name}
        //             <ArrowRoundedDown12x7Svg className="filter__arrow" />
        //         </button>
        //         <div className="filter__body" ref={setContentRef}>
        //             <div className="filter__container">
        //                 <FilterCategory data={categories} />
        //             </div>
        //         </div>
        //     </div>
        // );

    //     return (
    //         <div key={filter.name} className="widget-filters__item">
    //             <Collapse toggleClass="filter--opened" render={renderFilter} />
    //         </div>
    //     );
    // });

    const classes = classNames('widget-filters widget', {
        'widget-filters--offcanvas--always': offcanvas === 'always',
        'widget-filters--offcanvas--mobile': offcanvas === 'mobile',
    });

    return (
        <div className={classes}>
            <h4 className="widget-filters__title widget__title">{title}</h4>

            {/* <div className="widget-filters__list"> */}
                {<FilterCategory categories={categories} />}
            {/* </div> */}

            {/* <div className="widget-filters__actions d-flex mb-n2">
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={shopResetFilters}
                >
                    Reset
                </button>
            </div> */}
        </div>
    );
}

export default WidgetFiltersMain;
