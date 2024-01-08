// content.js

function checkProfile() {
    const connectButton = document.querySelector('button[aria-label="Connect"]');
    return !!connectButton;
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "checkProfile") {
      const isOtherUserProfile = checkProfile();
      sendResponse(isOtherUserProfile);
    }
  });
  