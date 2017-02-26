require 'net/http'
require 'json'

#compid = "2017gush"
compid = "2010sc"

url = URI.parse("https://www.thebluealliance.com/api/v2/event/#{compid}/matches?X-TBA-App-Id=frc1797:scouting-system:v01")
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port, :use_ssl => url.scheme == 'https') {|http|
  http.request(req)
}

matches = JSON.parse(res.body)
matches.select! { |e| e["comp_level"] == "qm" }
matches.sort! {|x,y| x["match_number"] <=> y["match_number"]}

#=begin
File.open "pages/partials/matches.html", "w" do |file|
  file.write(%Q(
  <div class="row">
  ))
  matches.each do |match|
    file.write(%Q(
    <div class="col-md-12">
      <h2>Match #{match["match_number"]}</h2>
    </div>
    ))
    match["alliances"]["red"]["teams"].each do |team|
      file.write(%Q(
      <div data-team="#{team[3..-1].to_i}" data-match="#{match["match_number"]}" class="row">
        <div class="col-md-8 col-sm-8">#{team[3..-1].to_i}</div>
        <div class="col-md-4 col-sm-4">
          <button class='btn btn-primary asl-game-scouting pull-right'>Game Scouting</button>
        </div>
      </div>
      ))
    end
    
    match["alliances"]["blue"]["teams"].each do |team|
      file.write(%Q(
      <div data-team="#{team[3..-1].to_i}" data-match="#{match["match_number"]}" class="row">
        <div class="col-md-8 col-sm-8">#{team[3..-1].to_i}</div>
        <div class="col-md-4 col-sm-4">
          <button class='btn btn-primary asl-game-scouting pull-right'>Game Scouting</button>
        </div>
      </div>
      ))
    end
  end
  file.write(%Q(
  </div>
  ))
end
#=end