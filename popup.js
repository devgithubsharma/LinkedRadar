// // // popup.js

// // Send a message to the content script to check the profile
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     chrome.scripting.executeScript({
//         target: { tabId: activeTab.id },
//         func: () => {
//             // Check if it's another user's profile asynchronously
//             const usernameRegex = /\/in\/([a-zA-Z0-9-]+)/;
//             const match = location.href.match(usernameRegex);

//             if (match && match[1]) {
//                 const profileUsername = match[1];
//                 // Replace 'your-username' with your actual LinkedIn username
//                 const yourUsername = 'dev-sharma-5057661b7';

//                 if (profileUsername === yourUsername) {
//                     return false;
//                 } else {
//                     return true;
//                 }
//             }
//             return false; // Default to false
//         }
//     }).then((result) => {
//         if (result && result[0]) {
//             const isOtherUserProfile = result[0].result;
//             console.log(result)
//             // Send the result directly to content.js
//             async () =>{
//                 chrome.runtime.sendMessage({ isOtherUserProfile: isOtherUserProfile });
//             }
//         }
//     }).catch((err) => {
//         console.log(err);
//     });
// });
