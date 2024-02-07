import java.util.*;

public class Main {
    //Initial values
    private static final float priceProdA = 20;
    private static final float priceProdB = 40;
    private static final float priceProdC = 50;
    private static final float giftWrapFee = 1;
    private static final int unitsPerPackage = 10;
    private static final float shippingFeePerPackage = 5;

    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.print("Enter Quantity of Product A: ");
        int quantA = sc.nextInt();
        System.out.print("Is Product A wrapped as a gift?(y/n)");
        boolean giftWrapA = sc.next().trim().equalsIgnoreCase("y");
        System.out.print("Enter Quantity of Product B: ");
        int quantB = sc.nextInt();
        System.out.print("Is Product B wrapped as a gift?(y/n)");
        boolean giftWrapB = sc.next().trim().equalsIgnoreCase("y");
        System.out.print("Enter Quantity of Product C: ");
        int quantC = sc.nextInt();
        System.out.print("Is Product C wrapped as a gift?(y/n)");
        boolean giftWrapC = sc.next().trim().equalsIgnoreCase("y");
        System.out.println("\nThe Shopping Cart Details...\n");

        //Total price of each product and subTotal
        float totA = priceProdA * quantA;
        float totB = priceProdB * quantB;
        float totC = priceProdC * quantC;
        float subTotal = totA + totB + totC;

        //Printing Details
        System.out.println("Product A \t->\t Quantity: "+quantA+"\tTotal: ₹"+totA);
        System.out.println("Product B \t->\t Quantity: "+quantB+"\tTotal: ₹"+totB);
        System.out.println("Product C \t->\t Quantity: "+quantC+"\tTotal: ₹"+totC);
        System.out.println("\nSubTotal: ₹"+subTotal);

        //Discount
        float discountFlat10 = 0;
        float discountBulk5 = 0;
        float discountBulk10 = 0;
        float discountTiered50 = 0;

        //Total Quantities
        int totalQuant = quantA + quantB + quantC;

        //flat_10_discount
        if (subTotal > 200) {
            discountFlat10 = 10;
        }

        //bulk_5_discount
        if (quantA > 10) {
            discountBulk5 += (float) (0.05 * totA);
        }
        if (quantB > 10) {
            discountBulk5 += (float) (0.05 * totB);
        }
        if (quantC > 10) {
            discountBulk5 += (float) (0.05 * totC);
        }

        //bulk_10_discount
        if (totalQuant > 20) {
            discountBulk10 = (float) (0.1 * subTotal);
        }

        //tiered_50_discount
        if (totalQuant > 30 && (quantA > 15 || quantB > 15 || quantC > 15)) {
            if (quantA > 15) {
                discountTiered50 += (float) ((quantA - 15) * priceProdA * 0.5);
            }
            if (quantB > 15) {
                discountTiered50 += (float) ((quantB - 15) * priceProdB * 0.5);
            }
            if (quantC > 15) {
                discountTiered50 += (float) ((quantC - 15) * priceProdC * 0.5);
            }
        }

        //Max Discount(most beneficial one for the customer)
        float maxDiscount = Math.max(Math.max(discountFlat10, discountBulk5), Math.max(discountBulk10, discountTiered50));
        subTotal -= maxDiscount;

        // Print the applied discount
        if (maxDiscount == discountFlat10) {
            System.out.println("Discount Applied: flat_10_discount");
        } else if (maxDiscount == discountBulk5) {
            System.out.println("Discount Applied: bulk_5_discount");
        } else if (maxDiscount == discountBulk10) {
            System.out.println("Discount Applied: bulk_10_discount");
        } else if (maxDiscount == discountTiered50) {
            System.out.println("Discount Applied: tiered_50_discount");
        }
        else {
            System.out.println("Discount Applied: None");
        }
        System.out.println("Discount Amount: ₹" + maxDiscount);

        //Gift wrapping fee
        float giftFeeA = 0;
        float giftFeeB = 0;
        float giftFeeC = 0;

        if (giftWrapA) {
            giftFeeA = quantA * giftWrapFee;
        }

        if (giftWrapB) {
            giftFeeB = quantB * giftWrapFee;
        }

        if (giftWrapC) {
            giftFeeC = quantC * giftWrapFee;
        }

        float totalGiftWrapFee = giftFeeA + giftFeeB + giftFeeC;
        System.out.println("Total Gift Wrapping Fee: ₹"+ totalGiftWrapFee);

        //Shipping fee
        int totalPackages = (int) Math.ceil((double) totalQuant / unitsPerPackage);
        float totalShippingFee = totalPackages * shippingFeePerPackage;
        System.out.println("Total Shipping Fee: ₹"+ totalShippingFee);

        //Total amount
        subTotal += totalShippingFee + totalGiftWrapFee;
        System.out.println("Final Total Amount: ₹" + subTotal);
    }
}
