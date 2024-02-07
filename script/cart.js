//Initial Values
const priceProdA = 20;
const priceProdB = 40;
const priceProdC = 50;
const giftWrapFee = 1;
const unitsPerPackage = 10;
const shippingFeePerPackage = 5;

// Discount Calc Fucntion
function calculateDiscounts(quantA, quantB, quantC, totA, totB, totC, subTotal) {
    let discountFlat10 = 0;
    let discountBulk5 = 0;
    let discountBulk10 = 0;
    let discountTiered50 = 0;

    //Total Quantities
    const totalQuant = quantA + quantB + quantC;

    // flat_10_discount
    if (subTotal > 200) {
        discountFlat10 = 10;
    }

    // bulk_5_discount
    if (quantA > 10) {
        discountBulk5 += 0.05 * totA;
    }
    if (quantB > 10) {
        discountBulk5 += 0.05 * totB;
    }
    if (quantC > 10) {
        discountBulk5 += 0.05 * totC;
    }

    // bulk_10_discount
    if (totalQuant > 20) {
        discountBulk10 = 0.1 * subTotal;
    }

    // tiered_50_discount
    if (totalQuant > 30 && (quantA > 15 || quantB > 15 || quantC > 15)) {
        if (quantA > 15) {
            discountTiered50 += (quantA - 15) * priceProdA * 0.5;
        }
        if (quantB > 15) {
            discountTiered50 += (quantB - 15) * priceProdB * 0.5;
        }
        if (quantC > 15) {
            discountTiered50 += (quantC - 15) * priceProdC * 0.5;
        }
    }

    // Apply max Discount(most beneficial one for the customer)
    const maxDiscount = Math.max(Math.max(discountFlat10, discountBulk5),Math.max(discountBulk10, discountTiered50));
    subTotal -= maxDiscount;
    
    //Discount Apply conditions
     if (maxDiscount == discountFlat10) {
            console.log("Discount Applied: flat_10_discount");
        } else if (maxDiscount == discountBulk5) {
            console.log("Discount Applied: bulk_5_discount");
        } else if (maxDiscount == discountBulk10) {
            console.log("Discount Applied: bulk_10_discount");
        } else if (maxDiscount == discountTiered50) {
            console.log("Discount Applied: tiered_50_discount");
        }
        else {
            console.log("Discount Applied: None");
        }

    //returning total and the discount
    return { subTotal, maxDiscount };
}

// Gift Wrapping Calc Function
function calculateGiftWrapFee(giftWrapA, giftWrapB, giftWrapC, quantA, quantB, quantC) {
    let giftFeeA = 0;
    let giftFeeB = 0;
    let giftFeeC = 0;

    if (giftWrapA) {
        giftFeeA = quantA * giftWrapFee;
    }

    if (giftWrapB) {
        giftFeeB = quantB * giftWrapFee;
    }

    if (giftWrapC) {
        giftFeeC = quantC * giftWrapFee;
    }

    //Total Gift Wrap Fee
    const totalGiftWrapFee = giftFeeA + giftFeeB + giftFeeC;
    return totalGiftWrapFee;
}

// Shipping Fee Calc Function
function calculateShippingFee(totalQuant) {
    const totalPackages = Math.ceil(totalQuant / unitsPerPackage);
    const totalShippingFee = totalPackages * shippingFeePerPackage;
    return totalShippingFee;
}

// Main function 
function main() {
    const quantA = parseInt(prompt("Enter Quantity of Product A: "));
    const giftWrapA = (prompt("Is Product A wrapped as a gift? (y/n)")).trim().toLowerCase() === "y";
    const quantB = parseInt(prompt("Enter Quantity of Product B: "));
    const giftWrapB = (prompt("Is Product B wrapped as a gift? (y/n)")).trim().toLowerCase() === "y";
    const quantC = parseInt(prompt("Enter Quantity of Product C: "));
    const giftWrapC = (prompt("Is Product C wrapped as a gift? (y/n)")).trim().toLowerCase() === "y";

    console.log("The Shopping Cart Details...\n");

    //Total Price of each product and subTotal
    const totA = priceProdA * quantA;
    const totB = priceProdB * quantB;
    const totC = priceProdC * quantC;
    let subTotal = totA + totB + totC;

    //Printing Details
    console.log(`Product A\t Quantity: ${quantA}\tTotal: ₹${totA}`);
    console.log(`Product B\t Quantity: ${quantB}\tTotal: ₹${totB}`);
    console.log(`Product C\t Quantity: ${quantC}\tTotal: ₹${totC}`);
    console.log(`\nSubTotal: ₹${subTotal}`);

    //Discounts
    const { subTotal: discountedTotal, maxDiscount } = calculateDiscounts(quantA, quantB, quantC, totA, totB, totC, subTotal);
    console.log(`Discount Amount: ₹${maxDiscount}`);

    //Gift wrapping fee
    const totalGiftWrapFee = calculateGiftWrapFee(giftWrapA, giftWrapB, giftWrapC, quantA, quantB, quantC);
    console.log(`Total Gift Wrapping Fee: ₹${totalGiftWrapFee}`);

    //Shipping fee
    const totalQuant = quantA + quantB + quantC;
    const totalShippingFee = calculateShippingFee(totalQuant);
    console.log(`Total Shipping Fee: ₹${totalShippingFee}`);

    //Total amount
    const finalTotal = discountedTotal + totalGiftWrapFee + totalShippingFee;
    console.log(`Final Total Amount: ₹${finalTotal}`);
}

// Calling the main function
main();
