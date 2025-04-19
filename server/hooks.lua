local eventHooks = {}
local hookId = 0

function TriggerEventHooks(event, payload)
    local callbacks = eventHooks[event]
    if not callbacks then return end

    local response = nil

    for i=1, #callbacks do
        local callback = callbacks[i]

        if callback.nameFilter and (payload.door.name and not payload.door.name:match(callback.nameFilter)) then
            goto continue
        end

        if callback.print then
            lib.print.info(('Triggering event hook "%s:%s:%s".'):format(callback.resource, event, i))
        end
        
        local start = os.microtime()
        local _, result = pcall(callback, payload)
        local executionTime = os.microtime() - start
        
        if executionTime >= 100000 then
            warn(('Execution of event hook "%s:%s:%s" took %.2fms.'):format(callback.resource, event, i, executionTime / 1e3))
        end

        if result ~= nil then
            response = result
        end

        ::continue::
    end

    return response
end

function registerHook(event, callback, options)
    if not eventHooks[event] then eventHooks[event] = {} end
    
    local mt = getmetatable(callback)
    mt.__index = nil
    mt.__newindex = nil
    callback.resource = GetInvokingResource()
    hookId = hookId + 1
    callback.hookId = hookId

    if options then
        for k,v in pairs(options) do
            callback[k] = v
        end
    end

    eventHooks[event][#eventHooks[event] + 1] = callback
    return hookId
end

exports('registerHook', registerHook)

function removeResourceHook(resource, hookId)
    for event, callbacks in pairs(eventHooks) do
        for i = #callbacks, 1, -1 do
            local callback = callbacks[i]
            if callback.resource == resource and (not hookId or callback.hookId == hookId) then
                table.remove(eventHooks[event], i)
            end
        end
    end
end

AddEventHandler('onResourceStop', removeResourceHook)
exports('removeResourceHook', function(id)
    removeResourceHook(GetInvokingResource() or cache.resource, id)
end)

return TriggerEventHooks
