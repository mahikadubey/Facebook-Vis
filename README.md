# Facebook-Vis
Visualization using facebook friends list and messenger chat history . 

### Data Collection 
Download your relevent files from Facebook by going to this link https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav. Be sure to select JSON format, and include information on 'Your Friends' and 'Messages.' From the downloaded information, place the file 'friends/friends.json' and the folder 'messages/inbox' in the same directory as the python code from this repository. Directory should contain the following:  
`compiledata.py, inbox/, friends.json` . 

### Data Parsing
Your python folder should now be ready to run for data parsing and compilation. Run the following command, making sure to include as a command line argument your Facebook name in quotes:  
`python compiledata.py "[your_full_name]"` . 
Copy the generated file, 'compiled_data.json' to the javascript/ folder . 

### Visualization


