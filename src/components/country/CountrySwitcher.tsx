// react
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// application
import { franchiseSet, franchiseClear } from '../../store/franchise/franchiseActions';
import { cartClear } from '../../store/cart/cartActions';
import { wishlistClear } from '../../store/wishlist/wishlistActions';
import { clearHomeData } from '../../store/home/homeActions';
import { clearProductFilters, clearSelectedCategory } from '../../store/shop/shopActions';
import shopApi, { FranchiseResponse } from '../../api/shop';
import FranchiseContext from '../../utils/franchise-context';
import { useFranchise } from '../../store/franchise/franchiseHooks';
import Cookies from 'js-cookie';
import CountrySwitchConfirmModal from './CountrySwitchConfirmModal';

function CountrySwitcher() {
    const dispatch = useDispatch();
    const router = useRouter();
    const franchise = useFranchise();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingFranchise, setPendingFranchise] = useState<FranchiseResponse | null>(null);
    const [franchises, setFranchises] = useState<FranchiseResponse[]>([]);
    const [loadingFranchises, setLoadingFranchises] = useState(true);

    // Get current language
    const langId = typeof window !== 'undefined' 
        ? parseInt(Cookies.get('langId') || '1', 10)
        : 1;
    const isArabic = langId === 1;

    // Fetch active franchises on mount
    useEffect(() => {
        shopApi.getActiveFranchises()
            .then((franchiseList) => {
                setFranchises(franchiseList);
                setLoadingFranchises(false);
            })
            .catch((err) => {
                console.error('Failed to load franchises:', err);
                setLoadingFranchises(false);
            });
    }, []);

    // Get current franchise name
    const currentFranchise = franchises.find(f => f.id === franchise.franchiseId);
    const currentFranchiseName = currentFranchise 
        ? currentFranchise.name
        : (isArabic ? 'اختر الفرع' : 'Select Franchise');

    const handleFranchiseSwitch = (selectedFranchise: FranchiseResponse) => {
        // Don't switch if it's the same franchise
        if (franchise.franchiseId === selectedFranchise.id) {
            setIsOpen(false);
            return;
        }

        // Show confirmation modal
        setPendingFranchise(selectedFranchise);
        setShowConfirmModal(true);
        setIsOpen(false);
    };

    const handleConfirmSwitch = async () => {
        if (!pendingFranchise) {
            return;
        }

        setLoading(true);
        setShowConfirmModal(false);

        try {
            // CRITICAL: Reset ALL franchise-bound state, not just cart
            // Clear cart
            dispatch(cartClear());

            // Clear wishlist
            dispatch(wishlistClear());

            // Clear homepage data (banners, categories cached data)
            dispatch(clearHomeData());

            // Clear product filters and selected category
            dispatch(clearProductFilters());
            dispatch(clearSelectedCategory());

            // Update franchise context using the selected franchise
            FranchiseContext.setCountryCode(pendingFranchise.countryCode);
            FranchiseContext.setFranchiseId(pendingFranchise.id);
            FranchiseContext.setFranchiseCode(pendingFranchise.code);
            // CRITICAL: Store currency from API response, not inferred
            FranchiseContext.setCurrencyCode(pendingFranchise.currencyCode);
            FranchiseContext.setCurrencySymbols(
                pendingFranchise.currencySymbolAr || 'د.أ',
                pendingFranchise.currencySymbolEn || 'JD'
            );

            // Update Redux
            dispatch(franchiseSet({
                franchiseId: pendingFranchise.id,
                franchiseCode: pendingFranchise.code,
                countryCode: pendingFranchise.countryCode,
                currencyCode: pendingFranchise.currencyCode, // From API, not inferred
                currencySymbolAr: pendingFranchise.currencySymbolAr || 'د.أ',
                currencySymbolEn: pendingFranchise.currencySymbolEn || 'JD',
            }));

            setLoading(false);
            setPendingFranchise(null);

            // Reload page to refresh data with new franchise context
            // Redirect to eshop home, not exportation home
            const currentPath = router.pathname;
            if (currentPath.startsWith('/eshop') || currentPath.startsWith('/shop')) {
                // Stay in eshop, reload current page or go to eshop home
                window.location.href = '/eshop';
            } else {
                // If somehow on non-eshop route, go to eshop home
                window.location.href = '/eshop';
            }
        } catch (err: any) {
            setLoading(false);
            setPendingFranchise(null);
            alert(err.message || (isArabic ? 'فشل في تغيير الفرع. يرجى المحاولة مرة أخرى.' : 'Failed to switch franchise. Please try again.'));
        }
    };

    const handleCancelSwitch = () => {
        setShowConfirmModal(false);
        setPendingFranchise(null);
    };

    // Get new franchise name for confirmation modal
    const newFranchiseName = pendingFranchise ? pendingFranchise.name : '';

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.country-switcher')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="country-switcher" style={{ position: 'relative', display: 'inline-block', height: '100%' }}>
            <button
                type="button"
                className="country-switcher__button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                style={{
                    padding: '0 14px',
                    border: 'none',
                    borderRadius: '2px',
                    backgroundColor: 'transparent',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    color: 'inherit',
                    fontWeight: 'inherit',
                }}
            >
                <span>{currentFranchiseName}</span>
                {franchise.currencySymbolAr && (
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        ({isArabic ? franchise.currencySymbolAr : franchise.currencySymbolEn})
                    </span>
                )}
                <span style={{ fontSize: '0.75rem' }}>▼</span>
            </button>

            {isOpen && (
                <div
                    className="country-switcher__dropdown"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '0.25rem',
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        minWidth: '200px',
                    }}
                >
                    {loadingFranchises ? (
                        <div style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#666' }}>
                            {isArabic ? 'جاري التحميل...' : 'Loading...'}
                        </div>
                    ) : franchises.length === 0 ? (
                        <div style={{ padding: '0.75rem 1rem', textAlign: 'center', color: '#666' }}>
                            {isArabic ? 'لا توجد فروع متاحة' : 'No franchises available'}
                        </div>
                    ) : (
                        franchises.map((franchiseOption) => (
                            <button
                                key={franchiseOption.id}
                                type="button"
                                onClick={() => handleFranchiseSwitch(franchiseOption)}
                                disabled={loading || franchise.franchiseId === franchiseOption.id}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: 'none',
                                    backgroundColor: franchise.franchiseId === franchiseOption.id ? '#f0f8ff' : '#fff',
                                    cursor: loading || franchise.franchiseId === franchiseOption.id ? 'default' : 'pointer',
                                    textAlign: 'right',
                                    fontSize: '0.875rem',
                                    display: 'block',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading && franchise.franchiseId !== franchiseOption.id) {
                                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (franchise.franchiseId !== franchiseOption.id) {
                                        e.currentTarget.style.backgroundColor = '#fff';
                                    }
                                }}
                            >
                                {franchiseOption.name}
                                {franchise.franchiseId === franchiseOption.id && (
                                    <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✓</span>
                                )}
                            </button>
                        ))
                    )}
                </div>
            )}

            <CountrySwitchConfirmModal
                isOpen={showConfirmModal}
                onConfirm={handleConfirmSwitch}
                onCancel={handleCancelSwitch}
                newCountryName={newFranchiseName}
                loading={loading}
            />
        </div>
    );
}

export default CountrySwitcher;

