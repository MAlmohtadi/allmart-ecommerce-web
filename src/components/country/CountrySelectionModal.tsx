// react
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// application
import { franchiseSet } from '../../store/franchise/franchiseActions';
import shopApi, { FranchiseResponse } from '../../api/shop';
import FranchiseContext from '../../utils/franchise-context';

export interface CountrySelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function CountrySelectionModal({ isOpen, onClose }: CountrySelectionModalProps) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [franchises, setFranchises] = useState<FranchiseResponse[]>([]);
    const [loadingFranchises, setLoadingFranchises] = useState(true);

    // Fetch active franchises on mount
    useEffect(() => {
        if (isOpen) {
            shopApi.getActiveFranchises()
                .then((franchiseList) => {
                    setFranchises(franchiseList);
                    setLoadingFranchises(false);
                })
                .catch((err) => {
                    console.error('Failed to load franchises:', err);
                    setError('Failed to load franchises. Please try again.');
                    setLoadingFranchises(false);
                });
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleFranchiseSelect = async (selectedFranchise: FranchiseResponse) => {
        setLoading(true);
        setError(null);

        try {
            // Update Redux store
            dispatch(franchiseSet({
                franchiseId: selectedFranchise.id,
                franchiseCode: selectedFranchise.code,
                countryCode: selectedFranchise.countryCode,
                currencyCode: selectedFranchise.currencyCode,
                currencySymbolAr: selectedFranchise.currencySymbolAr || 'د.أ',
                currencySymbolEn: selectedFranchise.currencySymbolEn || 'JD',
            }));

            // Update franchise context
            FranchiseContext.setCountryCode(selectedFranchise.countryCode);
            FranchiseContext.setFranchiseId(selectedFranchise.id);
            FranchiseContext.setFranchiseCode(selectedFranchise.code);
            FranchiseContext.setCurrencyCode(selectedFranchise.currencyCode);
            FranchiseContext.setCurrencySymbols(
                selectedFranchise.currencySymbolAr || 'د.أ',
                selectedFranchise.currencySymbolEn || 'JD'
            );

            // Close modal
            onClose();

            // Reload page to refresh data with franchise context
            window.location.reload();
        } catch (err: any) {
            setError(err.message || 'Failed to load franchise information. Please try again.');
            setLoading(false);
        }
    };

    // Get current language
    const langId = typeof window !== 'undefined' 
        ? parseInt(Cookies.get('langId') || '1', 10)
        : 1;

    const isArabic = langId === 1;

    return (
        <div 
            className="country-selection-modal"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    // Don't close on backdrop click - country selection is required
                }
            }}
        >
            <div 
                className="country-selection-modal__content"
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    padding: '2rem',
                    maxWidth: '500px',
                    width: '90%',
                    textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                    {isArabic ? 'اختر الفرع' : 'Select Franchise'}
                </h2>
                
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                    {isArabic 
                        ? 'يرجى اختيار الفرع للاستمرار' 
                        : 'Please select your franchise to continue'}
                </p>

                {error && (
                    <div 
                        style={{
                            backgroundColor: '#fee',
                            color: '#c33',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            marginBottom: '1rem',
                        }}
                    >
                        {error}
                    </div>
                )}

                {loadingFranchises ? (
                    <div style={{ marginTop: '1rem', color: '#666', textAlign: 'center' }}>
                        {isArabic ? 'جاري التحميل...' : 'Loading...'}
                    </div>
                ) : franchises.length === 0 ? (
                    <div style={{ marginTop: '1rem', color: '#666', textAlign: 'center' }}>
                        {isArabic ? 'لا توجد فروع متاحة' : 'No franchises available'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {franchises.map((franchise) => (
                            <button
                                key={franchise.id}
                                onClick={() => handleFranchiseSelect(franchise)}
                                disabled={loading}
                                style={{
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '4px',
                                    backgroundColor: loading ? '#f5f5f5' : '#fff',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.borderColor = '#007bff';
                                        e.currentTarget.style.backgroundColor = '#f0f8ff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                        e.currentTarget.style.backgroundColor = '#fff';
                                    }
                                }}
                            >
                                {franchise.name}
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div style={{ marginTop: '1rem', color: '#666', textAlign: 'center' }}>
                        {isArabic ? 'جاري التحميل...' : 'Loading...'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CountrySelectionModal;

