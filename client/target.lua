local displayTarget
local Entity = Entity

local function entityIsNotDoor(entity)
	return not Entity(entity).state?.doorId
end

local function entityIsDoor(entity)
	local state = Entity(entity).state
	local doorId = state.doorId

	if doorId and not doors[doorId] then
		state.doorId = nil
		return false
	end

	return doorId
end

local function editDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		return TriggerServerEvent('ox_doorlock:editDoorlock', door.id, data)
	end

	TriggerServerEvent('ox_doorlock:editDoorlock', false, {
		model = GetEntityModel(entity),
		coords = GetEntityCoords(entity),
		heading = math.floor(GetEntityHeading(entity) + 0.5),
		groups = {
			police = 1
		},
		maxDistance = 2,
	})
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
					icon = 'fas fa-file-circle-plus',
					action = editDoorlock,
					canInteract = entityIsNotDoor
				},
				{
					label = 'Modify doorlock',
					icon = 'fas fa-file-pen',
					action = editDoorlock,
					canInteract = entityIsDoor
				},
				{
					label = 'Remove doorlock',
					icon = 'fas fa-file-circle-minus',
					action = editDoorlock,
					canInteract = entityIsDoor
				},
			}
		})
	else
		removeTarget()
	end
end)

AddEventHandler('onResourceStop', removeTarget)
