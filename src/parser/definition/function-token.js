var ParserToken = require('./parser-token')

function FunctionToken (parserStatus) {
    ParserToken.call(this, parserStatus, [
        'START_EXPR',
        'ARG_FUNCTION',
        'ARG_TUPLE'
    ])
}

FunctionToken.prototype = Object.create(ParserToken.prototype)
FunctionToken.prototype.constructor = FunctionToken

FunctionToken.prototype.nextStatus = function (status) {
    this.parserStatus.save({
        fn: this.value,
        fnName: this.key
    })
    return status
}

module.exports = FunctionToken
