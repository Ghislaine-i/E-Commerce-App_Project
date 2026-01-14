/**
 * Utility functions for localStorage operations
 */

// Storage keys
export const STORAGE_KEYS = {
    PRODUCTS: "products",
    CART: "cart",
    WISHLIST: "wishlist",
    USER: "user",
    TOKEN: "token",
    REFRESH_TOKEN: "refreshToken",
    ALL_USERS: "allUsers",
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value or default value
 */
export const getFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setInStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing ${key} to localStorage:`, error);
        return false;
    }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
        return false;
    }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} Success status
 */
export const clearStorage = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error("Error clearing localStorage:", error);
        return false;
    }
};

/**
 * Check if localStorage is available
 * @returns {boolean} Availability status
 */
export const isStorageAvailable = () => {
    try {
        const test = "__storage_test__";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Get storage size in bytes
 * @returns {number} Total size in bytes
 */
export const getStorageSize = () => {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return total;
};

/**
 * Get storage size in human-readable format
 * @returns {string} Size with unit (KB, MB)
 */
export const getStorageSizeFormatted = () => {
    const bytes = getStorageSize();
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// Product-specific utilities
export const getProducts = () => getFromStorage(STORAGE_KEYS.PRODUCTS, []);
export const setProducts = (products) => setInStorage(STORAGE_KEYS.PRODUCTS, products);

export const getCart = () => getFromStorage(STORAGE_KEYS.CART, []);
export const setCart = (cart) => setInStorage(STORAGE_KEYS.CART, cart);

export const getWishlist = () => getFromStorage(STORAGE_KEYS.WISHLIST, []);
export const setWishlist = (wishlist) => setInStorage(STORAGE_KEYS.WISHLIST, wishlist);

export const getUser = () => getFromStorage(STORAGE_KEYS.USER);
export const setUser = (user) => setInStorage(STORAGE_KEYS.USER, user);
export const removeUser = () => {
    removeFromStorage(STORAGE_KEYS.USER);
    removeFromStorage(STORAGE_KEYS.TOKEN);
    removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN);
};