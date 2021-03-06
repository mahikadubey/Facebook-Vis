# Facebook-Vis
Visualization using facebook friends list and messenger chat history  
Survey for feedback: https://goo.gl/forms/J9UUwytAMi6v8NGh1

### Data Collection 
Download your relevent files from Facebook by following the directions on this link https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav. Be sure to select JSON format, and include information on 'Your Friends' and 'Messages.' From the downloaded information, place the file 'friends/friends.json' and the folder 'inbox/' (from the messages/) in the same directory as the python code from this repository. Directory should contain the following:  
`compiledata.py, inbox/, friends.json` 

### Data Parsing
Your python folder should now be ready to run for data parsing and compilation. Run the following command, making sure to include as a command line argument your Facebook name in quotes:    
`python compiledata.py "[your_full_name]"`  
Copy the generated file, 'compiled_data.json' to the javascript/ folder . 

### Visualization
Once the compiled data json is in the javascript folder, you are ready to run the visualization. Move into the javascript/ directory and start a local server using the following commmand depending on your current version of python:  
Python Version 3: `python -m http.server`   
Python Version 2: `python -m simpleHTTPServer`   
Navigate in a browser to localhost:8000. You should see an empty page with a few buttons on top. Click 'Load All Friends Visualization' for an overview of all messaging interactions. To filter by friend name, enter a comma-separated list of full names into the text area (be sure to include a space after each comma: First1 Last1, First2 Last2, First3 Last3) and click 'Load Some Friends'    

![](screenshot.png)
