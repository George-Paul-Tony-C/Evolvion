import { flagForCheating } from '../api/authApi';

let listener = null;
const WARNING_KEY = 'assessment_warnings'; // Key for sessionStorage

const handleVisibilityChange = () => {
  // We only act if the user has navigated away from the page
  if (document.visibilityState === 'hidden') {
    // Get the current warning count from session storage, default to 0
    let currentWarnings = parseInt(sessionStorage.getItem(WARNING_KEY) || '0', 10);
    currentWarnings += 1;
    sessionStorage.setItem(WARNING_KEY, currentWarnings.toString());

    if (currentWarnings >= 3) {
      // Third strike: Block the user
      console.error("FINAL WARNING: User flagged for cheating after 3 offenses.");
      flagForCheating("User navigated away from the assessment page 3 times.");
      
      // Clear the warning count from storage
      sessionStorage.removeItem(WARNING_KEY);
      
      alert("You have been flagged for leaving the assessment page multiple times and your account will be blocked. You will be logged out.");
      
      // Force a full page reload to the login page to clear all state and trigger the 'blocked' status check
      window.location.href = '/login';
    } else {
      // First or second strike: Show a warning
      console.warn(`CHEATING WARNING #${currentWarnings}: User switched tabs.`);
      alert(`Warning ${currentWarnings} of 3: Please remain on the assessment page. Leaving again may result in your account being blocked.`);
    }
  }
};

export const startCheatingDetector = () => {
  if (!listener) {
    // Reset warnings to 0 at the start of every new assessment
    sessionStorage.setItem(WARNING_KEY, '0');
    listener = handleVisibilityChange;
    document.addEventListener('visibilitychange', listener);
    console.log("Cheating detector started with 3-strike rule.");
  }
};

export const stopCheatingDetector = () => {
  if (listener) {
    // Clear any warnings from storage when the assessment is over
    sessionStorage.removeItem(WARNING_KEY);
    document.removeEventListener('visibilitychange', listener);
    listener = null;
    console.log("Cheating detector stopped.");
  }
};
