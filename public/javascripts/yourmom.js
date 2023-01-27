const appId = "***REMOVED***";
const locationId = "***REMOVED***";

document.addEventListener("DOMContentLoaded", async function () {
    if (!window.Square) {
        throw new Error("Square.js failed to load properly");
    }

    let payments;
    try {
        payments = window.Square.payments(appId, locationId);
    } catch {
        alert("Error");
    }

    const card = await payments.card();
    await card.attach("#card-container");

    const cardButton = document.getElementById("card-button");
    cardButton.addEventListener("click", async function (event) {
        let tokenResult;
        try {
            tokenResult = await card.tokenize();
            console.log(`BLAM! ${JSON.stringify(tokenResult.token)}`);
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    });

    // alert("Boo!");
});
