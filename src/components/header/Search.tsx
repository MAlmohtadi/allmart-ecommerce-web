// react
import {
    KeyboardEvent, RefObject, useCallback, useEffect, useRef, useState,
} from 'react';

// third-party
import classNames from 'classnames';
import { useRouter } from 'next/router';

// application
import { toast } from 'react-toastify';
import Cross20Svg from '../../svg/cross-20.svg';
import Search20Svg from '../../svg/search-20.svg';

export interface SearchProps {
    context: 'header' | 'mobile-header' | 'indicator';
    className?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onClose?: () => void;
}

function Search(props: SearchProps) {
    const {
        context, className, inputRef, onClose,
    } = props;
    const [cancelFn] = useState(() => () => {});
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [hasSuggestions] = useState(false);
    const [query] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const close = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setSuggestionsOpen(false);
    }, [onClose]);

    // Close suggestions when the location has been changed.
    useEffect(() => {
        close();
    }, [close, router.asPath]);

    // Close suggestions when a click has been made outside component.
    useEffect(() => {
        const onGlobalClick = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
                close();
            }
        };

        document.addEventListener('mousedown', onGlobalClick);

        return () => document.removeEventListener('mousedown', onGlobalClick);
    }, [close]);

    // Cancel previous typing.
    useEffect(() => () => cancelFn(), [cancelFn]);

    const handleBlur = () => {
        setTimeout(() => {
            if (!document.activeElement || document.activeElement === document.body) {
                return;
            }

            // Close suggestions if the focus received an external element.
            if (wrapperRef.current && !wrapperRef.current.contains(document.activeElement)) {
                close();
            }
        }, 10);
    };
    const search = () => {
        if (query.length < 2) {
            toast.error('يجب ادخال حرفين على الأقل للبحث', { theme: 'colored' });
        } else {
            router.push(`/search?textToSearch=${query}`);
        }
    };
    // Close suggestions when the Escape key has been pressed.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Escape.
        if (event.which === 27) {
            close();
        }
        if (event.key === 'Enter') {
            search();
        }
    };

    const rootClasses = classNames(`search search--location--${context}`, className, {
        'search--suggestions-open': suggestionsOpen,
        'search--has-suggestions': hasSuggestions,
    });

    const closeButton = context !== 'mobile-header' ? (
        ''
    ) : (
        <button className="search__button search__button--type--close" type="button" onClick={close}>
            <Cross20Svg />
        </button>
    );

    return (
        <div className={rootClasses} ref={wrapperRef} onBlur={handleBlur}>
            <div className="search__body">
                <div className="search__form">
                    <input
                        ref={inputRef}
                        onChange={() => { }}
                        onFocus={() => { }}
                        onKeyDown={handleKeyDown}
                        value={query}
                        className="search__input"
                        name="search"
                        placeholder="ابحث عن المنتج"
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    <button
                        className="search__button search__button--type--submit"
                        onClick={() => search()}
                        type="submit"
                    >
                        <Search20Svg />
                    </button>
                    {closeButton}
                    <div className="search__border" />
                </div>

            </div>
        </div>
    );
}

export default Search;
