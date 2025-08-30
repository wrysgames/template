local stdio = require('@lune/stdio')
local roblox = require('@lune/roblox')
local fs = require('@lune/fs')

local downloadService = require('./libs/download-service')
local defaultString = require('./libs/default-string')
local printer = require('./libs/printer')

local fileName = defaultString(stdio.prompt('text', 'What is the name of the game (rbxl/rbxlx) file?'), 'game.rbxlx')

local success, result = pcall(function()
    local gameContentRaw = fs.readFile(fileName)
    local gameContent = roblox.deserializePlace(gameContentRaw)
    return gameContent
end)

if success == true and result then
    local mapsFolder = defaultString(stdio.prompt('text', 'Where would you like to store these maps?'), './assets/maps')
    if not fs.isDir(mapsFolder) then
        fs.writeDir(mapsFolder)
    end

    success, result = pcall(function()
        downloadService(result, 'Workspace', mapsFolder)
        downloadService(result, 'Lighting', mapsFolder)
    end)

    if success then
        printer.success('Successfully downloaded maps.')
    else
        printer.error('Error downloading services.')
    end
else
    -- Handle errors
    printer.error('Could not find the game file. Are you sure it exists?')
end