// *******mouse down******* //
window.mousedown = false
document.onmousedown = handleMouseDown
function handleMouseDown(event) {
    window.mousedown = true
}

// *******mouse up******* //
document.onmouseup = handleMouseUp
function handleMouseUp(event) {
    window.mousedown = false
}

// *******mouse move******* //
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    event = event || window.event; // IE-ism

    window.mousePos = {
        x: event.pageX,
        y: event.pageY
    }
};