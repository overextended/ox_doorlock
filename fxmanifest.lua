--[[ FX Information ]]--
fx_version   'cerulean'
use_fxv2_oal 'yes'
lua54        'yes'
game         'gta5'

--[[ Resource Information ]]--
name         'ox_doorlock'
version      '1.0.5'
license      'GPL-3.0-or-later'
author       'Overextended'
repository   'https://github.com/overextended/ox_doorlock'

--[[ Manifest ]]--
shared_script '@ox_lib/init.lua'

client_scripts {
	'config.lua',
	'client/main.lua',
	'client/utils.lua',
}

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'convert/main.lua',
	'server/framework.lua',
	'server/main.lua',
}

ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*',
	'locales/*.json'
}

dependencies {
	'ox_lib',
	'qtarget'
}
