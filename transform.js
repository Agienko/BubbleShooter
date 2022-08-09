


root.style.transform = `scale(${
    Math.min(window.innerWidth/770, window.innerHeight/1100, 1)
})`


window.addEventListener('resize', function () {
    root.style.transform = `scale(${
        Math.min(window.innerWidth/770, window.innerHeight/1100, 1)
    })`

})
