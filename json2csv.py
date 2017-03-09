import json
import csv
import pdb

# assumes python script and files in same directory, will convert each of these 
# to its own csv file
filenames = ['match5-6487.json']

# returns a flattened dict where nested dicts of the form:
# { key1 : {key2: nested_value} }
# get returned as
# { key1.key2 : nested_value }
def flatten_json( b ):
  val = {}
  for i in b.keys():
    if isinstance( b[i], dict ):
      get = flatten_json( b[i] )
      for j in get.keys():
        val[ i + '.' + j ] = get[j]
    else:
      val[i] = b[i]

  return val
  
# assumes json parses into a SINGLE dictionary
csv_headers = {}
for f in filenames:
  out_filename = f.lower().replace('.json','.csv')
  with open(f) as data_file:  
    data = json.load(data_file)
    flattened = flatten_json(data)
    with open( out_filename, 'wb' ) as out_file:
      csv_w = csv.writer( out_file)
      columns = ""
      values = ""
      
      columns = [ k for k in sorted(flattened.keys()) ]
      values = [ flattened[k] for k in sorted(flattened.keys()) ]
      
      csv_w.writerow( columns )
      csv_w.writerow(values)
