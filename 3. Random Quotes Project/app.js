// GLOBALS //
const quotes = [
    {
        quote: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
        author: "Marcus Aurelius",
    },
    {
        quote: "It gets easier. Every day, it gets a little easier. But you gotta do it every day – that’s the hard part. But it does get easier.",
        author: "From Bowjack Horseman",
    },
    {
        quote: "Every artist was first an amateur.",
        author: "Ralph Waldo Emerson",
    },
    {
        quote: "We cannot solve our problems with the same thinking we used when we created them.",
        author: "Albert Einstein",
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
]

let lastQuoteIndex = -1;

const quote = document.querySelector("#quotation-box__text q");
const quoteAuthor = document.querySelector("#quotation-box__text p");

// SETUP //
changeQuote(drawQuote())

// LISTENERS //
document.querySelector("#quotation-box__button").addEventListener("click", () => {
    const randomQuoteAndAuthor = drawQuote();
    changeQuote(randomQuoteAndAuthor);
})

// FUNCTIONS //
function drawQuote(){
    let quoteIndex;
    // This loop predict to return same quote 2 times
    while (true){
        quoteIndex = Math.floor(Math.random() * quotes.length);
        if (quoteIndex !== lastQuoteIndex) break;
    }
    lastQuoteIndex = quoteIndex;
    return quotes[lastQuoteIndex];
}

function changeQuote(quoteData){
    quote.innerText = quoteData.quote;
    quoteAuthor.innerText = quoteData.author;
}