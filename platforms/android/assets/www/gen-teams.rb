require 'net/http'
require 'json'

compid = "2017gush"

url = URI.parse("https://www.thebluealliance.com/api/v2/event/#{compid}/teams?X-TBA-App-Id=frc1797:scouting-system:v01")
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port, :use_ssl => url.scheme == 'https') {|http|
  http.request(req)
}

teams = JSON.parse(res.body)
teams.sort! {|x,y| x["team_number"] <=> y["team_number"]}

#=begin
File.open "pages/partials/teams.html", "w" do |file|
  file.write(%Q(
  <div class="row">
  ))
  teams.each do |team|
    file.write(%Q(
    <div data-team="#{team["team_number"]}" class="row">
      <div class="col-md-8 col-sm-8 col-xs-6">#{team["nickname"]} (#{team["team_number"]})</div>
      <div class="col-md-4 col-sm-4 col-xs-6">
        <button class='btn btn-primary asl-pit-scouting pull-right'>Pit Scouting</button>
      </div>
    </div>
    ))
  end
  file.write(%Q(
  </div>
  ))
end
#=end