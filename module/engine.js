class Engine {
    floorBtns = document.querySelectorAll('.floor button')
    calledFloors = []
    timeoutID = undefined
    areDoorsOpen = false;
    constructor() {
        this.floorBtns.forEach((btn) => btn.addEventListener('click', () => this.buttonClick(+btn.getAttribute('data-floor'))));
    }

    buttonClick(floor) {
        this.calledFloors.push(floor);
        console.log(this.calledFloors);
    }

    async openDoors() {
        // Simulazione di un'operazione asincrona (apertura delle porte)
        await new Promise(resolve => {
            setTimeout(() => {
                this.areDoorsOpen = true;
                resolve();
            }, 2000); // Simulare un timeout di 2 secondi
        });
    }

    async closeDoors() {
        // Simulazione di un'operazione asincrona (chiusura delle porte)
        await new Promise(resolve => {
            setTimeout(() => {
                this.areDoorsOpen = false;
                resolve();
            }, 2000); // Simulare un timeout di 2 secondi
        });
    }

}