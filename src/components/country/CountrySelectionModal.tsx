// react
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// application
import { franchiseSet } from '../../store/franchise/franchiseActions';
import { localeChange } from '../../store/locale/localeActions';
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
    const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en'>('ar');

    // Fetch active franchises on mount
    useEffect(() => {
        console.log('[FRANCHISE-MODAL] CountrySelectionModal useEffect: isOpen =', isOpen);
        if (isOpen) {
            console.log('[FRANCHISE-MODAL] Modal is open, fetching franchises...');
            shopApi.getActiveFranchises()
                .then((franchiseList) => {
                    console.log('[FRANCHISE-MODAL] Franchises fetched successfully:', franchiseList.length, 'franchises');
                    setFranchises(franchiseList);
                    setLoadingFranchises(false);
                })
                .catch((err) => {
                    console.error('[FRANCHISE-MODAL] Failed to load franchises:', err);
                    console.error('[FRANCHISE-MODAL] Error details:', {
                        message: err?.message,
                        status: err?.status,
                        error: err
                    });
                    setError('Failed to load franchises. Please try again.');
                    setLoadingFranchises(false);
                });

            // Initialize language from cookie
            const currentLangId = parseInt(Cookies.get('langId') || '1', 10);
            console.log('[FRANCHISE-MODAL] Initial language from cookie:', currentLangId);
            setSelectedLanguage(currentLangId === 1 ? 'ar' : 'en');
        } else {
            console.log('[FRANCHISE-MODAL] Modal is closed, skipping franchise fetch');
        }
    }, [isOpen]);

    console.log('[FRANCHISE-MODAL] CountrySelectionModal render: isOpen =', isOpen);
    
    if (!isOpen) {
        console.log('[FRANCHISE-MODAL] Modal is closed, returning null');
        return null;
    }
    
    console.log('[FRANCHISE-MODAL] Modal is open, rendering modal UI');

    const handleFranchiseSelect = async (selectedFranchise: FranchiseResponse) => {
        console.log('[FRANCHISE-MODAL] handleFranchiseSelect called:', {
            franchiseId: selectedFranchise.id,
            franchiseName: selectedFranchise.name,
            selectedLanguage
        });
        setLoading(true);
        setError(null);

        try {
            // Set language cookie and locale
            const langId = selectedLanguage === 'ar' ? 1 : 2;
            console.log('[FRANCHISE-MODAL] Setting language:', langId, selectedLanguage);
            Cookies.set('langId', langId.toString(), { expires: 365 });
            dispatch(localeChange(selectedLanguage));

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
            console.log('[FRANCHISE-MODAL] Franchise selected successfully, closing modal and reloading page');
            onClose();

            // Reload page to refresh data with franchise context and language
            console.log('[FRANCHISE-MODAL] Reloading page...');
            window.location.reload();
        } catch (err: any) {
            console.error('[FRANCHISE-MODAL] Error in handleFranchiseSelect:', err);
            setError(err.message || 'Failed to load franchise information. Please try again.');
            setLoading(false);
        }
    };

    // Get current language for display
    const isArabic = selectedLanguage === 'ar';

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
                    {isArabic ? 'اختر الفرع واللغة' : 'Select Franchise and Language'}
                </h2>
                
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                    {isArabic 
                        ? 'يرجى اختيار الفرع واللغة للاستمرار' 
                        : 'Please select your franchise and language to continue'}
                </p>

                {/* Language Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        color: '#333'
                    }}>
                        {isArabic ? 'اللغة' : 'Language'}
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => setSelectedLanguage('ar')}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                border: `2px solid ${selectedLanguage === 'ar' ? '#007bff' : '#e0e0e0'}`,
                                borderRadius: '4px',
                                backgroundColor: selectedLanguage === 'ar' ? '#007bff' : '#fff',
                                color: selectedLanguage === 'ar' ? '#fff' : '#333',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: selectedLanguage === 'ar' ? 'bold' : 'normal',
                            }}
                            onMouseEnter={(e) => {
                                if (!loading && selectedLanguage !== 'ar') {
                                    e.currentTarget.style.borderColor = '#007bff';
                                    e.currentTarget.style.backgroundColor = '#f0f8ff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading && selectedLanguage !== 'ar') {
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                    e.currentTarget.style.backgroundColor = '#fff';
                                }
                            }}
                        >
                            العربية
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedLanguage('en')}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                border: `2px solid ${selectedLanguage === 'en' ? '#007bff' : '#e0e0e0'}`,
                                borderRadius: '4px',
                                backgroundColor: selectedLanguage === 'en' ? '#007bff' : '#fff',
                                color: selectedLanguage === 'en' ? '#fff' : '#333',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: selectedLanguage === 'en' ? 'bold' : 'normal',
                            }}
                            onMouseEnter={(e) => {
                                if (!loading && selectedLanguage !== 'en') {
                                    e.currentTarget.style.borderColor = '#007bff';
                                    e.currentTarget.style.backgroundColor = '#f0f8ff';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading && selectedLanguage !== 'en') {
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                    e.currentTarget.style.backgroundColor = '#fff';
                                }
                            }}
                        >
                            English
                        </button>
                    </div>
                </div>

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
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: '#333'
                        }}>
                            {isArabic ? 'الفرع' : 'Franchise'}
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {franchises.map((franchise) => (
                                <button
                                    key={franchise.id}
                                    type="button"
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
                                        textAlign: 'center',
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

