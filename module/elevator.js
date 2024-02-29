class Elevator {
    constructor(actualFloor) {
        this.actualFloor = actualFloor || 0;
        this.calledFloors = []
    }

    requestMovements = (calledFloors) =>  {
        calledFloors.forEach(floor => {
            (floor === this.actualFloor) || this.calledFloors.push(floor)
        })
        let beforeActualFloor = this.calledFloors.filter(n => n > this.actualFloor);
        let afterActualFloor = this.calledFloors.filter(n => n <= this.actualFloor);
        beforeActualFloor.sort((a, b) => a - b);
        afterActualFloor.sort((a, b) => b - a); 
        const sorted = beforeActualFloor.concat(afterActualFloor);
        this.calledFloors = [...new Set(sorted)];
        return(this.calledFloors)
    };

    computeMovments = () =>  {
        let index = 0;
        let movmentsArr = []
        while (this.calledFloors.length > 0 ) {
            const from = this.actualFloor   
            const to = this.calledFloors[0]
            while (to !== this.actualFloor) {
                if (to > from) {
                    movmentsArr.push({
                        action: "UP",
                        from: from,
                        to: this.actualFloor
                    })
                    this.actualFloor++
                } else if (to < from) {
                    movmentsArr.push({
                        action: "DOWN",
                        from: from,
                        to: this.actualFloor
                    })
                    this.actualFloor--
                }
            }
            movmentsArr.push({
                action: "DING",
                from: from,
                to: this.actualFloor
            })
            this.calledFloors.shift()
            index++;
        }
        return(movmentsArr);
    }   

}