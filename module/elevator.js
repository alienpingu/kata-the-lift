class Elevator {
    constructor(actualFloor) {
        this.areDoorsOpen = false;
        this.$elevator = document.querySelector('.elevator');
        this.$doors = document.querySelector('.elevator .doors');
        this.$displayFloor = document.querySelector('.display .floor');
        this.$displayAction = document.querySelector('.display .action');
        this.actualFloor = actualFloor || 0;
    }

    async openDoors() {
        if (this.$doors.classList.contains('open')) return;
        this.$doors.classList.add('open');
        this.areDoorsOpen = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    async closeDoors() {
        if (!this.$doors.classList.contains('open')) return;
        this.$doors.classList.remove('open');
        this.areDoorsOpen = false;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    async move(floorsCord, options) {
        const { action, time, to } = options;
        const floorCord = floorsCord.find(floor => floor.id === to);
        await new Promise(async resolve => {
            switch(action) {
                case 'UP':
                case 'DOWN':
                    this.$elevator.style.transitionDuration = time/1000 + 's';
                    this.$elevator.style.top = floorCord.y + 'px';
                    setTimeout(resolve, time);
                    break;
                case 'DING':
                    await this.openDoors();
                    await this.closeDoors();
                    setTimeout(resolve, time);
                    break;
                default:
                    this.$elevator.style.top = floorCord.y + 'px';
                    setTimeout(resolve, time);
                    break;
            }
        });
    }

    display(options) {
        const { to, floor } = options;
        this.$displayAction.innerHTML = to;
        this.$displayFloor.innerHTML = floor;
    }
}
