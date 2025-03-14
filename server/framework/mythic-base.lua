local cachedJobs = {}

-- Triggered when the mythic job resource is finished loaded
AddEventHandler("Jobs:Server:Startup", function()
	-- Store the jobs into the cached table, so they can be referenced later, without recalling
	cachedJobs = Jobs:GetAll()
end)

local function retrieveComponents()
	Fetch = exports["mythic-base"]:FetchComponent("Fetch")
	Jobs = exports["mythic-base"]:FetchComponent("Jobs")
	Inventory = exports["mythic-base"]:FetchComponent("Inventory")
end

AddEventHandler("ox_doorlock:Shared:DependencyUpdate", retrieveComponents)

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("ox_doorlock", {
		"Fetch",
		"Jobs",
		"Inventory"
	}, function(error)
		if #error > 0 then
			Logger:Critical("ox_doorlock", "Failed To Load All Dependencies")
			return
		end

		retrieveComponents()
	end)
end)

function GetPlayer(playerId)
    local player = { source = playerId }
    return player
end

function GetCharacterId(player)
	local char = Fetch:Source(player.source):GetData("Character")
	if not char then return -1 end

	return char:GetData("SID")
end

function IsPlayerInGroup(player, filter)
	if not player then return false end

	local char = Fetch:Source(player.source):GetData("Character")
	if not char then return false end

	if type(filter) == "string" then
		return Jobs.Permissions:HasJob(player.source, filter)
	end

	for job, grade in pairs(filter) do
		if cachedJobs[job] then
			local jobData = Jobs.Permissions:HasJob(player.source, job)
			if jobData and jobData.Grade.Level >= grade then
				return true
			end
		end
	end
	
	return false
end

if Config.MythicInventory then
	function DoesPlayerHaveItem(player, items, removeItem)
		if not player then return false end
	
		local char = Fetch:Source(player.source):GetData("Character")
		if not char then return false end
		
		for i = 1, #items do
			local item = items[i]
			local itemName = item.name or item
			if Inventory.Items:Has(char:GetData("SID"), 1, itemName, 1) then
				if removeItem or item.remove then
					Inventory.Items:Remove(char:GetData("SID"), 1, itemName, 1)
				end

				return itemName
			end
		end
	end
end