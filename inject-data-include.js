
// this javascript code is meant to inject text or html snippits into a static html page
// this enables you for instance to re-use a large navigation bar in many static pages
// it is used on www.bomengids.nl 
// see https://github.com/hanscees/javascript-inject-static/

// the script loads these snippits from urls of your choosing
// it fires on a div like this
// <div data-include="https://www.hanscees.com/snippit.asc">poe</div>
// so the div above will be re-written to 
// <div data-include="https://www.hanscees.com/snippit.asc"> 
// [ here the data from snippit.asc ]
// </div>

// oh, and you can use it many times on one html page. 


// this function takes a div with href inside, then injects txt of href inside that div
const getHref = async (insert) => {
    	const href = insert.dataset.include;
    	console.log('href is', href);
    	const response = await fetch(href);
    	  if(response.status !== 200){
    	  	throw new Error('cannot fetch the data');
    	  }
    	const data = await response.text();
    	//console.log('text is', data);
    	return data;   
    };

//we get all divs with data-include= like
// <div data-include="https://www.hanscees.com/javascript2020/insert/snippit.asc">poe</div>
// and cycle through them
// then get the href text and insert it




    
 // This code runs the script on all selecrted divs when the page is loaded.

document.addEventListener('DOMContentLoaded', e => {
    console.log('dom is loaded now');
  const allInserts = document.querySelectorAll('div[data-include]');
    console.log(allInserts);
    allInserts.forEach(insert => {
        console.log('insert is now ', insert);
        getHref(insert)
        //.then(data => console.log('resolved', data))
        .then(data => {
            // now insert data into div
            insert.innerHTML = data;
        })
        .catch(err => console.log('rejected', err.message));
    });
  console.log('we log now after forEach')
  // you might add some more stuff here optionally to run after all is injected
});

