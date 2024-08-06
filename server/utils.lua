local resourcePath = GetResourcePath(cache.resource):gsub('//', '/') .. '/'

local utils = {}

function utils.getFilesInDirectory(path, pattern)
	local files = {}
	local fileCount = 0
	local system = os.getenv('OS')
	local command = system and system:match('Windows') and 'dir "' or 'ls "'
	local suffix = command == 'dir "' and '/" /b' or '/"'
	local dir = io.popen(command .. resourcePath .. path .. suffix)

	if dir then
		for line in dir:lines() do
			if line:match(pattern) then
				fileCount += 1
				files[fileCount] = line:gsub(pattern, '')
			end
		end

		dir:close()
	end

	return files, fileCount
end

local frameworks = { 'es_extended', 'ND_Core', 'ox_core', 'qbx_core' }
local sucess = false

for i = 1, #frameworks do
	local framework = frameworks[i]
	
	if GetResourceState(framework):find('start') then
		require(('server.framework.%s'):format(framework:lower()))
		sucess = true
		break
	end
end

if not sucess then
	warn('no compatible framework was loaded, most features will not work')
end

return utils
