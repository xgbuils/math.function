var Iterum = require('iterum')
var Value = Iterum.Value

function lexer (string, tokenCalculator, regexp) {
    var endToken = {
        type: 'end'
    }
    return Iterum(function () {
        var column = 1

        return {
            next: function () {
                var matches = regexp.exec(string)
                var done = matches === null
                var token
                if (!done) {
                    checkError(matches[0], regexp, string, column)
                    token = tokenCalculator.calculate(matches[2], column + matches[1].length)
                    column += matches[0].length
                }
                return {
                    value: token,
                    done: done
                }
            }
        }
    })
    .concat(Value(endToken))
}

function checkError (match, regexp, string, column) {
    var startMatching = regexp.lastIndex - match.length + 1
    if (startMatching !== column) {
        throw new Error('error' + string.slice(column, startMatching))
    }
}

module.exports = lexer
