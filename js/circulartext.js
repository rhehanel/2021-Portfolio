const angleToRadian = (angle) => {
    return angle * (Math.PI / 180);
};
const radius = 200;
const diameter = radius * 2;

const circle = document.querySelector('#circular-text');
circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.innerText;
const characters = text.split('');
circle.innerText = null;

let angle = -90;
const deltaAngle = 360 / characters.length;

characters.forEach((char, index) => {
    const charElement = document.createElement('span');
    charElement.innerText = char;
    const xPos = radius * ( 1 + Math.cos(angleToRadian(angle)));
    const yPos = radius * ( 1 + Math.sin(angleToRadian(angle)));

    const transform = `translate(${xPos}px, ${yPos}px)`;
    const rotate = `rotate(${index * deltaAngle}deg)`;
    charElement.style.transform = `${transform} ${rotate}`;

    angle += deltaAngle;
    circle.appendChild(charElement);
});
