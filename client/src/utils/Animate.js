// FROM : https://easings.net/fr

export const parametricBlend = t => {
    const sqr = t * t
    return sqr / (2.0 * (sqr - t) + 1.0)
}

export const easeOutQuart = x => 1 - Math.pow(1 - x, 4)

export const easeInOutElastic = x => {
    const c5 = (2 * Math.PI) / 4.5

    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5
                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1
}

export const easeOutCubic = x => 1 - Math.pow(1 - x, 3)

export const easeOutBack = x => {
    const c1 = 1.70158
    const c3 = c1 + 1

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

export const animate = (callback, value, timing, easingFunction, returnBack = false) => {
    if (easingFunction) {

        let halfTime = timing / (returnBack ? 2 : 1)
        let startTime = performance.now()
        let elapsedTime = 0

        const animate = () => {
            elapsedTime = performance.now() - startTime
            if (elapsedTime < timing) {
                callback(Math.round(easingFunction((halfTime - Math.abs(elapsedTime - halfTime)) / timing) * value))
                window.requestAnimationFrame(animate)
            } else {
                callback(1)
            }
        }

        window.requestAnimationFrame(animate)
    }
}

export const easingFunctions = {
    parametricBlend,
    easeOutQuart,
    easeInOutElastic,
    easeOutCubic,
    easeOutBack
}
