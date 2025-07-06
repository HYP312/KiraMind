// utils.ts - Utility functions with proper TypeScript type safety

/**
 * Validates if two passwords match
 * This function provides a simple but essential validation for password confirmation
 * 
 * @param password - The main password string
 * @param confirmPassword - The confirmation password string
 * @returns boolean indicating if passwords match
 */
export const validatePassword = (password: string, confirmPassword: string): boolean =>
  password === confirmPassword;

/**
 * Debounce function with proper TypeScript typing
 * 
 * The key insight here is understanding how timer handles work in React Native.
 * Unlike browser environments where setTimeout returns a number,
 * React Native (based on Node.js) returns a NodeJS.Timeout object.
 * 
 * We use 'ReturnType<typeof setTimeout>' to get the exact type that
 * setTimeout returns in the current environment, ensuring compatibility.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T, 
  delay: number
): ((...args: Parameters<T>) => void) => {
  // Using ReturnType<typeof setTimeout> ensures we get the correct type
  // for the current JavaScript environment (React Native uses NodeJS.Timeout)
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // We use arrow function here to avoid 'this' context issues
  // Arrow functions inherit 'this' from the surrounding scope,
  // which is more predictable than regular functions
  return (...args: Parameters<T>): void => {
    // Clear previous timeout if it exists
    // We check for null and then clear - this handles the type safety issue
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    // Set new timeout with proper type handling
    timeoutId = setTimeout(() => {
      // Call the original function with the provided arguments
      // Since we're using arrow function, we don't need to worry about 'this' context
      func(...args);
    }, delay);
  };
};

/**
 * Alternative debounce implementation that preserves 'this' context
 * Use this version if you need to maintain the original 'this' context
 * when the debounced function is called
 */
export const debounceWithContext = <T extends (...args: any[]) => any>(
  func: T, 
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // Using regular function to allow 'this' binding
  return function(this: any, ...args: Parameters<T>): void {
    // Clear previous timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    // Capture 'this' context for use in the timeout callback
    const context = this;
    
    timeoutId = setTimeout(() => {
      // Apply the function with the captured context
      func.apply(context, args);
    }, delay);
  };
};

/**
 * Enhanced password validation with additional security checks
 * This demonstrates how we can build upon basic validation
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  issues: string[];
} => {
  const issues: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  
  // Check minimum length
  if (password.length < 8) {
    issues.push('Password must be at least 8 characters long');
  }
  
  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    issues.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    issues.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/\d/.test(password)) {
    issues.push('Password must contain at least one number');
  }
  
  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    issues.push('Password must contain at least one special character');
  }
  
  // Determine strength based on criteria met
  const criteriaMet = 5 - issues.length;
  if (criteriaMet >= 4) {
    strength = 'strong';
  } else if (criteriaMet >= 2) {
    strength = 'medium';
  }
  
  return {
    isValid: issues.length === 0,
    strength,
    issues
  };
};

/**
 * Utility function to safely handle timer cleanup
 * This is particularly useful in React components where you need to clean up
 * timers when components unmount
 */
export const createSafeTimer = () => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return {
    set: (callback: () => void, delay: number) => {
      // Clear any existing timer
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      // Set new timer
      timeoutId = setTimeout(callback, delay);
    },
    
    clear: () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
    
    isActive: () => timeoutId !== null
  };
};

/*
 * Usage examples and explanations:
 * 
 * 1. Basic debouncing for search input:
 *    const debouncedSearch = debounce((query: string) => {
 *      console.log('Searching for:', query);
 *    }, 500);
 * 
 * 2. Debouncing with context preservation:
 *    const debouncedMethod = debounceWithContext(function(this: MyClass, value: string) {
 *      this.processValue(value);
 *    }, 300);
 * 
 * 3. Password validation in forms:
 *    const isValid = validatePassword(password, confirmPassword);
 *    const strength = validatePasswordStrength(password);
 * 
 * 4. Safe timer management in React components:
 *    const timer = createSafeTimer();
 *    timer.set(() => console.log('Timer executed'), 1000);
 *    // Don't forget to clear in useEffect cleanup or componentWillUnmount
 *    timer.clear();
 */