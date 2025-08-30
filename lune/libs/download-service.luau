local fs = require('@lune/fs')
local roblox = require('@lune/roblox')

local function downloadService(placeData, service: string, directory: string)
    fs.writeFile(string.format('%s/%s.rbxm', directory, service), roblox.serializeModel({placeData:GetService(service)}))
end

return downloadService