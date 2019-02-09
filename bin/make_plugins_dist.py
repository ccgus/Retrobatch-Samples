#!/usr/bin/env python3

import os
import json
import subprocess
import html

scriptBase = os.path.dirname(os.path.realpath(__file__)) + "/.."
scriptBase = os.path.realpath(scriptBase)

distDir = scriptBase + "/dist/"

if not os.path.exists(distDir):
    os.makedirs(distDir)

pluginInfo  = {}

for i in os.listdir(scriptBase + "/plugin"):
    if not i.endswith(".retrobatchplugin"):
        continue
    
    fullpath = scriptBase + "/plugin/" + i
    fulloutpath = distDir + i + ".zip"
    
    subprocess.call(["ditto", "-c", "-k", "--sequesterRsrc", "--keepParent", fullpath, fulloutpath])
    
    f = open(fullpath + "/Contents/manifest.json")
    j = f.read()
    d = json.loads(j)
    d['file'] = i
    pluginInfo[d['pluginName']] = d;


names = sorted(pluginInfo.keys())

templateHTML = open(scriptBase + "/bin/make_plugins_dist_template.html").read()

pluginTemplateHTML = """
            <h2>%(pluginName)s</h2>
            %(description)s<br/>
            Download: <a href="%(file)s.zip">%(file)s.zip</a><br/>
"""

listHTML = ""

for name in names:
    pluginJSON = pluginInfo[name]
    pluginJSON['pluginName']  = html.escape(pluginJSON['pluginName'])
    pluginJSON['description'] = html.escape(pluginJSON['description'])
    
    s = pluginTemplateHTML % pluginJSON
    listHTML = listHTML + s;
    

finalHTML = templateHTML % {"pluginInfo" : listHTML}

f = open(distDir + "/index.html", "w")
f.write(finalHTML);
f.close()

print("scp -r " + distDir + "* gus@flyingmeat.com:~/fmsite/prod/retrobatch/jsplugin/.")

subprocess.call(["open", distDir + "/index.html"])
