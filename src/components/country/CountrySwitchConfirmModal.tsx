// react
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export interface CountrySwitchConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    newCountryName: string;
    loading?: boolean;
}

function CountrySwitchConfirmModal({ 
    isOpen, 
    onConfirm, 
    onCancel, 
    newCountryName,
    loading = false 
}: CountrySwitchConfirmModalProps) {
    // Get current language
    const langId = typeof window !== 'undefined' 
        ? parseInt(Cookies.get('langId') || '1', 10)
        : 1;
    const isArabic = langId === 1;

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="country-switch-confirm-modal"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                animation: 'fadeIn 0.2s ease-in',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onCancel();
                }
            }}
        >
            <div 
                className="country-switch-confirm-modal__content"
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '450px',
                    width: '90%',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    animation: 'slideUp 0.3s ease-out',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ marginBottom: '1.5rem' }}>
                    <div 
                        style={{
                            width: '64px',
                            height: '64px',
                            margin: '0 auto 1rem',
                            borderRadius: '50%',
                            backgroundColor: '#fff3cd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                        }}
                    >
                        ⚠️
                    </div>
                    <h2 
                        style={{ 
                            marginBottom: '0.75rem', 
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#333',
                        }}
                    >
                        {isArabic ? 'تغيير البلد' : 'Change Country'}
                    </h2>
                    <p 
                        style={{ 
                            marginBottom: '0',
                            color: '#666',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                        }}
                    >
                        {isArabic 
                            ? `تغيير البلد إلى "${newCountryName}" سيؤدي إلى مسح سلة التسوق وقائمة الأمنيات. هل تريد المتابعة؟`
                            : `Changing country to "${newCountryName}" will clear your cart and wishlist. Do you want to continue?`}
                    </p>
                </div>

                <div 
                    style={{ 
                        display: 'flex', 
                        gap: '1rem',
                        justifyContent: 'center',
                        flexDirection: isArabic ? 'row-reverse' : 'row',
                    }}
                >
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '6px',
                            backgroundColor: loading ? '#f5f5f5' : '#fff',
                            color: '#333',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500',
                            minWidth: '120px',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.borderColor = '#ccc';
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.backgroundColor = '#fff';
                            }
                        }}
                    >
                        {isArabic ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: '#fff',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '500',
                            minWidth: '120px',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#0056b3';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#007bff';
                            }
                        }}
                    >
                        {loading 
                            ? (isArabic ? 'جاري التحميل...' : 'Loading...')
                            : (isArabic ? 'متابعة' : 'Continue')
                        }
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes slideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default CountrySwitchConfirmModal;

