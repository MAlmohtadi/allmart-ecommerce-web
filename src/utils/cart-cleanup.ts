/**
 * Utility to clean up old/unused franchise cart data from localStorage
 * Should be called periodically or on app initialization
 */

/**
 * Get all cart keys from localStorage
 */
function getAllCartKeys(): string[] {
    if (typeof window === 'undefined') {
        return [];
    }

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cart_')) {
            keys.push(key);
        }
    }
    return keys;
}

/**
 * Get current active franchise IDs from cookies
 * Returns array of franchise IDs that should be kept
 */
function getActiveFranchiseIds(): number[] {
    if (typeof window === 'undefined') {
        return [];
    }

    const Cookies = require('js-cookie');
    const franchiseId = Cookies.get('franchiseId');
    
    // Return current franchise ID if exists
    // In future, could extend to support multiple active franchises
    return franchiseId ? [parseInt(franchiseId, 10)] : [];
}

/**
 * Clean up old/unused franchise cart data
 * Removes cart data for franchises that are no longer active
 * 
 * @param keepFranchiseIds - Array of franchise IDs to keep (defaults to current franchise)
 */
export function cleanupOldFranchiseCarts(keepFranchiseIds?: number[]): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const activeFranchiseIds = keepFranchiseIds || getActiveFranchiseIds();
        const allCartKeys = getAllCartKeys();

        // Remove cart keys that don't match active franchises
        allCartKeys.forEach((key) => {
            const franchiseIdFromKey = parseInt(key.replace('cart_', ''), 10);
            
            // If franchise ID is not in active list, remove the cart
            if (!activeFranchiseIds.includes(franchiseIdFromKey)) {
                localStorage.removeItem(key);
                console.log(`Cleaned up old cart for franchise: ${franchiseIdFromKey}`);
            }
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error cleaning up old franchise carts:', error);
    }
}

/**
 * Clean up old cart from main state (legacy support)
 * Removes cart from main state if it exists (should not exist after Phase 4)
 */
export function cleanupMainStateCart(): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const stateStr = localStorage.getItem('state');
        if (stateStr) {
            const state = JSON.parse(stateStr);
            if (state && state.cart) {
                // Remove cart from main state
                delete state.cart;
                localStorage.setItem('state', JSON.stringify(state));
                console.log('Cleaned up cart from main state');
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error cleaning up main state cart:', error);
    }
}

