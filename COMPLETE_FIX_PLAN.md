# Complete Fix Plan for Franchise Modal Issue

## Root Cause Analysis

### The Problem
1. **HomePage component** uses `useDeferredData` to make API calls on mount:
   - `getHomePageData()` - Line 58
   - `getFeaturedProducts()` - Line 62-65
   - `getOfferProducts()` - Line 84-93

2. These API calls **require franchise context** (they're not in PUBLIC_ENDPOINTS)

3. When page loads without franchise context:
   - `apiRequest` rejects with `{message: 'Franchise context required. Please select a country.', status: 403}`
   - `useDeferredData` doesn't have a `.catch()` handler
   - The rejection becomes an unhandled promise rejection
   - Some error handler displays it as a toast/popup

4. The modal should show FIRST, but HomePage renders and makes API calls before modal can show

## The Fix

### Strategy
1. **Prevent HomePage from rendering until franchise is selected**
   - Check franchise context in _app.tsx
   - If missing, don't render the page content (just show modal)
   - Only render page content after franchise is selected

2. **OR: Make HomePage check franchise context before making API calls**
   - Conditionally call `useDeferredData` only if franchise context exists
   - This is safer and cleaner

### Implementation Plan

#### Option 1: Prevent Page Rendering (Better UX)
- In `_app.tsx`, check franchise context before rendering `content`
- If franchise context missing and modal is showing, render only the modal (no page content)
- This prevents ALL components from rendering, including HomePage

#### Option 2: Conditional API Calls in HomePage (More Complex)
- Modify HomePage to check franchise context
- Only call `useDeferredData` if franchise context exists
- This requires more changes and is less clean

### Recommended Solution: Option 1

**Implementation:**
1. In `_app.tsx`, check if franchise context is missing
2. If missing, render ONLY the modal (no Layout, no page content)
3. Once franchise is selected, reload page and render normally
4. This ensures NO components render before franchise is selected

