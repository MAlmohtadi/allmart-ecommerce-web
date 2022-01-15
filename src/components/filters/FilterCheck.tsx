// react
import { ChangeEvent } from 'react';

// third-party
import classNames from 'classnames';

// application
import Check9x7Svg from '../../svg/check-9x7.svg';
import { ICheckFilter, ICheckFilterValue } from '../../interfaces/filter';

export interface FilterCheckProps {
    data: ICheckFilter;
    value: ICheckFilterValue;
    onChangeValue?: (event: { filter: ICheckFilter, value: ICheckFilterValue }) => void;
}

function FilterCheck(props: FilterCheckProps) {
    const { data, value, onChangeValue } = props;

    const updateValue = (newValue: ICheckFilterValue) => {
        if (onChangeValue) {
            onChangeValue({ filter: data, value: newValue });
        }
    };

    // noinspection DuplicatedCode
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && !value.includes(event.target.value)) {
            updateValue([...value, event.target.value]);
        }
        if (!event.target.checked && value.includes(event.target.value)) {
            updateValue(value.filter((x) => x !== event.target.value));
        }
    };

    const itemsList = data.items.map((item) => {
        let count;

        if (item.count) {
            count = <span className="filter-list__counter">{item.count}</span>;
        }

        const itemClasses = classNames('filter-list__item', {
            'filter-list__item--disabled': item.count === 0,
        });

        return (
            <label key={item.slug} className={itemClasses}>
                <span className="filter-list__input input-check">
                    <span className="input-check__body">
                        <input
                            className="input-check__input"
                            type="checkbox"
                            value={item.slug}
                            checked={value.includes(item.slug)}
                            disabled={item.count === 0}
                            onChange={handleChange}
                        />
                        <span className="input-check__box" />
                        <Check9x7Svg className="input-check__icon" />
                    </span>
                </span>
                <span className="filter-list__title">{item.name}</span>
                {count}
            </label>
        );
    });

    return (
        <div className="filter-list">
            <div className="filter-list__list">
                {itemsList}
            </div>
        </div>
    );
}

export default FilterCheck;
