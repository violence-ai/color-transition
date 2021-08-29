import { Color } from './index.d'

export default class Index {

    private colors: Color[]

    constructor(colors: Color[]) {
        this.colors = colors
    }

    public getColor(progress: number) {

        let startColor = this.colors.reverse().find(item => {
            return item.pos <= progress
        })

        let endColor = this.colors.reverse().find(item => {
            return item.pos >= progress
        })

        if ( startColor === undefined || endColor === undefined ) {
            throw Error('В сете цветов обязательно должны быть цвета с прогрессом 0 и 100')
        }

        let progressBetweenColors = (progress - startColor.pos) / (Math.abs(startColor.pos - endColor.pos)/100)

        let r = this.calc(startColor.r, endColor.r, progressBetweenColors)
        let g = this.calc(startColor.g, endColor.g, progressBetweenColors)
        let b = this.calc(startColor.b, endColor.b, progressBetweenColors)

        return { r, g, b }
    }

    private calc(start: number, end: number, progressBetweenColors: number) {
        let val
        let r_diff = Math.abs(end - start)
        if ( r_diff === 0 ) {
            return start
        }
        if ( start < end ) {
            val = Math.ceil((r_diff/100) * progressBetweenColors)
        } else {
            val = Math.ceil((r_diff/100) * (100 - progressBetweenColors))
        }
        if ( val < 0 ) return 0
        if ( val > 255 ) return 255
        return val
    }
}
