async function main() {
    await engine.openDoors();
    console.log('open');

    await engine.closeDoors();
    console.log('close');

    elevator.requestMovements(engine.calledFloors)
    console.log(elevator.computeMovments())
}

const engine = new Engine();
const elevator = new Elevator();

document.querySelector('button.run').addEventListener('click',() => main())

