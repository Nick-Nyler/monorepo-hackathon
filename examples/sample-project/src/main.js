// Sample JavaScript project for testing the code analyzer

var globalVariable = "This should be const";

function calculateTotal(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.taxRate = 0.08;
    }

    addItem(item) {
        this.items.push(item);
        console.log("Item added:", item.name);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    calculateSubtotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    calculateTax() {
        return this.calculateSubtotal() * this.taxRate;
    }

    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTax();
    }
}

// TODO: Add error handling
function processPayment(amount) {
    if (amount > 1000) {
        console.log("Large payment detected");
    }
    
    // FIXME: Implement actual payment processing
    return true;
}

// Magic numbers in code
const MAX_ITEMS = 100;
const MIN_PRICE = 0.01;
const DISCOUNT_THRESHOLD = 50;

function applyDiscount(total) {
    if (total > DISCOUNT_THRESHOLD) {
        return total * 0.9;
    }
    return total;
}

// Deep nesting example
function complexLogic(data) {
    if (data) {
        if (data.items) {
            if (data.items.length > 0) {
                if (data.items[0].price > 100) {
                    if (data.user && data.user.vip) {
                        return "VIP discount applied";
                    } else {
                        return "Standard pricing";
                    }
                } else {
                    return "Low value item";
                }
            } else {
                return "No items";
            }
        } else {
            return "No items array";
        }
    } else {
        return "No data";
    }
}

module.exports = {
    ShoppingCart,
    calculateTotal,
    processPayment,
    applyDiscount,
    complexLogic
};
