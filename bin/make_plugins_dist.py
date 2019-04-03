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
    
    print("Reading " + fullpath + "/Contents/manifest.json")
    f = open(fullpath + "/Contents/manifest.json")
    j = f.read()
    d = json.loads(j)
    d['file'] = i
    pluginInfo[d['pluginName']] = d;


names = sorted(pluginInfo.keys())

templateHTML = open(scriptBase + "/bin/make_plugins_dist_template.html").read()

pluginTemplateHTML = """
            <h2>%(pluginName)s</h2>
            <p>%(description)s</p>
            Download: <a href="%(file)s.zip">%(file)s.zip</a><br/>
            <span style="color: #888">Requires Retrobatch %(minimumRetrobatchVersion)s+ and MacOS %(minimumSystemVersion)s+</span><br/>
"""

listHTML = ""

for name in names:
    pluginJSON = pluginInfo[name]
    pluginJSON['pluginName']  = html.escape(pluginJSON['pluginName'])
    pluginJSON['description'] = html.escape(pluginJSON['description'])
    
    if pluginJSON.get('minimumRetrobatchVersion') is None:
            pluginJSON['minimumRetrobatchVersion'] = "1.2.0";
    
    if pluginJSON.get('minimumSystemVersion') is None:
            pluginJSON['minimumSystemVersion'] = "10.12.0";
    
    
    s = pluginTemplateHTML % pluginJSON
    listHTML = listHTML + s;
    

finalHTML = templateHTML % {"pluginInfo" : listHTML}

f = open(distDir + "/index.html", "w")
f.write(finalHTML);
f.close()

print("scp -r " + distDir + "* gus@flyingmeat.com:~/fmsite/prod/retrobatch/jsplugin/.; open https://flyingmeat.com/retrobatch/jsplugin")

subprocess.call(["open", distDir + "/index.html"])
