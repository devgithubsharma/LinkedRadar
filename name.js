export default function scrapName(){
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
        const secondDivChild = secondDirectDivChild.querySelector(':scope > :nth-child(2)');
  
        // Check if the 2nd direct child <div> exists
        if (secondDivChild) {
          // Use .querySelector to find the <div> element within the structure div > div > h1
          const divElement = secondDivChild.querySelector('div > div > h1');
  
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