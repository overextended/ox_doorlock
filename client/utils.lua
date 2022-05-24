lib.locale()
local Entity = Entity

local function getDoorFromEntity(entity)
	local state = Entity(entity).state
	local door = doors[state.doorId]

	if not door then
		state.doorId = nil
	end

	return door
end

local function entityIsNotDoor(entity)
	return not getDoorFromEntity(entity)
end

local pickingLock

local function canPickLock(entity)
	return not pickingLock and getDoorFromEntity(entity)?.lockpick
end

local function pickLock(entity)
	pickingLock = true
	local door = getDoorFromEntity(entity)
	local success
	TaskTurnPedToFaceCoord(cache.ped, door.coords.x, door.coords.y, door.coords.z, 4000)
	Wait(500)

	CreateThread(function()
		success = not cache.vehicle and lib.progressCircle({
			duration = 4000,
			canCancel = true,
			disable = {
				move = true,
				combat = true,
			},
			anim = {
				dict = 'mp_common_heist',
				clip = 'pick_door',
			}
		})
	end)

	while success == nil do
		Wait(50)
		if math.random(1, 500) == 1 then
			TriggerServerEvent('ox_doorlock:breakLockpick')
			lib.cancelProgress()
			lib.notify({ type = 'error', description = locale('lockpick_broke') })
		end
	end

	if math.random(1, 100) == 1 then
		TriggerServerEvent('ox_doorlock:breakLockpick')
		lib.notify({ type = 'error', description = locale('lockpick_broke') })
	end

	if success then
		TriggerServerEvent('ox_doorlock:setState', door.id, door.state == 1 and 0 or 1, true)
	end

	pickingLock = false
end

exports.qtarget:Object({
	options = {
		{
			label = locale('pick_lock'),
			icon = 'fas fa-user-lock',
			action = pickLock,
			canInteract = canPickLock,
			item = 'lockpick',
			distance = 1
		}
	}
})

local tempData = {}

RegisterNUICallback('createDoor', function(data, cb)
	cb(1)
	tempData = data
end)

RegisterNUICallback('exit', function(_, cb)
	cb(1)
	SetNuiFocus(false, false)
end)


local function removeDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		return TriggerServerEvent('ox_doorlock:editDoorlock', door.id)
	end
end

local function addDoorlock(entity)
	local model = GetEntityModel(entity)
	local coords = GetEntityCoords(entity)

	AddDoorToSystem(`temp`, model, coords.x, coords.y, coords.z, false, false, false)
	DoorSystemSetDoorState(`temp`, 4, false, false)

	coords = GetEntityCoords(entity)
	tempData[#tempData + 1] = {
		model = model,
		coords = coords,
		heading = math.floor(GetEntityHeading(entity) + 0.5)
	}

	RemoveDoorFromSystem(`temp`)
end

local function parseTempData()
	local data = {
		name = tempData.doorName,
		passcode = tempData.passcode,
		autolock = tempData.autolockInterval,
		maxDistance = tempData.interactDistance or 2,
		lockSound = tempData.lockSound,
		unlockSound = tempData.unlockSound,
		auto = tempData.checkboxes?.automatic or nil,
		state = tempData.checkboxes?.locked and 1 or 0,
		lockpick = tempData.checkboxes?.lockpick or nil,
		doors = tempData.checkboxes?.double and true or nil,
		groups = {},
		items = {},
	}

	for _, group in pairs(tempData.groupFields) do
		if group?.name then
			data.groups[group.name] = group.grade or 0
		end
	end

	if not next(data.groups) then
		data.groups = nil
	end

	local itemSize = 0

	for i = 1, #tempData.itemFields do
		local item = tempData.itemFields[i]

		if item ~= '' then
			itemSize += 1
			data.items[itemSize] = item
		end
	end

	for i = 1, #tempData.itemFields do
		if tempData.itemFields[i] == '' then
			tempData.itemFields[i] = nil
		end
	end

	if not next(data.items) then
		data.items = nil
	end

	return data
end

local function newDoorlock()
	SetNuiFocus(true, true)

	SendNUIMessage({
		action = 'setVisible',
		data = true
	})

	repeat Wait(50) until next(tempData)

	local data = parseTempData()

	SetNuiFocus(false, false)
	table.wipe(tempData)

	exports.qtarget:Object({
		options = {
			{
				label = locale('add_lock'),
				icon = 'fas fa-file-circle-plus',
				action = addDoorlock,
				canInteract = entityIsNotDoor,
				distance = 10
			},
		}
	})

	if data.doors then
		repeat Wait(50) until tempData[2]
		data.doors = tempData
	else
		repeat Wait(50) until tempData[1]
		data.model = tempData[1].model
		data.coords = tempData[1].coords
		data.heading = tempData[1].heading
	end

	TriggerServerEvent('ox_doorlock:editDoorlock', false, data)
	exports.qtarget:RemoveObject(locale('add_lock'))
	table.wipe(tempData)
end

local function parseDoorData(door)
	local data = {
		doorName = door.name,
		passcode = door.passcode,
		autolockInterval = door.autolock,
		interactDistance = door.maxDistance,
		lockSound = door.lockSound,
		unlockSound = door.unlockSound,
		groupFields = {},
		itemFields = door.items or {},
		checkboxes = {
			automatic = door.auto,
			locked = door.state == 1,
			lockpick = door.lockpick,
			double = door.doors and true,
		}
	}

	local groupSize = 0

	if door.groups then
		for name, grade in pairs(door.groups) do
			groupSize += 1
			data.groupFields[groupSize] = {
				name = name,
				grade = grade
			}
		end
	end

	return data
end

local function editDoorlock(entity)
	local door = doors[Entity(entity).state?.doorId]

	if door then
		SetNuiFocus(true, true)

		SendNUIMessage({
			action = 'setVisible',
			data = parseDoorData(door)
		})

		repeat Wait(50) until next(tempData)

		local data = parseTempData()
		data.id = door.id
		data.coords = door.coords
		data.doors = door.doors

		if not data.doors then
			data.heading = door.heading
			data.model = door.model
			data.hash = door.hash
		end

		SetNuiFocus(false, false)
		table.wipe(tempData)
		TriggerServerEvent('ox_doorlock:editDoorlock', data.id, data)
	end
end

local function removeTarget(res)
	if not res or res == 'ox_doorlock' then
		exports.qtarget:RemoveObject({locale('remove_lock'), locale('edit_lock'), locale('add_lock'), locale('pick_lock')})
	end
end

local displayTarget

RegisterNetEvent('ox_doorlock:triggeredCommand', function(edit)
	if edit then
		displayTarget = not displayTarget

		if displayTarget then
			return exports.qtarget:Object({
				options = {
					{
						label = locale('edit_lock'),
						icon = 'fas fa-file-pen',
						action = editDoorlock,
						canInteract = getDoorFromEntity
					},
					{
						label = locale('remove_lock'),
						icon = 'fas fa-file-circle-minus',
						action = removeDoorlock,
						canInteract = getDoorFromEntity
					},
				},
				distance = 10
			})
		end

		removeTarget()
	else
		newDoorlock()
	end
end)

AddEventHandler('onResourceStop', removeTarget)
