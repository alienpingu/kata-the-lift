const elevator = new Elevator();
const building = new Building();

class Engine {
    constructor(actualFloor) {
        this.actualFloor = actualFloor || 0;
        this.floorBtns = document.querySelectorAll('.floor button');
        this.calledFloors = [];
        this.btnTimeout = undefined;
        this.movementsList = [];
        this.elevator = new Elevator(0);

        this.floorBtns.forEach(btn => btn.addEventListener('click', () => this.buttonClick(+btn.getAttribute('data-floor'))));
        this.elevator.move(building.floorsCoord, { action: 'TELEPORT', to: 0, time: 0 });
    }

    buttonClick(floor) {
        this.calledFloors.push(floor);
        this.computeMovements();

        if (this.btnTimeout) {
            clearTimeout(this.btnTimeout);
        }
        this.btnTimeout = setTimeout(() => {
            this.routine()
            this.movementsList = [];
            this.btnTimeout = undefined;
        }, 1500)
    }

    computeMovements() {
        while (this.calledFloors.length > 0) {
            const from = this.actualFloor;
            const to = this.calledFloors[0];
            const delta = Math.abs(from - to);
            const time = delta * 1000;

            if (to > from) {
                this.movementsList.push({ time: time, action: "UP", from: from, to: to });
            } else if (to < from) {
                this.movementsList.push({ time: time, action: "DOWN", from: from, to: to });
            }
            this.actualFloor = to;
            this.movementsList.push({ time: 2000, action: "DING" });

            this.calledFloors.shift();
        }
    }

    async routine() {
        for (const options of this.movementsList) {
            await elevator.move(building.floorsCoord, options);
        }
    }
}
