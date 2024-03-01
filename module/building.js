class Building {
    floorsCoord = []
    $floors = document.querySelectorAll('.floor-container .floor');
    floorsCount = this.$floors.length

    constructor() {
        this.$floors.forEach((floor) => {
            this.floorsCoord.push({
                id: +floor.querySelector('button').getAttribute('data-floor'),
                y: floor.getBoundingClientRect().y, 
            });
        });
    }
}