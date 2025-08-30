local function defaultString(string1: string | nil, default: string): string
    if not string1 then
        return default
    end
    if #string1 == 0 then
        return default
    end
    return string1
end

return defaultString