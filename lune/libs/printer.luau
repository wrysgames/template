local stdio = require('@lune/stdio')

local Printer = {}

function Printer.success(text: string)
    stdio.write(stdio.color('green'))
    print(text)
    stdio.write(stdio.color('reset'))
end

function Printer.error(text: string)
    stdio.write(stdio.color('red'))
    print(text)
    stdio.write(stdio.color('reset'))
end

function Printer.info(text: string)
    stdio.write(stdio.color('red'))
    print(text)
    stdio.write(stdio.color('reset'))
end

return Printer