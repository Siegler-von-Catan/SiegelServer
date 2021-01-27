#!/usr/bin/env python

# argv[1] = folder with lido files
# argv[2] = filename for output json file

from xml.dom import minidom
import json
import os
import sys


def get_raw_files(folder):
    return [possible_file for possible_file in os.listdir(folder) if os.path.isfile(os.path.join(folder, possible_file))]


def read_data(xml_file):
    xml = minidom.parse(xml_file)
    d = {}

    subjects = xml.getElementsByTagName('lido:displaySubject')
    title = xml.getElementsByTagName('lido:appellationValue')
    file_id = xml_file[-10:-4]

    d['subjects'] = [s.firstChild.nodeValue for s in subjects]
    d['name'] = title[0].firstChild.nodeValue
    d['lido_id'] = file_id

    return d


def to_json(dataset):
    return json.dumps({"siegel": dataset})


if __name__ == '__main__':
    raw_folder = sys.argv[1]
    out_file = sys.argv[2]

    raw_files = get_raw_files(raw_folder)

    data = []
    for file in raw_files:
        data.append(read_data(os.path.join(raw_folder, file)))

    with open(out_file, 'w', encoding="utf-8") as out:
        out.write(to_json(data))
