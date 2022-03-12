// application
import FilterCheck from './FilterCheck';
import FilterColor from './FilterColor';
import FilterRadio from './FilterRadio';
import FilterRange from './FilterRange';
import { getFilterValue } from '../../services/filters';
import { IFilter } from '../../interfaces/filter';

export interface FilterChangeValueEvent {
    filter: IFilter;
    value: IFilter['value'];
}

export interface FilterProps {
    data: IFilter;
    value: string;
    onChangeValue: (event: FilterChangeValueEvent) => void;
}

function Filter(props: FilterProps) {
    const { data, value, onChangeValue } = props;

    switch (data.type) {
    case 'range':
        return (
            <FilterRange
                data={data}
                value={getFilterValue(data, value)}
                onChangeValue={onChangeValue}
            />
        );
    case 'check':
        return (
            <FilterCheck
                data={data}
                value={getFilterValue(data, value)}
                onChangeValue={onChangeValue}
            />
        );
    case 'radio':
        return (
            <FilterRadio
                data={data}
                value={getFilterValue(data, value)}
                onChangeValue={onChangeValue}
            />
        );
    case 'color':
        return (
            <FilterColor
                data={data}
                value={getFilterValue(data, value)}
                onChangeValue={onChangeValue}
            />
        );
    default:
        return null;
    }
}

export default Filter;
