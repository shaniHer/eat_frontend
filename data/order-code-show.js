//CREATING ORDER//////
​
createOrder() {
    this.order.buyer = {
        _id: this.user._id,
        fullname: this.user.fullname,
        imgUrl: this.user.imgUrl,
    };
    this.order.meal = {
        _id: this.meal._id,
        title: this.meal.title,
        capacity: this.meal.capacity,
    };
    this.order.host = {
        _id: this.host._id,
        fullname: this.host.fullname,
        imgUrl: this.host.imgUrl,
    };
}
​
//SAVE ORDER AND UPDATE GUESTS
​
async saveOrder() {
    try {
        await this.$store.dispatch({ type: "saveOrder", order: this.order });
        this.isBooking = !this.isBooking;
        this.isOrderPlaced = !this.isOrderPlaced;
        
        const userMsg = {};
        userMsg.txt = "saved order completed";
        userMsg.type = "success";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
​
        this.updateGuests();
        
    } catch (err) {
        const userMsg = {};
        userMsg.txt = "problem in saveOrder try again";
        userMsg.type = "danger";
        this.$store.dispatch({ type: "setUserMsg", userMsg });
    }
}
​
async updateGuests() {
    const updateGuests = {
        mealId: this.order.meal._id,
        guests: this.order.guestsNum,
    };
    try {
        await this.$store.dispatch({ type: "addGuests", updateGuests });
    } catch (err) {
      console.log('err in update guests', err)
    }
}
​
​
//UPDATE MEAL GUESTS - BACKEND MEAL CONTROLLER//
async function updateGuests(req, res) {
    const meal = req.body
    try {
        const updateMeal = await mealService.update(meal)
        res.send(updateMeal)
    } catch (err) {
        logger.error('Failed to addMeal function', err)
        res.status(401).send({ err: 'in addMeal function' })
    }
}
​
//UPDATE MEAL GUESTS - BACKEND MEAL SERVICE//
async function update(meal) {
    try {
        const collection = await dbService.getCollection('meal')
        const updateMeal = await collection.findOne({ '_id': ObjectId(meal.mealId) })
        
        meal.guests += +updateMeal.guests
        updateMeal.guests = meal.guests
        await collection.updateOne({ _id: ObjectId(meal.mealId)}, { $set: updateMeal })
        return updateMeal;
    } catch (err) {
        logger.error(`cannot update meal ${meal._id}`, err)
        throw err
    }
}
​