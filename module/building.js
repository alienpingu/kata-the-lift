class Building {
    constructor() {
        this.floorsCoord = [];
        this.$floors = document.querySelectorAll('.floor-container .floor');
        this.floorsCount = this.$floors.length;
        this.initFloorsCoord();
    }

    initFloorsCoord() {
        this.$floors.forEach(floor => {
            const floorButton = floor.querySelector('button');
            const id = +floorButton.getAttribute('data-floor');
            const y = floor.getBoundingClientRect().y;
            this.floorsCoord.push({ id, y });
        });
    }
}
