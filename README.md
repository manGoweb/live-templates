# live-templates (for mango-cli)

In case you have a lot of template files and `mango dev` slows you down, use this instead:

1. in `mango.local.json` set `"templates": null`
2. run `mango dev`
3. run `live-templates [dist_folder] [templates_folder]` for ex. `live-templates dist src/templates`
4. navigate to `http://localhost:3333`
5. Enjoy!


## Installation

1. `git clone git@github.com:manGoweb/live-templates.git`
2. `cd live-templates`
3. `npm link`
