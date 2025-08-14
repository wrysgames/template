local downloadPlaceAsset = require("./libs/download-place")
local roblox = require("@lune/roblox")
local fs = require("@lune/fs")

local content = downloadPlaceAsset(110382146366775)
local game = roblox.deserializePlace(content)

if not fs.isDir("./assets/maps") then
	fs.writeDir("./assets/maps")
end

local ws = game:GetService("Workspace")
print(ws)
for i, v in ipairs(ws:GetChildren()) do
    print(v)
end

fs.writeFile("./assets/maps/Workspace.rbxm", roblox.serializeModel({game:GetService("Workspace")}))
fs.writeFile("./assets/maps/Lighting.rbxm", roblox.serializeModel({game:GetService("Lighting")}))