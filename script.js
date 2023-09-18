const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quotes from an API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); // Decode json to js object
        newQuote(); //Call it once to display the first quote on load
    } catch (err) {
        // Handle error 
    }
}

// Function for getting new quotes. Btw, it's ok to put it here, remember, functions and var gets hoisted on runtime.
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * (apiQuotes.length-1))];
    // console.log(quote);

    // Check 1: if author field is blank, replace with 'Unknown' if so
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;   
    }

    // Check 2: if quote text is too long, apply .long-quote css modifier, return it back to normal otherwise
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote and hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Function for tweeting quote
function tweetQuote() {
    // Use back ticks for string interpolation on template strings
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
