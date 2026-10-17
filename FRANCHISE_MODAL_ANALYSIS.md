# Franchise Modal Flow Analysis

## Current Problem
User sees error popup "franchise context required, please select a country" with button "تم" (Done/OK) on page load, instead of the franchise selection modal.

## Complete Flow Analysis

### 1. Page Load Sequence
1. **getInitialProps** runs (server-side)
   - Checks franchise context from cookies
   - If missing, sets `needsCountrySelection = true`
   - If present, fetches homepage data
   - Returns `pageProps` with `needsCountrySelection` flag

2. **Component Renders** (client-side)
   - `_app.tsx` renders with `pageProps`
   - Modal state initialized synchronously based on franchise context
   - Layout component renders (includes ToastContainer)
   - Header, Footer components render
   - Page components render

3. **useEffect Hooks Execute**
   - Franchise context check useEffect runs
   - Sets modal state if franchise context missing
   - Global error handler useEffect runs
   - Other useEffects run

### 2. API Call Flow

#### API Interceptor (`api-interceptor.ts`)
- **PUBLIC_ENDPOINTS**: `/franchise/getActiveFranchises` is in the list
- **Protected endpoints**: All other endpoints require franchise context
- **Behavior**: 
  - If franchise context missing and endpoint is protected:
    - Returns `Promise.reject({message: 'Franchise context required. Please select a country.', status: 403, requiresCountrySelection: true})`
  - This rejection happens BEFORE the actual HTTP request

#### Where API Calls Are Made
1. **getInitialProps** (already fixed - only calls if franchise context exists)
2. **Layout component** - No API calls found
3. **Header component** - No API calls found  
4. **HomePage component** - Need to check
5. **Modal component** - Calls `getActiveFranchises()` (PUBLIC endpoint - should work)

### 3. Error Display Mechanism

#### Toast System
- `ToastContainer` is in `Layout.tsx` (line 46)
- Uses `react-toastify` library
- Toast errors shown via `toast.error(message)`

#### Where Errors Are Shown
1. **Redux Actions** check `data.isBussinessError`:
   - `cartActions.ts` - line 163
   - `accountActions.ts` - lines 78, 100
2. **Component catch blocks**:
   - Various components catch errors and show toasts

### 4. The Issue

The error popup is likely coming from:
1. **An API call made before modal shows** - Some component/page makes an API call on mount that requires franchise context
2. **The error is caught and displayed as a toast** - Some error handler converts the rejection to a toast

## Solution Strategy

### Step 1: Prevent All API Calls Until Franchise Selected
- Modal must show FIRST
- NO API calls should be made until franchise is selected
- This means:
  - `getInitialProps` should NOT fetch homepage data (already fixed)
  - NO components should make API calls on mount if franchise context is missing
  - Only the modal can make API calls (to get franchise list - PUBLIC endpoint)

### Step 2: Ensure Modal Shows First
- Modal state initialized synchronously (already done)
- Modal should block all other content
- Modal should have highest z-index

### Step 3: Error Handling
- Global error handler should catch franchise context errors and show modal instead of toast
- Prevent toast from showing for franchise context errors

## Implementation Plan

1. ✅ Fixed `getInitialProps` - Only fetch homepage data if franchise context exists
2. ✅ Modal state initialized synchronously
3. ⚠️ Need to find where error toast is coming from
4. ⚠️ Need to ensure no other API calls happen before modal shows

