#!/usr/bin/env ruby
# Run this file with the following command: "ruby json2csv.rb /path/to/json/files"

require "JSON"
require "csv"

File.open(ARGV[0] + "data.csv", "w+") do |csv|
  csv.write ("Team Number, Match Number, Auto High Goals, Auto High Goals Time Spent, Auto Low Goals, Auto Low Goals Time Spent, Auto Gears Attempted, Auto Gears Scored, Auto Gears Time Spent, Auto Baseline, Teleop High Goals, Teleop High Goals Time Spent, Teleop Low Goals, Teleop Low Goals Time Spent, Teleop Hoppers Deployed, Teleop Gears Attempted, Teleop Gears Scored, Gear Fouls, Human Fouls, Shooting Fouls, Attempted Climbing, Climbed, Shot After Climbing, Put a Pilot in the Airship, Defense Notes, Fuel Location Notes, Strategy Notes, Other Notes\n")
  
  Dir.chdir(ARGV[0]) do
    (Dir.glob "*.json").each do |file|
      data = JSON.parse(File.read(ARGV[0] + file))
      csv.write(
      [data["match"]].to_csv( row_sep: nil ) + ', ' + 
      [data["team"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["high-goals"]].to_csv( row_sep: nil ) + ', ' +
      [data["auto"]["high-goals-time"]].to_csv( row_sep: nil )  + ', ' + 
      [data["auto"]["low-goals"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["low-goals-time"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["gears-attempted"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["gears-scored"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["gears-time"]].to_csv( row_sep: nil ) + ', ' + 
      [data["auto"]["baseline"].to_s].to_csv( row_sep: nil ) + ', ' + 
      
      [data["teleop"]["high-goals"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["high-goals-time"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["low-goals"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["low-goals-time"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["hoppers"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["gears-attempted"]].to_csv( row_sep: nil ) + ', ' + 
      [data["teleop"]["gears-scored"]].to_csv( row_sep: nil ) + ', ' + 
      
      [data["fouls"]["gears"]].to_csv( row_sep: nil ) + ', ' + 
      [data["fouls"]["human"]].to_csv( row_sep: nil ) + ', ' + 
      [data["fouls"]["shooting"]].to_csv( row_sep: nil ) + ', ' + 
      
      [data["endgame"]["climbing-attempted"].to_s].to_csv( row_sep: nil ) + ', ' + 
      [data["endgame"]["climbing"].to_s].to_csv( row_sep: nil ) + ', ' + 
      [data["endgame"]["shooting"].to_s].to_csv( row_sep: nil ) + ', ' + 
      
      [data["other"]["pilot"].to_s].to_csv( row_sep: nil ) + ', ' + 
      [data["other"]["defense"]].to_csv( row_sep: nil ) + ', ' + 
      [data["other"]["fuel"]].to_csv( row_sep: nil ) + ', ' + 
      [data["other"]["strategy-notes"]].to_csv( row_sep: nil ) + ', ' + 
      [data["other"]["notes"]].to_csv( row_sep: nil ) + "\n")
    end
  end
end