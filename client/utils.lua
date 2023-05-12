local Entity = Entity

local function getDoorFromEntity(data)
	local entity = type(data) == 'table' and data.entity or data

	if not entity then return end

	local state = Entity(entity)?.state
	local doorId = state?.doorId

	if not doorId then return end

	local door = doors[doorId]

	if not door then
		state.doorId = nil
	end

	return door
end

local function entityIsNotDoor(data)
	local entity = type(data) == 'number' and data or data.entity
	return not getDoorFromEntity(entity)
end

PickingLock = false

local function canPickLock(entity)
	if PickingLock then return false end

	local door = getDoorFromEntity(entity)

	return door and door.lockpick and (Config.CanPickUnlockedDoors or door.state == 1)
end

---@param entity number
local function pickLock(entity)
	local door = getDoorFromEntity(entity)

	if not door or PickingLock or not door.lockpick or (not Config.CanPickUnlockedDoors and door.state == 0) then return end

	PickingLock = true

	TaskTurnPedToFaceCoord(cache.ped, door.coords.x, door.coords.y, door.coords.z, 4000)
	Wait(500)
	lib.requestAnimDict('mp_common_heist')
	TaskPlayAnim(cache.ped, 'mp_common_heist', 'pick_door', 3.0, 1.0, -1, 49, 0, true, true, true)

	local success = lib.skillCheck(door.lockpickDifficulty or Config.LockDifficulty)
	local rand = math.random(1, success and 100 or 5)

	if success then
		TriggerServerEvent('ox_doorlock:setState', door.id, door.state == 1 and 0 or 1, true)
	end

	if rand == 1 then
		TriggerServerEvent('ox_doorlock:breakLockpick')
		lib.notify({ type = 'error', description = locale('lockpick_broke') })
	end

	StopEntityAnim(cache.ped, 'pick_door', 'mp_common_heist', 0)

	PickingLock = false
end

exports('pickClosestDoor', function()
	if not ClosestDoor then return end

	pickLock(ClosestDoor.entity)
end)

local tempData = {}

local function addDoorlock(data)
	local entity = type(data) == 'number' and data or data.entity
	local model = GetEntityModel(entity)
	local coords = GetEntityCoords(entity)

	AddDoorToSystem(`temp`, model, coords.x, coords.y, coords.z, false, false, false)
	DoorSystemSetDoorState(`temp`, 4, false, false)

	coords = GetEntityCoords(entity)
	tempData[#tempData + 1] = {
		entity = entity,
		model = model,
		coords = coords,
		heading = math.floor(GetEntityHeading(entity) + 0.5)
	}

	RemoveDoorFromSystem(`temp`)
end

local isAddingDoorlock = false

RegisterNUICallback('notify', function(data, cb)
    cb(1)
    lib.notify({title = data})
end)

RegisterNUICallback('createDoor', function(data, cb)
	cb(1)
	SetNuiFocus(false, false)

	data.state = data.state and 1 or 0

	if data.items and not next(data.items) then
		data.items = nil
	end

	if data.characters and not next(data.characters) then
		data.characters = nil
	end

	if data.lockpickDifficulty and not next(data.lockpickDifficulty) then
		data.lockpickDifficulty = nil
	end

	if data.groups and not next(data.groups) then
		data.groups = nil
	end

	if not data.id then
		isAddingDoorlock = true
		local doorCount = data.doors and 2 or 1
		local lastEntity = 0

		lib.showTextUI(locale('add_door_textui'))

		repeat
			DisablePlayerFiring(cache.playerId, true)
			DisableControlAction(0, 25, true)

			local hit, entity, coords = lib.raycast.cam(1|16)
			local changedEntity = lastEntity ~= entity
			local doorA = tempData[1]?.entity

			if changedEntity and lastEntity ~= doorA then
				SetEntityDrawOutline(lastEntity, false)
			end

			lastEntity = entity

			if hit then
				---@diagnostic disable-next-line: param-type-mismatch
				DrawMarker(28, coords.x, coords.y, coords.z, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.2, 0.2, 255, 42, 24, 100, false, false, 0, true, false, false, false)
			end

			if hit and entity > 0 and GetEntityType(entity) == 3 and (doorCount == 1 or doorA ~= entity) and entityIsNotDoor(entity) then
				if changedEntity then
					SetEntityDrawOutline(entity, true)
				end

				if IsDisabledControlJustPressed(0, 24) then
					addDoorlock(entity)
				end
			end

			if IsDisabledControlJustPressed(0, 25) then
				SetEntityDrawOutline(entity, false)

				if not doorA then
					isAddingDoorlock = false
					return lib.hideTextUI()
				end

				SetEntityDrawOutline(doorA, false)
				table.wipe(tempData)
			end
		until tempData[doorCount]

		lib.hideTextUI()
		SetEntityDrawOutline(tempData[1].entity, false)

		if data.doors then
			SetEntityDrawOutline(tempData[2].entity, false)
			tempData[1].entity = nil
			tempData[2].entity = nil
			data.doors = tempData
		else
			data.model = tempData[1].model
			data.coords = tempData[1].coords
			data.heading = tempData[1].heading
		end

	else
		if data.doors then
			for i = 1, 2 do
				local coords = data.doors[i].coords
				data.doors[i].coords = vector3(coords.x, coords.y, coords.z)
				data.doors[i].entity = nil
			end
		else
			data.entity = nil
		end

		data.coords = vector3(data.coords.x, data.coords.y, data.coords.z)
		data.distance = nil
		data.zone = nil
	end

	isAddingDoorlock = false

	TriggerServerEvent('ox_doorlock:editDoorlock', data.id or false, data)
	table.wipe(tempData)
end)

RegisterNUICallback('deleteDoor', function(id, cb)
	cb(1)
	TriggerServerEvent('ox_doorlock:editDoorlock', id)
end)

RegisterNUICallback('teleportToDoor', function(id, cb)
    cb(1)
    SetNuiFocus(false, false)
    local doorCoords = doors[id].coords
    if not doorCoords then return end
    SetEntityCoords(cache.ped, doorCoords.x, doorCoords.y, doorCoords.z, false, false, false, false)
end)

RegisterNUICallback('exit', function(_, cb)
	cb(1)
	SetNuiFocus(false, false)
end)

local function openUi(id)
	if source == '' or isAddingDoorlock then return end

	if not NuiHasLoaded then
		NuiHasLoaded = true
		SendNuiMessage(json.encode({
			action = 'updateDoorData',
			data = doors
		}, { with_hole = false }))
		Wait(100)
	end

	SetNuiFocus(true, true)
	SendNuiMessage(json.encode({
		action = 'setVisible',
		data = id
	}))
end

RegisterNetEvent('ox_doorlock:triggeredCommand', function(closest)
	openUi(closest and ClosestDoor?.id or nil)
end)

CreateThread(function()
	local target

	if GetResourceState('ox_target'):find('start') then
		target = {
			ox = true,
			exp = exports.ox_target
		}
	elseif GetResourceState('qb-target'):find('start') then
		target = {
			qb = true,
			exp = exports['qb-target']
		}
	elseif GetResourceState('qtarget'):find('start') then
		target = {
			qt = true,
			exp = exports.qtarget
		}
	end

	if not target then return end

	if target.ox then
		target.exp:addGlobalObject({
			{
				name = 'pickDoorlock',
				label = locale('pick_lock'),
				icon = 'fas fa-user-lock',
				onSelect = pickLock,
				canInteract = canPickLock,
				items = 'lockpick',
				distance = 1
			}
		})
	else
		local options = {
			{
				label = locale('pick_lock'),
				icon = 'fas fa-user-lock',
				action = pickLock,
				canInteract = canPickLock,
				item = 'lockpick',
				distance = 1
			}
		}

		if target.qt then
			target.exp:Object({ options = options })
		elseif target.qb then
			target.exp:AddGlobalObject({ options = options })
		end

		options = { locale('pick_lock') }

		AddEventHandler('onResourceStop', function(resource)
			if resource == cache.resource then
				if target.qt then
					return target.exp:RemoveObject(options)
				end

				if target.qb then
					return target.exp:RemoveGlobalObject(options)
				end
			end
		end)
	end
end)
