class Elevator {
    areDoorsOpen = false;
    $elevator = document.querySelector('.elevator');
    $doors = document.querySelector('.elevator .doors');
    $displayFloor = document.querySelector('.display .floor');
    $displayAction = document.querySelector('.display .action');
    
    constructor(actualFloor) {
        this.actualFloor = actualFloor || 0;
    }

    async openDoors() {
        await new Promise(resolve => {
            if (!this.$doors.classList.contains('open')) {
                this.$doors.classList.add('open');
                this.areDoorsOpen = true;
                setTimeout(() => resolve(), 2000)
            } else {
                resolve();
            }
        
        });
    }

    async closeDoors() {
        await new Promise(resolve => {
            if (this.$doors.classList.contains('open')) {
                this.areDoorsOpen = false;
                this.$doors.classList.remove('open');
                setTimeout(() => resolve(), 2000)
            } else {
                resolve();
            }
        
        });
    }

    async move(floorsCord, options) {
        const {action, time, to} = options;
        const floorCord = floorsCord.find(floor => floor.id === to);

        await new Promise(async resolve => {
            switch(action) {
                case 'UP':
                case 'DOWN':
                    this.$elevator.style.transitionDuration = time/1000 + 's';
                    this.$elevator.style.top = floorCord.y + 'px';
                    setTimeout(() => resolve(), time)
                    break;
                case 'DING':
                    await this.openDoors();
                    await this.closeDoors();
                    setTimeout(() => resolve(), time)
                    break;
                default:
                    this.$elevator.style.top = floorCord.y + 'px';
                    setTimeout(() => resolve(), time)
                    break;
            }
        });
    }

    display(options) {
        this.$displayAction.innerHTML = options.to
        this.$displayFloor.innerHTML = floor
    }

}