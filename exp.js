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

 