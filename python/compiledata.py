# Mahika Dubey
# TIM 243 Social Computing
# W2019 UCSC

import json
import os
import sys

me = sys.argv[1]

with open('friends.json') as f:
    friendsjson = json.load(f)

friend_data = {}
friend_list = []
for friend in friendsjson['friends']:
    friend_list.append(friend['name'])
    friend_data[friend['name']] = {'name': friend['name'], 'timestamp': friend['timestamp'], 'private': [], 'group': []}

folders = os.walk('inbox')
limit = 0
label = ''

for folder in folders:
    if limit >= 0:
        message = folder[0] + '/message.json'

        if os.path.isfile(message):
            with open(message) as currentf:
                current = json.load(currentf)
            people = current['participants']
            messages = current['messages']

            if len(people) > 2:
                label = 'group'
            elif len(people) == 2:
                label = 'private'
            else:
                label = 'invalid'

            if label != 'invalid':
                for m in messages:
                    if 'sender_name' in m:
                        person = m['sender_name']
                        time = m['timestamp_ms']

                        if person in friend_list:
                            friend_data[person][label].append(time)
                        if person is me:
                            friend_data[person][label].append(time)
    limit += 1

compiled_friends = []
for f in friend_data:
    compiled_friends.append(friend_data[f])
compiled_friends

with open('compiled_data.json', 'w') as outfile:
    json.dump(compiled_friends, outfile)
