local displayTarget
local Entity = Entity

local function entityIsNotDoor(entity)
	return not Entity(entity).state?.doorId
end

local function addDoorlock(entity)
	if not Entity(entity).state?.doorId then
		TriggerServerEvent('ox_doorlock:addDoorlock', {
			model = GetEntityModel(entity),
			coords = GetEntityCoords(entity),
			heading = GetEntityHeading(entity),
			groups = {
				police = 1
			},
			maxDistance = 2,
		})
	end
end

local function entityIsDoor(entity)
	local state = Entity(entity).state
	local doorId = state.doorId

	if doorId and not doors[doorId] then
		doors[doorId] = nil
		state.doorId = nil
		return false
	end

	return doorId
end

local function removeDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		TriggerServerEvent('ox_doorlock:removeDoorlock', door.id)
	end
end

local function removeTarget(res)
	if not res or res == 'ox_doorlock' then
		exports.qtarget:RemoveObject({'Remove doorlock', 'Create doorlock'})
	end
end

RegisterCommand('doorlock', function()
	displayTarget = not displayTarget

	if displayTarget then
		exports.qtarget:Object({
			options = {
				{
					label = 'Create doorlock',
					icon = 'fas fa-circle-plus',
					action = addDoorlock,
					canInteract = entityIsNotDoor
				},
				{
					label = 'Remove doorlock',
					icon = 'fas fa-circle-minus',
					action = removeDoorlock,
					canInteract = entityIsDoor
				},
			}
		})
	else
		removeTarget()
	end
end)

AddEventHandler('onResourceStop', removeTarget)
