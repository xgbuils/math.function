var ParserStatus = require('../parser-status')
var FunctionToken = require('./function-token')
var ParenthesisLeftToken = require('./parenthesis-left-token')
var SetToken = require('./set-token.js')
var CommaToken = require('./comma-token.js')
var ParenthesisRightToken = require('./parenthesis-right-token')
var EndToken = require('./end-token')

function ParserProcessor (lexerGenerator) {
    this.parserStatus = new ParserStatus(lexerGenerator)
}

ParserProcessor.prototype.process = function () {
    var parserStatus = this.parserStatus
    var ParserTokenConstr = {
        'function': FunctionToken,
        'set': SetToken,
        '(': ParenthesisLeftToken,
        ')': ParenthesisRightToken,
        ',': CommaToken,
        'end': EndToken
    }[parserStatus.getTokenType()]
    if (ParserTokenConstr) {
        return new ParserTokenConstr(parserStatus).process()
    }
}

ParserProcessor.prototype.next = function () {
    var status = this.process()
    var done = !status
    return {
        value: done ? undefined : this.parserStatus.getValue(),
        done: done
    }
}

module.exports = ParserProcessor
