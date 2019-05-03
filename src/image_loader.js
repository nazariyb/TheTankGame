const loadImage = (src) => new Promise( (res, rej) => {
    const img = new Image()
    img.onload = () => res (img)
    img.src = src
})

export default loadImage