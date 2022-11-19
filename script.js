
// Global variables
const quoteContainer =  document.getElementById('quote-container')
const quoteText =  document.getElementById( 'quote' );
const authorText =  document.getElementById( 'author' );
const twitterBtn =  document.getElementById( 'twitter' );
const newQuoteBtn =  document.getElementById( 'new-quote' );
const loader =  document.getElementById( 'loader' );

//Quotes Endpoint
let apiQuotes = [];


const showLoadingSpinner = () =>
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}


const removeLoadingSpinner = () =>
{ 
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
const newQuote = () =>
{
    showLoadingSpinner();
    // Pick a random quote from api quotes array
    const quote = apiQuotes[ Math.floor( Math.random() * apiQuotes.length ) ];
    
    //Check if author field is blank and replace it with 'Unknown author'
    if ( !quote.author )
    { 
        authorText.textContent = 'Unknown author';
    } else
    {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling
    if ( quote.text.length > 120 )
    { 
        quoteText.classList.add( 'long-quote' );
    } else
    { 
        quoteText.classList.remove( 'long-quote' );
    }
    //Set the quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from api
const getQuotes = async () =>
{ 
    showLoadingSpinner();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch( apiUrl );
        apiQuotes = await response.json();
        newQuote();
    } catch ( error )
    {
        // Catch error here
        alert( 'Something went wrong, please try again later' );
    }
}

// Tweet a quote
const tweetQuote = () =>
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${ quoteText.textContent } - ${ authorText.textContent }`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
twitterBtn.addEventListener( 'click', tweetQuote );
newQuoteBtn.addEventListener( 'click', newQuote );

// Onload
getQuotes();