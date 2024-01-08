// Function to check if the current tab is a LinkedIn profile page
// import MutationObserver from 'mutation-observer'

window.addEventListener('load', mainFunction);

let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  
  if (url !== lastUrl) {
    let cnnctBtn = document.getElementById('connectWithAI')
    console.log(url)
    lastUrl = url;
    if(cnnctBtn==null){
        mainFunction()
    }
  }
}).observe(document, {subtree: true, childList: true});


function isLinkedInProfilePage() {
  const url = window.location.href;
  return url.includes('linkedin.com/in/');
}



function connectButton(){
  const mainElement = document.body.querySelector('main');
  const sections = mainElement.querySelectorAll('section');
  const reqSection = sections[0];
  const secondDirectDivChild = reqSection.children[1];
  
  for (let position = 4; position <= 6; position++) {
    const targetDivChild = secondDirectDivChild.querySelector(`:nth-child(${position})`);
  
    if (targetDivChild && targetDivChild.tagName.toLowerCase() === 'div') {
      const nextDivChild = targetDivChild.children[0];
      
  
      if (nextDivChild) {
        const nextDivFirstChildren = nextDivChild.children[0];
        
  
        if (nextDivFirstChildren) {
          const checkConnect = nextDivFirstChildren.querySelector('span');
          
  
          if (checkConnect.textContent.trim() === "Connect") {
            const connectButtons = nextDivChild.children[0];
            return connectButtons
              
          }else {
            const targetConnect = targetDivChild.querySelector('div>div>div>div>ul');
  
            if (targetConnect) {
              const targetSpanChild = targetConnect.querySelector(':scope > li:nth-child(3)');
  
              if (targetSpanChild) {
                const reqSpan = targetSpanChild.querySelector('div>span');
  
                if (reqSpan.textContent === 'Connect') {
                  const connectButtons = targetSpanChild.querySelector('div');
                  return connectButtons
                    
                } else {
                  console.log('The text does not match "Connect" in reqSpan.');
                }
              } else {
                console.log('The targetSpanChild for li:nth-child(3) was not found.');
              }
            } else {
              console.log('The targetConnect for div>div>div>div>ul was not found.');
            }
          }
        } else {
          console.log('The first child of the next div was not found.');
        }
      } else {
        console.log('The next div child was not found.');
      }
    } else {
      console.log('The targetDivChild for :nth-child(position) is not a div or was not found.');
    }
  }
  }

  function addNoteButton(){
    const bodyElement = document.body;
    const firstReqDiv = bodyElement.children[14]
    const secondReqDiv = firstReqDiv.querySelector('div>div>div')
    const thirdReqDiv = secondReqDiv.children[4]
    const addANoteButton = thirdReqDiv.children[0]
    
    return addANoteButton
    }


// button 
 function createButton(){
  if (isLinkedInProfilePage()){
    
const mainElement = document.body.querySelector('main');

// Check if the main element exists
if (mainElement) {
  // Use .querySelectorAll to find all <section> elements within the main element
  const sections = mainElement.querySelectorAll('section');

  // Check if there are sections
  if (sections.length > 0) {
    // Access the first section (index 0)
    const reqSection = sections[0];

    // Use .querySelector to find the 2nd direct child <div> within the section
    const secondDirectDivChild = reqSection.querySelector(':scope > div:nth-child(2)');

    // Check if the 2nd direct child <div> exists
    if (secondDirectDivChild) {
      // Iterate over possible positions (3rd, 4th, 5th, and 6th children)
      for (let position = 4; position <= 6; position++) {
        // Use .querySelector to find the child at the current position within the second direct child <div>
        let targetDivChild = secondDirectDivChild.querySelector(`:scope > :nth-child(${position})`);
        
        // Check if the target div child exists and is a <div> element
        if (targetDivChild && targetDivChild.tagName.toLowerCase() === 'div') {
          // Create a button element
            const generateTextButton = document.createElement('button');
            generateTextButton.textContent = 'Connect-AI';
            generateTextButton.id = 'connectWithAI'; // Unique ID for each button

            // CSS
            generateTextButton.style.backgroundColor = 'orange';
            generateTextButton.style.color = 'white';
            generateTextButton.style.border = 'none';
            generateTextButton.style.padding = '8px 18px';
            generateTextButton.style.marginLeft = '10px';
            // generateTextButton.style.border = '2px solid black';
            generateTextButton.style.fontSize = '14px'
            generateTextButton.style.fontWeight = '600'
            generateTextButton.style.borderRadius = '10px'

          // Append the button to the target div child

          targetDivChild.appendChild(generateTextButton);
          
          
          // const textArea = textArea();
          generateTextButton.addEventListener('click', async function () {
            let connectBtn = connectButton();
            // click connect button
            connectBtn.click();

            // Wait for 500 milliseconds
          await new Promise((resolve) => setTimeout(resolve, 500));

          let addNoteBtn = addNoteButton();

          addNoteBtn.click()

          await new Promise((resolve) => setTimeout(resolve, 500));
          
          let textAreaForMessage = textArea();
          console.log(textAreaForMessage)
          const responseMessage = pressButtonClicked();
          console.log(responseMessage)
          responseMessage.then((resolvedMessage) => {
            // Extract the text part from the resolved message
             const textPart = resolvedMessage.trim();
             const messagesArray = textPart.split('\n')
             const combinedText = messagesArray.join(' ');
             const wordsArray = combinedText.split(/\s+/);
             
             fillTextAreaWithMessages(wordsArray,textAreaForMessage);
             let sendBtn = sendButtons();
             sendBtn.addEventListener('click', function () {
              // Hide the "Connect with AI" button immediately when the send button is clicked
              if (generateTextButton) {
                generateTextButton.style.display = 'none';
              }
            });  
           });
          });

          break;
        } else {
          console.log(`The target div child at position ${position} was not found or is not a <div> element within the second direct child <div>.`);
        }
      }
    } else {
      console.log('The 2nd direct child <div> was not found within the section.');
    }
  } else {
    console.log('No <section> elements found within the main element.');
  }
} else {
  console.log('The main element was not found within the body.');
}
  }
}


async function checkIfOtherUserProfile() {
  try {
    const usernameRegex = /\/in\/([a-zA-Z0-9-]+)/;
    const match = await location.href.match(usernameRegex);
    
    if (match && match[1]) { 
      const profileUsername = match[1];
      // Replace 'your-username' with your actual LinkedIn username
      const yourUsername = 'dev-sharma-5057661b7';
      return profileUsername !== yourUsername
    }
    return false; 

  } catch (err) {
    console.error(err);
    return false;
  }
}


// Check if it's another user's profile asynchronously
 function mainFunction() {

  checkIfOtherUserProfile().then(async (isOtherUserProfile) => {
    const removeConnection = await isRemoveConnection()
    
      if (isOtherUserProfile && !removeConnection) {
      console.log('createButton')
      await createButton();
      }
    
  }).catch((err) => {
    console.log(err);
  });
 }




// Function to send scraped data to your backend API
 async function pressButtonClicked() {
  const exp = await scrapExperience();
  const names = await scrapName();
  curProfile = exp[0]
  
  const name = names[0];
  const profileData = {
    name:name,
    profile: curProfile,
    regards: "Best Regards",
    myName : "Dev Sharma"

  }
  console.log(profileData)
  const response = await processGeneratePersonalizedMessage(profileData);
  if (response) {
    console.log('Received response:', response);
    return response
      
    } else {
      console.log('Received an error response:', response);
    }
  }





function checkConditionAndToggleButton() {
  // Your condition, replace with your logic
  const shouldHideButton = true; // Replace with your condition logic

  // Get a reference to your "Connect with AI" button
  const generateTextButton = document.getElementById('connectWithAI');

  if (generateTextButton) {
    // Toggle the "hidden" class based on the condition
    if (shouldHideButton) {
      generateTextButton.classList.add('hidden'); // Hide the button
    } else {
      generateTextButton.classList.remove('hidden'); // Show the button
    }
  }
}


async function processGeneratePersonalizedMessage(data){
  let apiKey = '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';
  let endPoint = 'https://api.openai.com/v1/completions';
  // const personalizedMessage = `Generate a complete personalized message for ${data.name} person who has an experince in ${data.profile} for linkedin to send along with connection request. Message must be end with ${data.regards} and my name ${data.myName}. Please generate complete message have full stop at the end. Take maximum of 300 characters.`
//  const personalizedMessage = `Generate a personalized LinkedIn connection request message for ${data.name}, a ${data.profile}, which must be under 280 characters and ends with ${data.regards} and my complete name ${data.myName}`
    const personalizedMessage = `Generate a personalized LinkedIn connection request message for ${data.name}, a ${data.profile}, which must be under 280 characters, and ensure that the message does not mention my own profile. The message must be end with '${data.regards}' and must include my complete name '${data.myName}.`
  try{
    let res = await fetch(endPoint,{
      method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body:JSON.stringify({
          "model":"text-davinci-003",
          "prompt": personalizedMessage,
          "max_tokens": 65,
          "temperature": 0.7
        })
    })
    // response = {
    //   type:"Generated-message-response",
    //   message:res.choices[0].text.trim()
    // }
    const tempData = await res.json()
    const text = tempData.choices[0].text ;
    return text;
  }catch(err){
    return err;
  } 
}


// Exp
function scrapExperience(){
  const mainElement =  document.body.querySelector('main');
  const experience = [];

// Check if the body element exists
if (mainElement) {
  // Use .querySelectorAll to find all <section> elements within the body
  const sectionElements =  mainElement.querySelectorAll('section');

  // Loop through sections from index 2 to 6 (inclusive)
  for (let i = 0; i < sectionElements.length; i++) {
    const requiredSection = sectionElements[i];
    const divHeading = requiredSection.querySelector('div:nth-child(2)');
    
    if (divHeading) {
      const spanDiv = divHeading.querySelector('span');
      
      if (spanDiv) {
        const spanHeading = spanDiv.textContent;
        
        if (spanHeading === 'Experience') {
          // Use .querySelector to find the 3rd <div> element within the current section
          const thirdDivElement = requiredSection.querySelector('div:nth-child(3)');
          
          // Check if the 3rd <div> element exists within the section
          if (thirdDivElement) {
            const firstDivSubEle = thirdDivElement.querySelector('div:nth-child(1)');
            
            if (firstDivSubEle) {
              const immediateChildDivs = firstDivSubEle.querySelectorAll('div > div');
  
              // Loop through each immediate child <div> element
              immediateChildDivs.forEach((divElement, index) => {
                // Use .querySelector to find the first <span> element within each <div>
                const firstSpanElement = divElement.querySelector('span:first-child');
  
                // Check if the first <span> element exists within the <div>
                if (firstSpanElement) {
                  const spanText =  firstSpanElement.textContent;
                  experience.push(spanText);
                  
                  
                }
              });
            } else {
              console.log('The 2nd <div> sub-element was not found within the 3rd div.');
            }
          } else {
            console.log('The 3rd <div> element was not found within the section.');
          }
        } else {
          console.log('The "Experience" span was not found within the section.');
        }
      } else {
        console.log('The spanDiv element was not found.');
      }
    } else {
      console.log('The divHeading element was not found.');
    }
  }
} else {
  console.log('The main element was not found.');
}

return experience;
}


// name

function scrapName(){
  // Find the main element within the body
  const mainElement =  document.body.querySelector('main');
  const name = [];
  // Check if the main element exists
  if (mainElement) {
    // Use .querySelectorAll to find all <section> elements within the main element
    const sections =  mainElement.querySelectorAll('section');
  
    // Check if there are sections
    if (sections.length > 0) {
      // Access the first section (index 0)
      const reqSection = sections[0];
  
      // Use .querySelector to find the 2nd direct child <div> within the section
      const secondDirectDivChild = reqSection.querySelector(':scope > div:nth-child(2)');
  
      // Check if the 2nd direct child <div> exists
      if (secondDirectDivChild) {
        // Use .querySelector to find the 2nd direct child <div> within secondDirectDivChild
        const secondDivChild = secondDirectDivChild.querySelector(':scope >div:nth-child(2)');
  
        // Check if the 2nd direct child <div> exists
        if (secondDivChild) {
          // Use .querySelector to find the <div> element within the structure div > div > h1
          const divElement = secondDivChild.querySelector('div > div > span> a> h1');
            
  
          // Check if the <div> element exists
          if (divElement) {
            // You can now work with the h1 element here
            name.push(divElement.textContent)
              
          } else {
            console.log('The h1 element was not found within the structure div > div > h1.');
          }
        } else {
          console.log('The 2nd direct child <div> was not found within secondDirectDivChild.');
        }
      } else {
        console.log('The 2nd direct child <div> was not found within the section.');
      }
    } else {
      console.log('No <section> elements found within the main element.');
    }
  } else {
    console.log('The main element was not found within the body.');
  }
return name;
}


function isRemoveConnection(){
  // Find the main element within the body
const mainElement = document.body.querySelector('main');

// Check if the main element exists
if (mainElement) {
  // Use .querySelectorAll to find all <section> elements within the main element
  const sections = mainElement.querySelectorAll('section');

  // Check if there are sections
  if (sections.length > 0) {
    // Access the first section (index 0)
    const reqSection = sections[0];

    // Use .querySelector to find the 2nd direct child <div> within the section
    const secondDirectDivChild = reqSection.querySelector(':scope > div:nth-child(2)');
      

    // Check if the 2nd direct child <div> exists
    if (secondDirectDivChild) {
      for (let position = 4; position <= 6; position++){
        let targetDivChild = secondDirectDivChild.querySelector(`:scope > :nth-child(${position})`);
          
          if (targetDivChild && targetDivChild.tagName.toLowerCase() === 'div'){
                const targetConnect = targetDivChild.querySelector('div>div>div>div>ul')
              if(targetConnect){
                const targetSpanChild = targetConnect.querySelector(':scope > li:nth-child(7)')
                  if(targetSpanChild){
                        const reqSpan = targetSpanChild.querySelector('div>span')
                      if(reqSpan){
                        const remConn = reqSpan.textContent;
                        if(remConn==='Remove Connection'){
                          return true

                        }else{
                          return false
                        }
                      }
                  }
                  
              }
          }
      }
    } else {
      console.log('The 2nd direct child <div> was not found within the section.');
    }
  } else {
    console.log('No <section> elements found within the main element.');
  }
} else {
  console.log('The main element was not found within the body.');
}}


// let textAreaForMessage = null;

// function textArea() {
//   // if(textAreaForMessage){
//   //   return textAreaForMessage
//   // }

//   const bodyElement = document.body;
//   if (bodyElement) {
//     const firstReqDiv = bodyElement.children[14];
//     if (firstReqDiv) {
//       const secondReqDiv = firstReqDiv.querySelector('div>div>div');
//       if (secondReqDiv) {
//         const thirdReqDiv = secondReqDiv.children[4];
//         if (thirdReqDiv) {
//           const regenerateChild = thirdReqDiv.children[0]
//           const generateTextButton = document.createElement('button');
//             generateTextButton.textContent = 'Regenerate';
//             generateTextButton.id = 'regenerate'; // Unique ID for each button
//             // CSS
//             generateTextButton.style.backgroundColor = 'orange';
//             generateTextButton.style.color = 'white';
//             generateTextButton.style.border = 'none';
//             generateTextButton.style.padding = '6px 12px';
//             generateTextButton.style.marginLeft = '2px';
//             generateTextButton.style.border = '2px black';
//             generateTextButton.style.fontSize = '12px'
//             generateTextButton.style.fontWeight = '500'
//             generateTextButton.style.borderRadius = '12px'

//             regenerateChild.appendChild(generateTextButton)
//             generateTextButton.addEventListener('click', generateTextClickHandler);
//             function generateTextClickHandler() {
//               // Disable the button to prevent multiple clicks
              
//               generateTextButton.disabled = true;
//               // if(!textAreaForMessage){
//               //   textAreaForMessage = textArea();
//               // }
//               const textAreaForMessage = createTextArea();
//               textAreaForMessage.value = ''; // Clear the existing text
//               const responseMessage = pressButtonClicked();
//               responseMessage.then((resolvedMessage) => {
//                 // Extract the text part from the resolved message
//                 const textPart = resolvedMessage.trim();
//                 const messagesArray = textPart.split('\n');
//                 const combinedText = messagesArray.join(' ');
//                 const wordsArray = combinedText.split(/\s+/);
            
//                 fillTextAreaWithMessages(wordsArray, textAreaForMessage);
            
//                 // Re-enable the button after generating
//                 generateTextButton.disabled = false;
//               });
//             }
//           const fourthReqDiv = thirdReqDiv.children[1];

//           if (fourthReqDiv) {
//             const textArea = fourthReqDiv.querySelector('textarea');
//             if (textArea) {
//               textAreaForMessage = textArea;
//               return textAreaForMessage;

//             } else {
//               console.log('Textarea element not found.');
//             }
//           } else {
//             console.log('Fourth required div not found.');
//           }
//         } else {
//           console.log('Third required div not found.');
//         }
//       } else {
//         console.log('Second required div not found.');
//       }
//     } else {
//       console.log('First required div not found.');
//     }
//   } else {
//     console.log('Body element not found.');
//   }
//   // Return null or handle the case where the textarea was not found
//   return null;
// }

function textArea() {
  const textAreaForMessage = createTextArea(); 
  const bodyElement = document.body;

  if (bodyElement) {
    const firstReqDiv = bodyElement.children[14];

    if (firstReqDiv) {
      const secondReqDiv = firstReqDiv.querySelector('div>div>div');

      if (secondReqDiv) {
        const thirdReqDiv = secondReqDiv.children[4];

        if (thirdReqDiv) {
          const regenerateChild = thirdReqDiv.children[0];
          const generateTextButton = document.createElement('button');
          generateTextButton.textContent = 'Regenerate';
          generateTextButton.id = 'regenerate'; // Unique ID for each button

          // CSS
          generateTextButton.style.backgroundColor = 'orange';
          generateTextButton.style.color = 'white';
          generateTextButton.style.border = 'none';
          generateTextButton.style.padding = '6px 12px';
          generateTextButton.style.marginLeft = '2px';
          generateTextButton.style.border = '2px black';
          generateTextButton.style.fontSize = '12px';
          generateTextButton.style.fontWeight = '500';
          generateTextButton.style.borderRadius = '12px';

          regenerateChild.appendChild(generateTextButton);
          generateTextButton.addEventListener('click', generateTextClickHandler);
          
          function generateTextClickHandler() {
            // Disable the button to prevent multiple clicks
            generateTextButton.disabled = true;

            // Create a new text area element for this profile
            const textAreaForMessage = createTextArea();

            textAreaForMessage.value = ''; // Clear the existing text
            const responseMessage = pressButtonClicked();

            responseMessage.then((resolvedMessage) => {
              // Extract the text part from the resolved message
              const textPart = resolvedMessage.trim();
              const messagesArray = textPart.split('\n');
              const combinedText = messagesArray.join(' ');
              const wordsArray = combinedText.split(/\s+/);

              fillTextAreaWithMessages(wordsArray, textAreaForMessage);

              // Re-enable the button after generating
              generateTextButton.disabled = false;
            });
          }
        } else {
          console.log('Third required div not found.');
        }
      } else {
        console.log('Second required div not found.');
      }
    } else {
      console.log('First required div not found.');
    }
  } else {
    console.log('Body element not found.');
  }

  return textAreaForMessage;
}

// Create a new text area element
function createTextArea() {
  const bodyElement = document.body;

  if (bodyElement) {
    const firstReqDiv = bodyElement.children[14];

    if (firstReqDiv) {
      const secondReqDiv = firstReqDiv.querySelector('div>div>div');

      if (secondReqDiv) {
        const thirdReqDiv = secondReqDiv.children[4];

        if (thirdReqDiv) {
          const fourthReqDiv = thirdReqDiv.children[1];
          const textArea = fourthReqDiv.querySelector('textarea');

          if (textArea) {
            return textArea;
          } else {
            console.log('Textarea element not found.');
          }
        } else {
          console.log('Third required div not found.');
        }
      } else {
        console.log('Second required div not found.');
      }
    } else {
      console.log('First required div not found.');
    }
  } else {
    console.log('Body element not found.');
  }

  // Return null or handle the case where the textarea was not found
  return null;
}



async function fillTextAreaWithMessages(wordsArray,textAreaForMessage) {
            
  // let txtAreaForMessage = textArea();
  let isComma = true;
  for (let i = 0; i < wordsArray.length; i++) {
    const message = wordsArray[i];
    if(i!==wordsArray.length-1){
      if(isComma && message.includes(',')){
        textAreaForMessage.value+=message + '\n'
        isComma = false;
      }else if(message==='Best'){
        textAreaForMessage.value+='\n' + message + ' '

      }else if(message==='Regards,'){
        textAreaForMessage.value+= message +'\n'
      }
      else{
        textAreaForMessage.value+=message + ' ';
      }
    }
    else{
      textAreaForMessage.value+=message
    }
    
    
    // Simulate a change event to trigger any associated handlers
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    textAreaForMessage.dispatchEvent(event);

    // You can wait for some time to see the message in the text area before moving to the next one
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
  

function isPending(){
  const bodyElement = document.body;
  const firstDiv = bodyElement.children[46];
  const secondDiv = firstDiv.children[3];
  const thirdDiv = secondDiv.querySelector('div>div>div>div');
  const fourthDiv = thirdDiv.children[1];
  const fifthDiv = fourthDiv.children[1];
  const sixthDiv = fifthDiv.children[0];
  const nextChild = sixthDiv.querySelector('main>section');
  const seventhDiv = nextChild.children[1];
  
  for (let position = 4; position <= 6; position++) {
      const targetDivChild = seventhDiv.querySelector(`:nth-child(${position})`);
      
      if (targetDivChild && targetDivChild.tagName.toLowerCase() === 'div') {
          const nextDivChild = targetDivChild.children[0];
  
          if (nextDivChild) {
              const eigthDivChild = nextDivChild.children[1];
              
              if (eigthDivChild) {
                  console.log('x')
                  const eightDivChildSpan = eigthDivChild.querySelector('span');
                  console.log(eightDivChildSpan)
                  
                  if (eightDivChildSpan && eightDivChildSpan.textContent.trim() === 'Pending') {
                      return true;
                  } else {
                      return false;
                  }
              } else {
                  const eigthDivChild2 = nextDivChild.children[2];
                  const ninthChild = eigthDivChild2.children[1];
                  
                  if (ninthChild) {
                      const reqUl = ninthChild.querySelector('div>div>ul');
                      const reqLi = reqUl.querySelector('li:nth-child(3)');
                      const reqSpan = reqLi.querySelector('span');
                      
                      if (reqSpan && reqSpan.textContent.trim() === 'Pending') {
                          return true;
                      } else {
                          return false;
                      }
                  } else {
                      console.log('The ninth child was not found.');
                  }
              }
          } else {
              console.log('The nextDivChild was not found.');
          }
      } else {
          console.log('The targetDivChild is not a div or was not found.');
      }
  }
}


function sendButtons(){
  const bodyElement = document.body;
const firstReqDiv = bodyElement.children[14];
const secondReqDiv = firstReqDiv.querySelector('div>div>div');
const thirdReqDiv = secondReqDiv.children[5];
const reqButton = thirdReqDiv.children[1]
return reqButton;
}

// Create a new text area element
function createTextArea() {
  const bodyElement = document.body;

  if (bodyElement) {
    const firstReqDiv = bodyElement.children[14];

    if (firstReqDiv) {
      const secondReqDiv = firstReqDiv.querySelector('div>div>div');

      if (secondReqDiv) {
        const thirdReqDiv = secondReqDiv.children[4];

        if (thirdReqDiv) {
          const fourthReqDiv = thirdReqDiv.children[1];
          const textArea = fourthReqDiv.querySelector('textarea');

          if (textArea) {
            return textArea;
          } else {
            console.log('Textarea element not found.');
          }
        } else {
          console.log('Third required div not found.');
        }
      } else {
        console.log('Second required div not found.');
      }
    } else {
      console.log('First required div not found.');
    }
  } else {
    console.log('Body element not found.');
  }

  // Return null or handle the case where the textarea was not found
  return null;
}