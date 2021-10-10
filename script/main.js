import {mockr} from "./mockr/mockr";

const mode = document.querySelector('#select-mode')
mode.addEventListener('change', setMode)


function setMode(e) {
    let paintMode = document.querySelector('#paint-mode')
    let fractalMode = document.querySelector('#fractal-mode')
    let transformerMode = document.querySelector('#transformer-mode')
    let selected = e.target.value;

    switch (selected) {
        case 'paint-mode':
            fractalMode.classList.add('hidden')
            transformerMode.classList.add('hidden')
            paintMode.classList.remove('hidden')
            break
        case 'fractal-mode':
            fractalMode.classList.remove('hidden')
            transformerMode.classList.add('hidden')
            paintMode.classList.add('hidden')
            break
        case 'transformer-mode':
            fractalMode.classList.add('hidden')
            transformerMode.classList.remove('hidden')
            paintMode.classList.add('hidden')
            break
    }

    mockr.cleanUp()
}