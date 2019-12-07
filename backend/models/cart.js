module.exports = function cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty|| 0;
    this.totalPrice = oldCart.totalPrice|| 0;
    this.totalPrice1 = oldCart.totalPrice1|| 0;
    this.totalfPrice = oldCart.totalfPrice|| 0;
    this.totalwPrice = oldCart.totalwPrice|| 0;
    this.market = oldCart.market|| null;
    var fp,wp;
    this.add = function(item, id){
        
        if(this.totalfPrice > this.totalwPrice){
            this.market= false;
            this.totalPrice = this.totalwPrice;
        }
        else{
            this.market= true;
            this.totalPrice = this.totalfPrice;
            console.log("else");
        }

    };
    this.reduce = function (id) {
        this.items[id].qty--;
        this.items[id].fprice -= this.items[id].item.fprice;
        this.items[id].wprice -= this.items[id].item.wprice;
        this.totalQty--;
        this.totalwPrice -= this.items[id].item.wprice;
        this.totalfPrice -= this.items[id].item.fprice;
        if(this.totalfPrice > this.totalwPrice){
            this.market= false;
            this.totalPrice = this.totalwPrice;
        }
        else{
            this.market= true;
            this.totalPrice = this.totalfPrice;
            console.log("else");
        }

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    this.increase = function (id) {
        this.items[id].qty++;
        this.items[id].fprice += this.items[id].item.fprice;
        this.items[id].wprice += this.items[id].item.wprice;
        this.totalQty++;
        this.totalwPrice += this.items[id].item.wprice;
        this.totalfPrice += this.items[id].item.fprice;
        if(this.totalfPrice > this.totalwPrice){
            this.market= false;
            this.totalPrice = this.totalwPrice;
        }
        else{
            this.market= true;
            this.totalPrice = this.totalfPrice;
            console.log("else");
        }
    };

    this.generateArray = function () {
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};
